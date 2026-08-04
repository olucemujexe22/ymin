param(
    [string]$WorkbookPath = (Join-Path (Split-Path $PSScriptRoot -Parent) '应用中心数据采集表6.11.xlsx'),
    [string]$OutputPath = (Join-Path (Split-Path $PSScriptRoot -Parent) 'data\application-collected-data.js'),
    [string]$ImageDirectory = (Join-Path (Split-Path $PSScriptRoot -Parent) 'assets\application-collected')
)

$ErrorActionPreference = 'Stop'

$pageDefinitions = @(
    [ordered]@{ Sheet = '汽车电子'; PageKey = 'automotive'; Overview = '汽车电子'; Title = '汽车电子应用指南'; Icon = 'directions_car' },
    [ordered]@{ Sheet = 'AI服务器与数据中心'; PageKey = 'ai-server'; Overview = 'AI服务器'; Title = 'AI服务器与数据中心应用指南'; Icon = 'memory' },
    [ordered]@{ Sheet = '机器人'; PageKey = 'robotics'; Title = '机器人应用指南'; Icon = 'precision_manufacturing'; Description = '面向机器人关节模组、雷达/摄像头感知系统及高压输入滤波，提供高容量密度、低ESR和高可靠性的电容方案。'; Tags = '高容量密度 / 低ESR / 高可靠性' },
    [ordered]@{ Sheet = '无人机'; PageKey = 'drone'; Title = '无人机应用指南'; Icon = 'flight'; Description = '面向无人机电子调速器与航点飞行调参，提供适用于滤波、储能和稳定供电的电容方案。'; Tags = '大纹波 / 高能量密度 / 小型化' },
    [ordered]@{ Sheet = '新型电机驱动'; PageKey = 'motor'; Overview = '新型电机驱动'; Title = '新型电机驱动应用指南'; Icon = 'electric_bolt' },
    [ordered]@{ Sheet = '消费类电子'; PageKey = 'consumer'; Overview = '消费类电子'; Title = '消费类电子应用指南'; Icon = 'devices' }
)

$iconRules = @(
    @{ Pattern = '电源|供电|输入|输出|滤波|充电|OBC|DC-DC|DCDC|PFC|LLC'; Icon = 'power' },
    @{ Pattern = '电机|驱动|关节|伺服|变频|电调|风机|水泵'; Icon = 'settings' },
    @{ Pattern = '雷达|摄像|感知|传感'; Icon = 'sensors' },
    @{ Pattern = '主板|CPU|GPU|控制|芯片|算力|存储|SSD'; Icon = 'memory' },
    @{ Pattern = '车灯|照明'; Icon = 'lightbulb' },
    @{ Pattern = '电池|BMS|储能|BBU'; Icon = 'battery_charging_full' },
    @{ Pattern = '安全|气囊|制动'; Icon = 'shield' },
    @{ Pattern = '无人机|飞行'; Icon = 'flight' },
    @{ Pattern = '汽车|车载|座舱|底盘'; Icon = 'directions_car' }
)

function Get-Icon([string]$Text, [string]$Fallback = 'memory') {
    foreach ($rule in $iconRules) {
        if ($Text -match $rule.Pattern) { return $rule.Icon }
    }
    return $Fallback
}

function Get-CellText($Worksheet, [int]$Row, [int]$Column) {
    if ($Column -le 0) { return '' }
    $value = [string]$Worksheet.Cells.Item($Row, $Column).Text
    return $value.Trim()
}

function Find-Column($Headers, [string[]]$Exact, [string[]]$Contains) {
    for ($i = 0; $i -lt $Headers.Count; $i++) {
        foreach ($candidate in $Exact) {
            if ($Headers[$i] -eq $candidate) { return $i + 1 }
        }
    }
    for ($i = 0; $i -lt $Headers.Count; $i++) {
        foreach ($candidate in $Contains) {
            if ($Headers[$i] -like "*$candidate*") { return $i + 1 }
        }
    }
    return 0
}

