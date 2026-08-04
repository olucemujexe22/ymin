param(
    [string]$SourceWorkbook = (Join-Path $PSScriptRoot '..\总表-永铭替代国际品牌-数据表250809.xlsx'),
    [string]$OutputFile = (Join-Path $PSScriptRoot '..\data\replacement-cross-reference.js')
)

$ErrorActionPreference = 'Stop'

function Get-CellText {
    param($Value)
    if ($null -eq $Value) { return '' }
    return ([string]$Value).Trim()
}

function Get-PartKey {
    param([string]$Value)
    if (-not $Value) { return '' }
    return ($Value.Normalize([Text.NormalizationForm]::FormKC).ToUpperInvariant() -replace '[^A-Z0-9]', '')
}

function Get-BrandDisplay {
    param([string]$Value)
    $text = Get-CellText $Value
    switch -Regex ($text) {
        'RUBYCON|红宝石' { return '红宝石（Rubycon）' }
        'PANASONIC|松下' { return '松下（Panasonic）' }
        'NICHICON|尼吉康' { return '尼吉康（Nichicon）' }
        'NCC|贵弥功|CHEMI.?CON' { return '贵弥功（NCC）' }
        'VISHAY|威世' { return '威世（Vishay）' }
        'EATON|伊顿' { return '伊顿（Eaton）' }
        'IHHEC|禾伸堂' { return '禾伸堂（IHHEC）' }
        default { return $text }
    }
}

$resolvedSource = [IO.Path]::GetFullPath($SourceWorkbook)
$resolvedOutput = [IO.Path]::GetFullPath($OutputFile)
if (-not (Test-Path -LiteralPath $resolvedSource)) {
    throw "Source workbook not found: $resolvedSource"
}

$excel = $null
$workbook = $null
$worksheet = $null
try {
    $excel = New-Object -ComObject Excel.Application
    $excel.Visible = $false
    $excel.DisplayAlerts = $false
    $workbook = $excel.Workbooks.Open($resolvedSource, $null, $true)
    $worksheet = $workbook.Worksheets.Item('国产替代明细表')
    $usedRange = $worksheet.UsedRange
    $values = $usedRange.Value2
    $mappings = New-Object System.Collections.Generic.List[object]
    $seenPairs = @{}

    for ($row = 4; $row -le $usedRange.Rows.Count; $row++) {
        $competitorPart = Get-CellText ($values[$row, 5])
        $yminPart = Get-CellText ($values[$row, 13])
        if (-not $competitorPart -or -not $yminPart) { continue }

        $competitorKey = Get-PartKey $competitorPart
        $yminKey = Get-PartKey $yminPart
        $pairKey = "$competitorKey|$yminKey"
        if ($seenPairs.ContainsKey($pairKey)) { continue }
        $seenPairs[$pairKey] = $true

        $brandRaw = Get-CellText ($values[$row, 4])
        $mappings.Add([ordered]@{
            competitorBrand = Get-BrandDisplay $brandRaw
            competitorBrandRaw = $brandRaw
            competitorPart = $competitorPart
            competitorPartKey = $competitorKey
            competitorSeries = Get-CellText ($values[$row, 6])
            voltage = Get-CellText ($values[$row, 7])
            capacitance = Get-CellText ($values[$row, 8])
            size = Get-CellText ($values[$row, 9])
            temperature = Get-CellText ($values[$row, 10])
            esr = Get-CellText ($values[$row, 11])
            life = Get-CellText ($values[$row, 12])
            yminPart = $yminPart
            yminPartKey = $yminKey
            yminDescription = Get-CellText ($values[$row, 15])
            matchType = 'PIN TO PIN'
        })
    }

    $orderedMappings = @($mappings | Sort-Object competitorPartKey, yminPartKey)
    $payload = [ordered]@{
        meta = [ordered]@{
            sourceFile = [IO.Path]::GetFileName($resolvedSource)
            generatedAt = (Get-Date).ToString('s')
            matchDefinition = 'PIN TO PIN'
            mappingCount = $orderedMappings.Count
            competitorPartCount = @($orderedMappings.competitorPartKey | Sort-Object -Unique).Count
            yminPartCount = @($orderedMappings.yminPartKey | Sort-Object -Unique).Count
        }
        mappings = $orderedMappings
    }

    $json = $payload | ConvertTo-Json -Depth 5 -Compress
    $content = "window.YMIN_REPLACEMENT_CROSS_REFERENCE=$json;`r`n"
    $outputDirectory = [IO.Path]::GetDirectoryName($resolvedOutput)
    [IO.Directory]::CreateDirectory($outputDirectory) | Out-Null
    [IO.File]::WriteAllText($resolvedOutput, $content, (New-Object Text.UTF8Encoding($false)))
    Write-Output "Generated $($orderedMappings.Count) mappings: $resolvedOutput"
}
finally {
    if ($workbook) { $workbook.Close($false) }
    if ($excel) { $excel.Quit() }
    if ($worksheet) { [void][Runtime.InteropServices.Marshal]::FinalReleaseComObject($worksheet) }
    if ($workbook) { [void][Runtime.InteropServices.Marshal]::FinalReleaseComObject($workbook) }
    if ($excel) { [void][Runtime.InteropServices.Marshal]::FinalReleaseComObject($excel) }
}
