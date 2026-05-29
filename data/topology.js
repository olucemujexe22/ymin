/**
 * 永铭官网 — 电路拓扑图渲染函数（共享）
 * 由 application-*.html 页面引用
 * 使用方式: <script src="data/topology.js"></script>
 * 调用: renderTopologySVG(nodes, highlight, seriesMap)
 *
 * @param {string[]} nodes     - 节点名称数组，如 ['光伏板','DC-DC','DC-Link','逆变']
 * @param {number[]} highlight - 高亮节点索引数组，如 [2]
 * @param {Object}  seriesMap  - { index: { name: 'CW3H', link: 'product-center.html?series=CW3H' } }
 * @returns {string} HTML 字符串
 */
function renderTopologySVG(nodes, highlight, seriesMap) {
    if (!nodes || nodes.length === 0) return '';

    var cols = Math.min(nodes.length, 5);
    var boxW = 90, boxH = 44, gap = 14;
    var totalW = cols * boxW + (cols - 1) * gap;
    var svgW = Math.max(totalW + 60, 360);
    var svgH = 160;
    var startX = (svgW - totalW) / 2;
    var midY = svgH / 2;

    var svg = '<div class="topo-container mb-4"><div class="flex items-center justify-between mb-3"><p class="text-[10px] text-slate-400 uppercase flex items-center gap-1"><span class="material-symbols-outlined text-xs">circuit_board</span> 电路拓扑图</p><div class="flex gap-2 text-[9px]"><span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-sm bg-[#dbeafe] border border-[#1B365D] inline-block"></span> 推荐产品位置</span><span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-sm bg-[#e2e8f0] border border-[#94a3b8] inline-block"></span> 功能模块</span></div></div>';

    svg += '<svg viewBox="0 0 ' + svgW + ' ' + svgH + '" class="topo-svg">';

    // 背景网格（电路板风格）
    svg += '<defs><pattern id="grid_' + nodes.length + '" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e8ecf1" stroke-width="0.3"/></pattern></defs>';
    svg += '<rect width="' + svgW + '" height="' + svgH + '" fill="url(#grid_' + nodes.length + ')"/>';

    // 电源输入（左侧）— 标准电路符号
    svg += '<g class="topo-power">';
    svg += '<circle cx="22" cy="' + midY + '" r="12" fill="#1B365D" stroke="#1B365D" stroke-width="2"/>';
    svg += '<text x="22" y="' + (midY + 4) + '" font-size="7" text-anchor="middle" fill="#ffffff" font-weight="bold">VCC</text>';
    svg += '<line x1="22" y1="' + (midY - 12) + '" x2="22" y2="' + (midY - 18) + '" stroke="#1B365D" stroke-width="2"/>';
    svg += '<line x1="16" y1="' + (midY - 18) + '" x2="28" y2="' + (midY - 18) + '" stroke="#1B365D" stroke-width="2"/>';
    svg += '</g>';
    svg += '<text x="22" y="' + (midY + 24) + '" font-size="6" text-anchor="middle" fill="#64748b">电源输入</text>';

    // 主电源母线（带电流流动动画）
    svg += '<line x1="34" y1="' + midY + '" x2="' + startX + '" y2="' + midY + '" class="topo-line-flow"/>';

    // 节点
    for (var i = 0; i < nodes.length; i++) {
        var x = startX + i * (boxW + gap);
        var y = midY - boxH / 2;
        var isHL = highlight && highlight.indexOf(i) >= 0;
        var series = seriesMap && seriesMap[i] ? seriesMap[i] : null;

        svg += '<g class="topo-node">';
        svg += '<rect x="' + x + '" y="' + y + '" width="' + boxW + '" height="' + boxH + '" rx="4" class="topo-rect" fill="' + (isHL ? '#dbeafe' : '#e2e8f0') + '" stroke="' + (isHL ? '#1B365D' : '#94a3b8') + '" stroke-width="1.5"/>';
        svg += '<text x="' + (x + boxW / 2) + '" y="' + (y + boxH / 2 + 2) + '" font-size="9" text-anchor="middle" class="topo-label" fill="' + (isHL ? '#1B365D' : '#1e293b') + '" font-weight="' + (isHL ? 'bold' : 'normal') + '">' + nodes[i] + '</text>';

        // 推荐系列标签（在方块下方）
        if (series) {
            var tagY = y + boxH + 4, tagW = 50, tagH = 14, tagX = x + (boxW - tagW) / 2;
            svg += '<a href="' + series.link + '">';
            svg += '<rect x="' + tagX + '" y="' + tagY + '" width="' + tagW + '" height="' + tagH + '" rx="3" class="topo-series-tag" fill="' + (isHL ? '#1B365D' : '#94a3b8') + '" opacity="0.9"/>';
            svg += '<text x="' + (tagX + tagW / 2) + '" y="' + (tagY + tagH / 2 + 1) + '" font-size="7" text-anchor="middle" class="topo-series-text" fill="#ffffff" font-weight="bold">' + series.name + '</text>';
            svg += '</a>';
        }
        svg += '</g>';

        // 节点间连线
        if (i < nodes.length - 1) {
            var x1 = x + boxW, x2 = x + boxW + gap, cy = midY;
            svg += '<line x1="' + x1 + '" y1="' + cy + '" x2="' + x2 + '" y2="' + cy + '" class="topo-line"/>';
            svg += '<circle cx="' + x1 + '" cy="' + cy + '" r="2.5" class="topo-dot"/>';
            svg += '<circle cx="' + x2 + '" cy="' + cy + '" r="2.5" class="topo-dot"/>';
            svg += '<polygon points="' + (x2 - 3) + ',' + (cy - 4) + ' ' + x2 + ',' + cy + ' ' + (x2 - 3) + ',' + (cy + 4) + '" class="topo-arrow"/>';
        }
    }

    // 接地符号（右侧）
    var lastX = startX + (nodes.length - 1) * (boxW + gap) + boxW;
    svg += '<line x1="' + lastX + '" y1="' + midY + '" x2="' + (lastX + 16) + '" y2="' + midY + '" class="topo-line"/>';
    svg += '<circle cx="' + lastX + '" cy="' + midY + '" r="2.5" class="topo-dot"/>';
    svg += '<line x1="' + (lastX + 16) + '" y1="' + midY + '" x2="' + (lastX + 16) + '" y2="' + (midY + 8) + '" class="topo-gnd-line"/>';
    svg += '<line x1="' + (lastX + 10) + '" y1="' + (midY + 8) + '" x2="' + (lastX + 22) + '" y2="' + (midY + 8) + '" class="topo-gnd-line"/>';
    svg += '<line x1="' + (lastX + 12) + '" y1="' + (midY + 12) + '" x2="' + (lastX + 20) + '" y2="' + (midY + 12) + '" class="topo-gnd-line"/>';
    svg += '<line x1="' + (lastX + 14) + '" y1="' + (midY + 16) + '" x2="' + (lastX + 18) + '" y2="' + (midY + 16) + '" class="topo-gnd-line"/>';
    svg += '<text x="' + (lastX + 16) + '" y="' + (midY + 28) + '" font-size="6" text-anchor="middle" fill="#64748b">GND</text>';

    // 分支电路（旁路电容符号）
    if (nodes.length >= 2) {
        var midNodeX = startX + Math.floor(nodes.length / 2) * (boxW + gap) + boxW / 2;
        svg += '<line x1="' + midNodeX + '" y1="' + (midY - boxH / 2) + '" x2="' + midNodeX + '" y2="' + (midY - boxH / 2 - 14) + '" class="topo-line" stroke-dasharray="3,3"/>';
        svg += '<line x1="' + (midNodeX - 6) + '" y1="' + (midY - boxH / 2 - 14) + '" x2="' + (midNodeX + 6) + '" y2="' + (midY - boxH / 2 - 14) + '" stroke="#1B365D" stroke-width="2"/>';
        svg += '<line x1="' + (midNodeX - 6) + '" y1="' + (midY - boxH / 2 - 18) + '" x2="' + (midNodeX + 6) + '" y2="' + (midY - boxH / 2 - 18) + '" stroke="#1B365D" stroke-width="2"/>';
        svg += '<text x="' + (midNodeX + 14) + '" y="' + (midY - boxH / 2 - 14) + '" font-size="5" fill="#64748b">C</text>';
    }

    svg += '</svg></div>';
    return svg;
}