function Add-UniqueText([string]$Current, [string]$Additional) {
    if ([string]::IsNullOrWhiteSpace($Additional)) { return $Current }
    if ([string]::IsNullOrWhiteSpace($Current)) { return $Additional }
    if ($Current.Contains($Additional)) { return $Current }
    return "$Current`n$Additional"
}

function Export-WorksheetShape($Worksheet, $Shape, [string]$TargetPath) {
    $lastError = $null
    for ($attempt = 1; $attempt -le 5; $attempt++) {
        $chartObject = $null
        try {
            $Shape.CopyPicture(1, 2) | Out-Null
            [System.Threading.Thread]::Sleep(250)
            $chartObject = $Worksheet.ChartObjects().Add(0, 0, [math]::Max(240, $Shape.Width * 2), [math]::Max(120, $Shape.Height * 2))
            $chart = $chartObject.Chart
            $chart.Paste() | Out-Null
            if ($chart.Shapes.Count -gt 0) {
                $pasted = $chart.Shapes.Item(1)
                $pasted.Left = 0
                $pasted.Top = 0
                $pasted.Width = $chartObject.Width
                $pasted.Height = $chartObject.Height
            }
            $chart.Export($TargetPath, 'PNG') | Out-Null
            if (Test-Path -LiteralPath $TargetPath) { return $true }
        }
        catch {
            $lastError = $_
        }
        finally {
            if ($chartObject) { $chartObject.Delete() }
        }
        [System.Threading.Thread]::Sleep(500)
    }
    Write-Warning "Failed to export shape $($Shape.Name): $lastError"
    return $false
}

if (-not (Test-Path -LiteralPath $WorkbookPath)) {
    throw "Workbook not found: $WorkbookPath"
}

$outputDirectory = Split-Path $OutputPath -Parent
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
New-Item -ItemType Directory -Path $ImageDirectory -Force | Out-Null

$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$workbook = $null

try {
    $workbook = $excel.Workbooks.Open($WorkbookPath, 0, $true)
    $pages = [ordered]@{}
    $overview = [ordered]@{}

    $overviewSheet = $workbook.Worksheets.Item('总览页')
    for ($row = 2; $row -le $overviewSheet.UsedRange.Rows.Count; $row++) {
        $name = Get-CellText $overviewSheet $row 1
        if ([string]::IsNullOrWhiteSpace($name)) { continue }
        $currentDescription = Get-CellText $overviewSheet $row 2
        $revisedDescription = Get-CellText $overviewSheet $row 3
        $currentTags = Get-CellText $overviewSheet $row 4
        $revisedTags = Get-CellText $overviewSheet $row 5
        $currentSeries = Get-CellText $overviewSheet $row 6
        $revisedSeries = Get-CellText $overviewSheet $row 7
        $overview[$name] = [ordered]@{
            description = $(if ($revisedDescription) { $revisedDescription } else { $currentDescription })
            tags = $(if ($revisedTags) { $revisedTags } else { $currentTags })
            recommended = $(if ($revisedSeries) { $revisedSeries } else { $currentSeries })
        }
    }

    foreach ($definition in $pageDefinitions) {
        $worksheet = $workbook.Worksheets.Item($definition.Sheet)
        $columnCount = $worksheet.UsedRange.Columns.Count
        $rowCount = $worksheet.UsedRange.Rows.Count
        $headers = @()
        for ($column = 1; $column -le $columnCount; $column++) {
            $headers += (Get-CellText $worksheet 1 $column)
        }

        $columns = [ordered]@{
            Tab = Find-Column $headers @('一级Tab') @('一级Tab')
            Sub = Find-Column $headers @('子应用名称') @('子应用')
            Module = Find-Column $headers @() @('电路拓扑图对应模块名称')
            Description = Find-Column $headers @() @('应用要求')
            Series = Find-Column $headers @() @('规格-系列')
            Spec = Find-Column $headers @('规格（修改）') @()
            PartNumber = Find-Column $headers @('料号') @('规格-料号')
            Voltage = Find-Column $headers @() @('电压')
            Capacitance = Find-Column $headers @() @('容量')
            Temperature = Find-Column $headers @() @('温度')
            Size = Find-Column $headers @() @('尺寸')
            Esr = Find-Column $headers @() @('ESR')
            Ripple = Find-Column $headers @() @('纹波')
            Life = Find-Column $headers @() @('寿命')
            Note = Find-Column $headers @() @('备注')
        }

        $overviewEntry = $(if ($definition.Overview) { $overview[$definition.Overview] } else { $null })
        $heroDescription = $(if ($definition.Description) { $definition.Description } elseif ($overviewEntry) { $overviewEntry.description } else { '' })
        $heroTagsText = $(if ($definition.Tags) { $definition.Tags } elseif ($overviewEntry) { $overviewEntry.tags } else { '' })
        $heroTags = [System.Collections.ArrayList]@()
        foreach ($tag in ($heroTagsText -split '\s*/\s*')) {
            if ($tag.Trim()) { [void]$heroTags.Add($tag.Trim()) }
        }

        $page = [ordered]@{
            sheet = $definition.Sheet
            icon = $definition.Icon
            hero = [ordered]@{
                title = $definition.Title
                description = $heroDescription
                tags = $heroTags
            }
            tabs = [System.Collections.ArrayList]@()
        }
        $currentTab = $null
        $currentSub = $null
        $currentModule = $null
        $currentSeries = ''

        for ($row = 2; $row -le $rowCount; $row++) {
            $tabName = Get-CellText $worksheet $row $columns.Tab
            $subName = Get-CellText $worksheet $row $columns.Sub
            $moduleName = Get-CellText $worksheet $row $columns.Module
            $description = Get-CellText $worksheet $row $columns.Description

            if ($tabName.StartsWith('▸') -or ($tabName -match '个子应用' -and -not $subName)) { continue }

            if ($tabName) {
                $currentTab = $page.tabs | Where-Object { $_.name -eq $tabName } | Select-Object -First 1
                if (-not $currentTab) {
                    $currentTab = [ordered]@{
                        key = 't' + $page.tabs.Count
                        name = $tabName
                        icon = Get-Icon $tabName $definition.Icon
                        subApps = [System.Collections.ArrayList]@()
                    }
                    [void]$page.tabs.Add($currentTab)
                }
            }

            if ($subName) {
                if (-not $currentTab) { continue }
                $currentSub = $currentTab.subApps | Where-Object { $_.name -eq $subName } | Select-Object -First 1
                if (-not $currentSub) {
                    $currentSub = [ordered]@{
                        name = $subName
                        icon = Get-Icon "$($currentTab.name) $subName" $definition.Icon
                        description = ''
                        topologyImages = [System.Collections.ArrayList]@()
                        modules = [System.Collections.ArrayList]@()
                        _startRow = $row
                    }
                    [void]$currentTab.subApps.Add($currentSub)
                }
                $currentModule = $null
                $currentSeries = ''
            }

            if (-not $currentSub) { continue }

            if ($moduleName) {
                $currentModule = [ordered]@{
                    name = $moduleName
                    icon = Get-Icon $moduleName $currentSub.icon
                    desc = ''
                    specs = [System.Collections.ArrayList]@()
                }
                [void]$currentSub.modules.Add($currentModule)
                $currentSeries = ''
            }

            if ($description) {
                $currentSub.description = Add-UniqueText $currentSub.description $description
                if (-not $currentModule) {
                    $currentModule = [ordered]@{
                        name = '关键电容应用位置'
                        icon = $currentSub.icon
                        desc = ''
                        specs = [System.Collections.ArrayList]@()
                    }
                    [void]$currentSub.modules.Add($currentModule)
                }
                $currentModule.desc = Add-UniqueText $currentModule.desc $description
            }

            $series = Get-CellText $worksheet $row $columns.Series
            if ($series) { $currentSeries = $series }
            $partNumber = Get-CellText $worksheet $row $columns.PartNumber
            if (-not $partNumber) { continue }

            if (-not $currentModule) {
                $currentModule = [ordered]@{
                    name = '关键电容应用位置'
                    icon = $currentSub.icon
                    desc = $currentSub.description
                    specs = [System.Collections.ArrayList]@()
                }
                [void]$currentSub.modules.Add($currentModule)
            }

            $spec = [ordered]@{
                series = $currentSeries
                spec = Get-CellText $worksheet $row $columns.Spec
                pn = $partNumber
                voltage = Get-CellText $worksheet $row $columns.Voltage
                cap = Get-CellText $worksheet $row $columns.Capacitance
                temperature = Get-CellText $worksheet $row $columns.Temperature
                life = Get-CellText $worksheet $row $columns.Life
                size = Get-CellText $worksheet $row $columns.Size
                esr = Get-CellText $worksheet $row $columns.Esr
                ripple = Get-CellText $worksheet $row $columns.Ripple
                note = Get-CellText $worksheet $row $columns.Note
            }
            [void]$currentModule.specs.Add($spec)
        }

        $shapeIndex = 0
        foreach ($shape in $worksheet.Shapes) {
            $shapeIndex++
            $anchorRow = $shape.TopLeftCell.Row
            $targetSub = $null
            foreach ($tab in $page.tabs) {
                foreach ($sub in $tab.subApps) {
                    if ($sub._startRow -le $anchorRow -and (-not $targetSub -or $sub._startRow -gt $targetSub._startRow)) {
                        $targetSub = $sub
                    }
                }
            }
            if (-not $targetSub) { continue }
            $fileName = '{0}-{1:D2}.png' -f $definition.PageKey, $shapeIndex
            $targetPath = Join-Path $ImageDirectory $fileName
            if (Export-WorksheetShape $worksheet $shape $targetPath) {
                [void]$targetSub.topologyImages.Add([ordered]@{
                    src = 'assets/application-collected/' + $fileName
                    alt = $targetSub.name + '电路拓扑图'
                })
            }
        }

        foreach ($tab in $page.tabs) {
            foreach ($sub in $tab.subApps) {
                foreach ($module in $sub.modules) {
                    if (-not $module.desc) { $module.desc = $sub.description }
                }
                $sub.Remove('description')
                $sub.Remove('_startRow')
            }
        }

        $pages[$definition.PageKey] = $page
    }

    $payload = [ordered]@{
        source = [System.IO.Path]::GetFileName($WorkbookPath)
        overview = $overview
        pages = $pages
    }
    $json = $payload | ConvertTo-Json -Depth 100
    $json = $json.Replace(([char]0x2028).ToString(), '\u2028').Replace(([char]0x2029).ToString(), '\u2029')
    $javascript = @"
(function (global) {
    'use strict';
    global.YMIN = global.YMIN || {};
    var data = $json;
    data.getPage = function (pageKey) { return data.pages[pageKey] || null; };
    global.YMIN.applicationCollected = data;
})(window);
"@
    [System.IO.File]::WriteAllText($OutputPath, $javascript, (New-Object System.Text.UTF8Encoding($false)))

    $summary = foreach ($key in $pages.Keys) {
        $page = $pages[$key]
        $subCount = 0
        $moduleCount = 0
        $partCount = 0
        foreach ($tab in $page.tabs) {
            $subCount += $tab.subApps.Count
            foreach ($sub in $tab.subApps) {
                $moduleCount += $sub.modules.Count
                foreach ($module in $sub.modules) { $partCount += $module.specs.Count }
            }
        }
        [pscustomobject]@{ Page = $key; Tabs = $page.tabs.Count; SubApps = $subCount; Modules = $moduleCount; Parts = $partCount }
    }
    $summary | Format-Table -AutoSize
    Write-Output "Generated: $OutputPath"
    Write-Output "Images: $ImageDirectory"
}
finally {
    if ($workbook) { $workbook.Close($false) }
    $excel.Quit()
    if ($workbook) { [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($workbook) }
    [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel)
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
}
