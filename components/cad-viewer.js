(function () {
  "use strict";

  var OCCT_DIST = "https://cdn.jsdelivr.net/npm/occt-import-js@0.0.23/dist/";
  var PAGE_DEFAULT = 20;
  var DEFAULT_FEATURED_ITEM = "KCGL1602G330MF";
  var DEFAULT_FEATURED_SERIES = "KCG";
  var displayModes = ["solid", "xray", "wireframe"];
  var state = {
    models: Array.isArray(window.YMIN_CAD_MODELS) ? window.YMIN_CAD_MODELS : [],
    products: Array.isArray(window.YMIN_CAD_PRODUCTS)
      ? window.YMIN_CAD_PRODUCTS
      : (window.YMIN_PRODUCT_CATALOG && Array.isArray(window.YMIN_PRODUCT_CATALOG.products)
        ? window.YMIN_PRODUCT_CATALOG.products : []),
    productRows: [],
    viewMode: "product",
    filtered: [],
    selected: new Set(),
    page: 1,
    pageSize: PAGE_DEFAULT,
    currentModel: null,
    currentProduct: null,
    previewModels: [],
    previousFocus: null,
    loadToken: 0,
    viewerReady: false,
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    modelGroup: null,
    grid: null,
    axes: null,
    boundsHelper: null,
    modelBox: null,
    occtPromise: null,
    autoRotate: false,
    edgesVisible: true,
    boundsVisible: false,
    displayModeIndex: 1,
    currentView: "iso",
    resizeObserver: null,
    toastTimer: null
  };

  function byId(id) {
    return document.getElementById(id);
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatNumber(value, digits) {
    if (value == null || !isFinite(value)) return "—";
    return Number(value).toFixed(digits == null ? 2 : digits).replace(/\.?0+$/, "") + " mm";
  }

  function formatFileSize(bytes) {
    if (!bytes) return "—";
    if (bytes < 1024) return bytes + " B";
    return (bytes / 1024).toFixed(bytes > 102400 ? 0 : 1) + " KB";
  }

  function unique(values) {
    return values.filter(function (value, index) {
      return value && values.indexOf(value) === index;
    });
  }

  function modelById(id) {
    return state.models.find(function (model) { return model.id === id; });
  }

  function currentRows() {
    return state.viewMode === "product"
      ? state.productRows
      : state.models.map(function (model) { return { id: "model:" + model.id, type: "model", model: model }; });
  }

  function rowById(id) {
    return currentRows().find(function (row) { return row.id === id; });
  }

  function rowModels(row) {
    if (!row) return [];
    return row.type === "product" ? row.models : [row.model];
  }

  function buildProductRows() {
    var modelsByItem = {};
    state.models.forEach(function (model) {
      unique(model.itemNos || []).forEach(function (itemNo) {
        if (!modelsByItem[itemNo]) modelsByItem[itemNo] = [];
        modelsByItem[itemNo].push(model);
      });
    });
    state.productRows = state.products.filter(function (product) {
      return modelsByItem[product.itemNo] && modelsByItem[product.itemNo].length;
    }).map(function (product) {
      return {
        id: "product:" + product.itemNo,
        type: "product",
        product: product,
        models: modelsByItem[product.itemNo]
      };
    }).sort(function (a, b) {
      return a.product.itemNo.localeCompare(b.product.itemNo, "zh-CN", { numeric: true });
    });
  }

  function init() {
    if (window.YMIN) {
      if (YMIN.navbar && YMIN.navbar.inject) YMIN.navbar.inject("tools");
      if (YMIN.footer && YMIN.footer.inject) YMIN.footer.inject();
    }
    bindPageEvents();
    bindViewerEvents();
    buildProductRows();
    updateTableHead();
    populateFilters();
    updateHeroStats();
    var urlItem = new URLSearchParams(window.location.search).get("item");
    if (urlItem) byId("cadSearch").value = urlItem;
    applyFilters();
    if (!state.models.length || !state.products.length) {
      renderMessage("error", "模型索引未加载，请确认 data/cad-models.js 文件存在。", "error");
    }
  }

  function updateHeroStats() {
    var categories = unique(state.productRows.map(function (row) { return row.product.category; }));
    byId("cadMappedProductCount").textContent = state.productRows.length.toLocaleString("zh-CN");
    byId("cadTotalCount").textContent = state.models.length;
    byId("cadCategoryCount").textContent = categories.length;
  }

  function populateFilters() {
    var rows = currentRows();
    var packages = [];
    var categories = [];
    var series = [];
    if (state.viewMode === "product") {
      packages = unique(rows.map(function (row) { return row.product.package; }));
      categories = unique(rows.map(function (row) { return row.product.category; }));
      series = unique(rows.map(function (row) { return row.product.series; }));
    } else {
      packages = unique(rows.map(function (row) { return row.model.package; }));
      categories = unique(rows.map(function (row) { return row.model.category; }));
      rows.forEach(function (row) { series = series.concat(row.model.series || []); });
      series = unique(series);
    }
    setSelectOptions("cadPackageFilter", "全部封装", packages);
    setSelectOptions("cadCategoryFilter", "全部类别", categories);
    setSelectOptions("cadSeriesFilter", "全部系列", series);
  }

  function requestProduct() {
    var query = byId("cadSearch").value.trim().toLowerCase();
    if (!query) return null;
    return state.products.find(function (product) {
      return String(product.itemNo || "").trim().toLowerCase() === query;
    }) || null;
  }

  function buildRequestUrl() {
    var params = new URLSearchParams();
    var query = byId("cadSearch").value.trim();
    var product = requestProduct();
    var likelyItemNo = /^[A-Za-z0-9_.-]{5,}$/.test(query) ? query : "";
    var values = product ? {
      item: product.itemNo,
      category: product.category,
      series: product.series,
      package: product.package,
      voltage: product.voltage,
      capacitance: product.capacitance,
      size: product.size
    } : {
      item: likelyItemNo,
      category: byId("cadCategoryFilter").value,
      series: byId("cadSeriesFilter").value,
      package: byId("cadPackageFilter").value
    };
    Object.keys(values).forEach(function (key) {
      if (values[key]) params.set(key, values[key]);
    });
    return "design-3d-cad-request.html" + (params.toString() ? "?" + params.toString() : "");
  }

  function updateRequestLinks() {
    var entry = byId("cadRequestEntry");
    if (entry) entry.href = buildRequestUrl();
  }

  function setSelectOptions(id, emptyLabel, values) {
    var select = byId(id);
    select.innerHTML = '<option value="">' + escapeHtml(emptyLabel) + '</option>';
    values.slice().sort(function (a, b) {
      var aLabel = typeof a === "object" ? a.label : a;
      var bLabel = typeof b === "object" ? b.label : b;
      return String(aLabel).localeCompare(String(bLabel), "zh-CN", { numeric: true });
    }).forEach(function (entry) {
      var option = document.createElement("option");
      option.value = typeof entry === "object" ? entry.value : entry;
      option.textContent = typeof entry === "object" ? entry.label : entry;
      select.appendChild(option);
    });
  }

  function bindPageEvents() {
    var filterIds = ["cadPackageFilter", "cadCategoryFilter", "cadSeriesFilter", "cadDiameterFilter", "cadLengthFilter"];
    filterIds.forEach(function (id) {
      byId(id).addEventListener("change", function () {
        state.page = 1;
        applyFilters();
      });
    });
    byId("cadSearch").addEventListener("input", debounce(function () {
      state.page = 1;
      applyFilters();
    }, 120));
    document.querySelectorAll("[data-cad-mode]").forEach(function (button) {
      button.addEventListener("click", function () { setViewMode(button.getAttribute("data-cad-mode")); });
    });
    byId("cadClearFilters").addEventListener("click", clearFilters);
    byId("cadActiveFilters").addEventListener("click", function (event) {
      var button = event.target.closest("button[data-clear-filter]");
      if (!button) return;
      byId(button.getAttribute("data-clear-filter")).value = "";
      state.page = 1;
      applyFilters();
    });
    byId("cadTableBody").addEventListener("click", handleTableClick);
    byId("cadTableBody").addEventListener("change", handleRowSelection);
    byId("cadBatchDownload").addEventListener("click", downloadSelected);
    byId("cadPagePrev").addEventListener("click", function () {
      if (state.page > 1) {
        state.page -= 1;
        renderTable();
      }
    });
    byId("cadPageNext").addEventListener("click", function () {
      if (state.page < getPageCount()) {
        state.page += 1;
        renderTable();
      }
    });
    byId("cadPageSize").addEventListener("change", function () {
      state.pageSize = Number(this.value) || PAGE_DEFAULT;
      state.page = 1;
      renderTable();
    });
  }

  function setViewMode(mode) {
    if (["product", "model"].indexOf(mode) === -1 || mode === state.viewMode) return;
    state.viewMode = mode;
    state.page = 1;
    state.selected.clear();
    document.querySelectorAll("[data-cad-mode]").forEach(function (button) {
      var active = button.getAttribute("data-cad-mode") === mode;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    populateFilters();
    updateTableHead();
    applyFilters();
  }

  function updateTableHead() {
    var productMode = state.viewMode === "product";
    byId("cadResultLabel").textContent = productMode ? "产品 CAD 结果" : "共享 CAD 模型";
    byId("cadFilterTitle").lastChild.textContent = productMode ? "查找产品 CAD" : "筛选共享模型";
    var headers = productMode
      ? ["产品料号 / 系列", "产品类别 / 封装", "目录尺寸", "关键参数", "CAD 文件", "格式", "预览与详情"]
      : ["目录尺寸 / CAD 文件", "产品类别", "封装 / 结构", "安装信息", "可能适用产品", "文件信息", "预览与下载"];
    byId("cadTableHeadRow").innerHTML = '<th class="cad-check-cell"><input class="cad-checkbox" id="cadSelectAll" type="checkbox" aria-label="选择当前页全部' +
      (productMode ? "产品" : "模型") + '"></th>' + headers.map(function (header, index) {
        return '<th' + (index === headers.length - 1 ? ' style="text-align:right"' : '') + '>' + escapeHtml(header) + '</th>';
      }).join("");
    byId("cadSelectAll").addEventListener("change", toggleCurrentPageSelection);
  }

  function clearFilters() {
    ["cadSearch", "cadPackageFilter", "cadCategoryFilter", "cadSeriesFilter", "cadDiameterFilter", "cadLengthFilter"].forEach(function (id) {
      byId(id).value = "";
    });
    state.page = 1;
    applyFilters();
  }

  function rangeIncludes(value, range) {
    if (!range) return true;
    var parts = range.split("-").map(Number);
    return value != null && value >= parts[0] && value < parts[1];
  }

  function numericProductDimensions(product) {
    return unique([product.diameter, product.length, product.width, product.height, product.thickness]
      .map(Number).filter(function (value) { return isFinite(value) && value > 0; }));
  }

  function nominalModelDimensions(model) {
    return (model.nominalDimensions || model.dimensions || []).map(Number)
      .filter(function (value) { return isFinite(value) && value > 0; });
  }

  function applyFilters() {
    var query = byId("cadSearch").value.trim().toLowerCase();
    var packageKey = byId("cadPackageFilter").value;
    var category = byId("cadCategoryFilter").value;
    var series = byId("cadSeriesFilter").value;
    var diameterRange = byId("cadDiameterFilter").value;
    var lengthRange = byId("cadLengthFilter").value;
    var rows = currentRows();
    var exactSeriesQuery = query && rows.some(function (row) {
      var values = row.type === "product" ? [row.product.series] : (row.model.series || []);
      return values.some(function (value) { return String(value || "").trim().toLowerCase() === query; });
    });

    state.filtered = rows.filter(function (row) {
      var models = rowModels(row);
      var product = row.product;
      var dimensions = product ? numericProductDimensions(product) : nominalModelDimensions(row.model);
      var minDimension = dimensions.length ? Math.min.apply(null, dimensions) : null;
      var maxDimension = dimensions.length ? Math.max.apply(null, dimensions) : null;
      var rowPackage = product ? product.package : row.model.package;
      var rowCategory = product ? product.category : row.model.category;
      var rowSeries = product ? [product.series] : (row.model.series || []);
      var matchesExactSeries = rowSeries.some(function (value) {
        return String(value || "").trim().toLowerCase() === query;
      });
      var haystack = (product ? [
        product.itemNo, product.series, product.category, product.package, product.size,
        product.voltage, product.capacitance, product.temperature, product.status
      ] : []).concat(models.reduce(function (values, model) {
        return values.concat([
          model.model, model.nominal, model.actualSize, model.fileName, model.category,
          model.package, model.subtype, model.collection, model.step,
          product ? "" : (model.series || []).join(" "),
          product ? "" : (model.itemNos || []).join(" ")
        ]);
      }, [])).join(" ").toLowerCase();
      return (!query || (exactSeriesQuery ? matchesExactSeries : haystack.indexOf(query) !== -1)) &&
        (!packageKey || rowPackage === packageKey) &&
        (!category || rowCategory === category) &&
        (!series || rowSeries.indexOf(series) !== -1) &&
        rangeIncludes(minDimension, diameterRange) &&
        rangeIncludes(maxDimension, lengthRange);
    });
    var hasActiveFilters = query || packageKey || category || series || diameterRange || lengthRange;
    if (state.viewMode === "product" && !hasActiveFilters) {
      state.filtered.sort(function (a, b) {
        var aItem = a.product.itemNo === DEFAULT_FEATURED_ITEM ? 0 : 1;
        var bItem = b.product.itemNo === DEFAULT_FEATURED_ITEM ? 0 : 1;
        if (aItem !== bItem) return aItem - bItem;
        var aSeries = a.product.series === DEFAULT_FEATURED_SERIES ? 0 : 1;
        var bSeries = b.product.series === DEFAULT_FEATURED_SERIES ? 0 : 1;
        if (aSeries !== bSeries) return aSeries - bSeries;
        return a.product.itemNo.localeCompare(b.product.itemNo, "zh-CN", { numeric: true });
      });
    }
    renderActiveFilters();
    updateRequestLinks();
    renderTable();
  }

  function renderActiveFilters() {
    var values = [
      { id: "cadSearch", label: "关键词", value: byId("cadSearch").value.trim() },
      { id: "cadPackageFilter", label: "封装", value: selectedText("cadPackageFilter") },
      { id: "cadCategoryFilter", label: "类别", value: selectedText("cadCategoryFilter") },
      { id: "cadSeriesFilter", label: "系列", value: selectedText("cadSeriesFilter") },
      { id: "cadDiameterFilter", label: "最小外形", value: selectedText("cadDiameterFilter") },
      { id: "cadLengthFilter", label: "最大外形", value: selectedText("cadLengthFilter") }
    ].filter(function (item) { return item.value; });
    var container = byId("cadActiveFilters");
    if (!values.length) {
      container.innerHTML = '<span class="cad-filter-hint">' + (state.viewMode === "product"
        ? "默认按产品展示；输入完整料号可直接定位其共享 STEP 模型"
        : "同一 CAD 可对应多个相同封装与目录尺寸的产品料号") + '</span>';
      return;
    }
    container.innerHTML = values.map(function (item) {
      return '<span class="cad-filter-chip">' + escapeHtml(item.label + "：" + item.value) +
        '<button type="button" aria-label="移除' + escapeHtml(item.label) + '筛选" data-clear-filter="' + item.id + '">×</button></span>';
    }).join("");
  }

  function selectedText(id) {
    var select = byId(id);
    return select.value ? select.options[select.selectedIndex].text : "";
  }

  function getPageCount() {
    return Math.max(1, Math.ceil(state.filtered.length / state.pageSize));
  }

  function currentPageRows() {
    var start = (state.page - 1) * state.pageSize;
    return state.filtered.slice(start, start + state.pageSize);
  }

  function renderTable() {
    var pageCount = getPageCount();
    if (state.page > pageCount) state.page = pageCount;
    var rows = currentPageRows();
    var body = byId("cadTableBody");
    byId("cadResultCount").textContent = state.viewMode === "product"
      ? "共 " + state.filtered.length.toLocaleString("zh-CN") + " 个已匹配 CAD 的料号"
      : "共 " + state.filtered.length + " 个 STEP 文件 · " + unique(state.filtered.map(function (row) { return row.model.fileHash || row.model.id; })).length + " 个唯一几何";

    if (!rows.length) {
      renderMessage("search_off", "没有符合当前条件的 3D-CAD 模型", "empty");
    } else {
      body.innerHTML = rows.map(function (row) {
        return row.type === "product" ? renderProductRow(row) : renderModelRow(row);
      }).join("");
    }

    byId("cadPageIndicator").textContent = state.page + " / " + pageCount + " 页";
    byId("cadPagePrev").disabled = state.page <= 1;
    byId("cadPageNext").disabled = state.page >= pageCount;
    updateSelectionUI();
  }

  function renderMessage(icon, message, variant) {
    var action = variant === "empty"
      ? '<a class="cad-button cad-button-primary cad-empty-action" href="' + escapeHtml(buildRequestUrl()) + '">' +
        '<span class="material-symbols-outlined">add_box</span>申请 3D-CAD</a>'
      : "";
    byId("cadTableBody").innerHTML = '<tr><td class="cad-table-message" colspan="8">' +
      '<span class="material-symbols-outlined">' + escapeHtml(icon) + '</span><strong>' +
      escapeHtml(message) + '</strong>' + (variant === "empty"
        ? '<small>若当前料号没有模型，可提交需求信息。</small>' : "") + action + '</td></tr>';
  }

  function renderBadges(values, className, empty) {
    if (!values || !values.length) return '<span class="cad-subline">' + (empty || "—") + '</span>';
    var shown = values.slice(0, 3);
    var html = shown.map(function (value) {
      return '<span class="' + className + '">' + escapeHtml(value) + '</span>';
    }).join("");
    if (values.length > shown.length) {
      html += '<span class="' + className + '" title="' + escapeHtml(values.join("、")) + '">+' + (values.length - shown.length) + '</span>';
    }
    return html;
  }

  function productDimensionEntries(product) {
    var entries = [];
    function add(label, value) { if (String(value || "").trim()) entries.push({ label: label, value: String(value).trim() }); }
    if (product.diameter && product.length && !product.width) {
      add("D", product.diameter); add("L", product.length);
    } else if (product.length && product.width && product.height) {
      add("L", product.length); add("W", product.width); add("H", product.height);
    } else if (product.width && product.height && product.thickness) {
      add("W", product.width); add("H", product.height); add("T", product.thickness);
    } else {
      add("D", product.diameter); add("L", product.length); add("W", product.width);
      add("H", product.height); add("T", product.thickness);
    }
    return entries;
  }

  function productDimensionText(product) {
    var entries = productDimensionEntries(product);
    if (!entries.length) return product.size || "目录尺寸待补";
    return entries.map(function (entry) { return entry.label + " " + entry.value; }).join(" × ") + " mm";
  }

  function productDimensionHtml(product) {
    var entries = productDimensionEntries(product);
    var main = product.size ? product.size + (String(product.size).indexOf("mm") === -1 ? " mm" : "") : productDimensionText(product);
    return '<span class="cad-dimension-main">' + escapeHtml(main) + '</span>' +
      (entries.length ? '<span class="cad-dimension-labels">' + entries.map(function (entry) {
        return '<span><b>' + escapeHtml(entry.label) + '</b> ' + escapeHtml(entry.value) + '</span>';
      }).join("") + '</span>' : '');
  }

  function productElectricalText(product) {
    return [product.voltage, product.capacitance, product.temperature ? product.temperature + " ℃" : ""]
      .filter(Boolean).join(" · ") || "参数待补";
  }

  function renderProductRow(row) {
    var product = row.product;
    var models = row.models;
    var selected = state.selected.has(row.id);
    var multiple = models.length > 1;
    var model = models[0];
    var modelLabel = multiple ? models.length + " 份可选 CAD" : model.nominal + " · " + model.package;
    var files = unique(models.map(function (candidate) { return candidate.fileName; }));
    return '<tr class="' + (selected ? "is-selected" : "") + '" data-row-id="' + escapeHtml(row.id) + '">' +
      '<td class="cad-check-cell"><input class="cad-checkbox cad-row-check" type="checkbox" aria-label="选择 ' + escapeHtml(product.itemNo) + '" data-row-id="' + escapeHtml(row.id) + '" ' + (selected ? "checked" : "") + '></td>' +
      '<td><a class="cad-part-number" href="product-detail.html?pn=' + encodeURIComponent(product.itemNo) + '">' + escapeHtml(product.itemNo) + '</a><span class="cad-series-name">' + escapeHtml(product.series || "系列待补") + ' 系列</span></td>' +
      '<td><span class="cad-category-badge">' + escapeHtml(product.category || "类别待补") + '</span><span class="cad-subline">' + escapeHtml(product.package || model.package || "封装待补") + '</span></td>' +
      '<td>' + productDimensionHtml(product) + '</td>' +
      '<td><span class="cad-electrical-main">' + escapeHtml(product.voltage || "—") + ' · ' + escapeHtml(product.capacitance || "—") + '</span><span class="cad-subline">' + escapeHtml(product.temperature ? "工作温度 " + product.temperature + " ℃" : product.status || "") + '</span></td>' +
      '<td><span class="cad-model-name">' + escapeHtml(modelLabel) + '</span><span class="cad-subline" title="' + escapeHtml(files.join("、")) + '">' + escapeHtml(files.slice(0, 2).join("、")) + (files.length > 2 ? "…" : "") + '</span>' + (multiple ? '<span class="cad-candidate-status">可切换查看</span>' : '') + '</td>' +
      '<td><span class="cad-format-badge">STEP</span><span class="cad-size-muted">' + (multiple ? files.length + " 个文件" : escapeHtml(formatFileSize(model.fileSize))) + '</span></td>' +
      '<td><div class="cad-row-actions">' +
        '<button type="button" class="cad-row-button preview" data-action="preview" data-row-id="' + escapeHtml(row.id) + '"><span class="material-symbols-outlined">view_in_ar</span>' + (multiple ? "选择 / 预览" : "3D 预览") + '</button>' +
        (!multiple ? '<a class="cad-row-button icon-only" href="' + escapeHtml(model.step) + '" download="' + escapeHtml(model.fileName) + '" aria-label="下载 ' + escapeHtml(model.fileName) + '"><span class="material-symbols-outlined">download</span></a>' : '') +
        '<a class="cad-row-button icon-only" href="product-detail.html?pn=' + encodeURIComponent(product.itemNo) + '" aria-label="查看 ' + escapeHtml(product.itemNo) + ' 产品详情"><span class="material-symbols-outlined">open_in_new</span></a>' +
      '</div></td></tr>';
  }

  function renderModelRow(row) {
    var model = row.model;
    var selected = state.selected.has(row.id);
    var pitch = model.pitches && model.pitches.length ? model.pitches.join(" / ") + " mm" : "—";
    var items = model.itemNos && model.itemNos.length ? model.itemNos.slice(0, 2).join("、") : "暂无匹配料号";
    if (model.itemNos && model.itemNos.length > 2) items += " 等 " + model.itemNos.length + " 个";
    var mappingStatus = model.productCandidateCount
      ? model.productCandidateCount + " 个关联料号"
      : "暂未匹配到产品料号";
    var duplicate = model.duplicateGroup
      ? '<span class="cad-duplicate-badge" title="与其他 ' + (model.duplicateCount - 1) + ' 个文件内容完全相同">' + escapeHtml(model.duplicateGroup) + '</span>'
      : '';
    var seriesHtml = renderBadges(model.series, "cad-series-badge", "暂无匹配系列");
    return '<tr class="' + (selected ? "is-selected" : "") + '" data-row-id="' + escapeHtml(row.id) + '">' +
      '<td class="cad-check-cell"><input class="cad-checkbox cad-row-check" type="checkbox" aria-label="选择 ' + escapeHtml(model.model) + '" data-row-id="' + escapeHtml(row.id) + '" ' + (selected ? "checked" : "") + '></td>' +
      '<td><span class="cad-model-name">' + escapeHtml(model.nominal) + '</span><span class="cad-subline cad-filename" title="' + escapeHtml(model.step) + '">' + escapeHtml(model.fileName) + '</span></td>' +
      '<td><span class="cad-category-badge">' + escapeHtml(model.category) + '</span></td>' +
      '<td><span class="cad-package-badge package-' + escapeHtml(model.packageKey) + '">' + escapeHtml(model.package) + '</span><span class="cad-subline">' + escapeHtml(model.subtype || "标准结构") + '</span></td>' +
      '<td><span class="cad-model-size">目录 ' + escapeHtml(model.nominal) + '</span><span class="cad-subline">脚距 ' + escapeHtml(pitch) + '</span></td>' +
      '<td><div class="cad-series-list">' + seriesHtml + '</div><span class="cad-subline" title="' + escapeHtml((model.itemNos || []).slice(0, 20).join("、")) + '">' + escapeHtml(items) + '</span></td>' +
      '<td><span class="cad-candidate-status">' + escapeHtml(mappingStatus) + '</span><span class="cad-size-muted">' + escapeHtml(formatFileSize(model.fileSize)) + '</span>' + duplicate + '</td>' +
      '<td><div class="cad-row-actions">' +
        '<button type="button" class="cad-row-button preview" data-action="preview" data-row-id="' + escapeHtml(row.id) + '"><span class="material-symbols-outlined">view_in_ar</span>3D 预览</button>' +
        '<a class="cad-row-button" href="' + escapeHtml(model.step) + '" download="' + escapeHtml(model.fileName) + '" aria-label="下载 ' + escapeHtml(model.fileName) + '"><span class="material-symbols-outlined">download</span></a>' +
      '</div></td></tr>';
  }

  function handleTableClick(event) {
    var preview = event.target.closest("[data-action='preview']");
    if (!preview) return;
    var row = rowById(preview.getAttribute("data-row-id"));
    if (!row) return;
    var models = rowModels(row);
    openPreview(models[0].id, preview, row.product || null, models);
  }

  function handleRowSelection(event) {
    if (!event.target.classList.contains("cad-row-check")) return;
    var id = event.target.getAttribute("data-row-id");
    if (event.target.checked) state.selected.add(id);
    else state.selected.delete(id);
    var row = event.target.closest("tr");
    if (row) row.classList.toggle("is-selected", event.target.checked);
    updateSelectionUI();
  }

  function toggleCurrentPageSelection() {
    var checked = byId("cadSelectAll").checked;
    currentPageRows().forEach(function (row) {
      if (checked) state.selected.add(row.id);
      else state.selected.delete(row.id);
    });
    renderTable();
  }

  function updateSelectionUI() {
    var pageRows = currentPageRows();
    var selectedOnPage = pageRows.filter(function (row) { return state.selected.has(row.id); }).length;
    var selectAll = byId("cadSelectAll");
    selectAll.checked = pageRows.length > 0 && selectedOnPage === pageRows.length;
    selectAll.indeterminate = selectedOnPage > 0 && selectedOnPage < pageRows.length;
    byId("cadSelectedCount").textContent = "已选择 " + state.selected.size + " 个" + (state.viewMode === "product" ? "产品" : "模型");
    byId("cadBatchDownload").disabled = state.selected.size === 0;
  }

  function downloadSelected() {
    var modelMap = {};
    Array.from(state.selected).map(rowById).filter(Boolean).forEach(function (row) {
      rowModels(row).forEach(function (model) { modelMap[model.id] = model; });
    });
    var models = Object.keys(modelMap).map(function (id) { return modelMap[id]; });
    if (!models.length) return;
    showToast("将依次下载 " + models.length + " 个 STEP 文件；浏览器可能会询问是否允许多文件下载。", "download");
    models.forEach(function (model, index) {
      window.setTimeout(function () {
        var anchor = document.createElement("a");
        anchor.href = model.step;
        anchor.download = model.fileName;
        anchor.style.display = "none";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
      }, index * 220);
    });
  }

  function bindViewerEvents() {
    byId("cadModalClose").addEventListener("click", closePreview);
    byId("cadPreviewModal").addEventListener("click", function (event) {
      if (event.target === this) closePreview();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !byId("cadPreviewModal").hidden) closePreview();
    });
    byId("cadFitView").addEventListener("click", function () { setView("iso"); });
    byId("cadAutoRotate").addEventListener("click", toggleAutoRotate);
    byId("cadEdges").addEventListener("click", toggleEdges);
    byId("cadBounds").addEventListener("click", toggleBounds);
    byId("cadDisplayMode").addEventListener("click", cycleDisplayMode);
    byId("cadModelChoice").addEventListener("change", function () {
      openPreview(this.value, null, state.currentProduct, state.previewModels);
    });
    document.querySelectorAll("[data-cad-view]").forEach(function (button) {
      button.addEventListener("click", function () { setView(button.getAttribute("data-cad-view")); });
    });
  }

  function ensureViewer() {
    if (state.viewerReady) {
      resizeViewer();
      return;
    }
    var canvas = byId("cadCanvas");
    var stage = byId("cadStage");
    state.scene = new THREE.Scene();
    state.scene.background = new THREE.Color(0x07111f);
    state.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 1000);
    state.camera.up.set(0, 0, 1);
    state.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false, preserveDrawingBuffer: true });
    state.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    state.renderer.outputEncoding = THREE.sRGBEncoding;
    state.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    state.renderer.toneMappingExposure = 1.15;
    state.renderer.shadowMap.enabled = true;
    state.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    state.renderer.localClippingEnabled = true;

    state.controls = new THREE.OrbitControls(state.camera, canvas);
    state.controls.enableDamping = true;
    state.controls.dampingFactor = 0.08;
    state.controls.screenSpacePanning = true;
    state.controls.autoRotateSpeed = 1.65;
    state.controls.rotateSpeed = 0.65;
    state.controls.zoomSpeed = 0.8;

    state.scene.add(new THREE.HemisphereLight(0xd8e9ff, 0x17283e, 1.25));
    var keyLight = new THREE.DirectionalLight(0xffffff, 1.7);
    keyLight.position.set(35, -28, 48);
    keyLight.castShadow = true;
    state.scene.add(keyLight);
    var fillLight = new THREE.DirectionalLight(0x74b9ff, 0.75);
    fillLight.position.set(-28, -8, 18);
    state.scene.add(fillLight);
    var rimLight = new THREE.DirectionalLight(0x62d6cf, 0.55);
    rimLight.position.set(12, 35, 26);
    state.scene.add(rimLight);

    state.resizeObserver = new ResizeObserver(resizeViewer);
    state.resizeObserver.observe(stage);
    state.viewerReady = true;
    resizeViewer();
    animateViewer();
  }

  function resizeViewer() {
    if (!state.viewerReady) return;
    var stage = byId("cadStage");
    var width = Math.max(stage.clientWidth, 1);
    var height = Math.max(stage.clientHeight, 1);
    state.renderer.setSize(width, height, false);
    var size = state.modelBox ? state.modelBox.getSize(new THREE.Vector3()) : null;
    updateOrthographicFrustum(size ? Math.max(size.x, size.y, size.z, 1) : 20);
  }

  function updateOrthographicFrustum(maxSize) {
    if (!state.camera || !state.camera.isOrthographicCamera) return;
    var stage = byId("cadStage");
    var aspect = Math.max(stage.clientWidth, 1) / Math.max(stage.clientHeight, 1);
    var viewHeight = Math.max(maxSize || 20, 1) * 1.72;
    state.camera.left = -viewHeight * aspect / 2;
    state.camera.right = viewHeight * aspect / 2;
    state.camera.top = viewHeight / 2;
    state.camera.bottom = -viewHeight / 2;
    state.camera.zoom = 1;
    state.camera.updateProjectionMatrix();
  }

  function animateViewer() {
    requestAnimationFrame(animateViewer);
    if (!state.viewerReady) return;
    state.controls.update();
    state.renderer.render(state.scene, state.camera);
  }

  async function openPreview(id, trigger, product, previewModels) {
    var model = modelById(id);
    if (!model) return;
    state.currentModel = model;
    state.currentProduct = product || null;
    state.previewModels = previewModels && previewModels.length ? previewModels : [model];
    if (trigger) state.previousFocus = trigger;
    else if (!state.previousFocus) state.previousFocus = document.activeElement;
    state.loadToken += 1;
    var token = state.loadToken;
    var modal = byId("cadPreviewModal");
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    updatePreviewMetadata(model);
    byId("cadViewerStatus").textContent = "正在解析 STEP";
    byId("cadViewerStatus").classList.remove("is-fallback");
    byId("cadViewerSourceBadge").innerHTML = '<span class="material-symbols-outlined">progress_activity</span> STEP PARSING';
    setLoading(true, "准备工程预览", "正在初始化 STEP 解析器…");
    ensureViewer();
    clearCurrentModel();
    resetViewerTools();
    await nextFrame();

    try {
      if (window.location.protocol === "file:") {
        throw new Error("LOCAL_FILE_PROTOCOL");
      }
      setLoading(true, "读取 STEP 工程文件", formatFileSize(model.fileSize) + " · 与下载文件为同一数据源");
      var occtTask = getOcct();
      var response = await fetch(new URL(model.step, document.baseURI).href);
      if (!response.ok) throw new Error("STEP_HTTP_" + response.status);
      var buffer = await response.arrayBuffer();
      var occt = await occtTask;
      if (token !== state.loadToken) return;
      setLoading(true, "解析 B-Rep 与三角网格", "OpenCascade 正在转换曲面、实体与装配层级…");
      await nextFrame();
      var result = occt.ReadStepFile(new Uint8Array(buffer), {
        linearUnit: "millimeter",
        linearDeflectionType: "bounding_box_ratio",
        linearDeflection: 0.001,
        angularDeflection: 0.35
      });
      if (!result || !result.success || !result.meshes || !result.meshes.length) {
        throw new Error("STEP_PARSE_FAILED");
      }
      if (token !== state.loadToken) return;
      var built = buildStepGroup(result);
      normalizeCadOrientation(built.group, model);
      attachModel(built.group, {
        source: "step",
        parts: built.parts,
        vertices: built.vertices,
        triangles: built.triangles
      });
    } catch (error) {
      if (token !== state.loadToken) return;
      console.warn("真实 STEP 预览加载失败，使用参数化降级模型：", error);
      var fallback = buildFallbackModel(model);
      attachModel(fallback, {
        source: "fallback",
        parts: fallback.children.length,
        vertices: 0,
        triangles: 0
      });
      var message = error && error.message === "LOCAL_FILE_PROTOCOL"
        ? "浏览器直接打开本地 HTML 时不能读取 STEP 文件；请通过本地服务器访问。当前显示增强尺寸示意模型。"
        : "真实 STEP 文件暂未加载成功，当前显示基于目录尺寸与封装类型生成的增强示意模型。";
      showToast(message, "info");
    } finally {
      if (token === state.loadToken) setLoading(false);
    }
  }

  function closePreview() {
    state.loadToken += 1;
    byId("cadPreviewModal").hidden = true;
    document.body.style.overflow = "";
    state.autoRotate = false;
    if (state.controls) state.controls.autoRotate = false;
    if (state.previousFocus && state.previousFocus.focus) state.previousFocus.focus();
    state.currentProduct = null;
    state.previewModels = [];
    state.previousFocus = null;
  }

  function updatePreviewMetadata(model) {
    var product = state.currentProduct;
    var previewModels = state.previewModels.length ? state.previewModels : [model];
    var multiple = previewModels.length > 1;
    byId("cadModalTitle").textContent = product ? product.itemNo + " 3D-CAD" : model.nominal + " STEP 模型";
    byId("cadModalSubtitle").textContent = product
      ? (product.series || "系列待补") + " 系列 · " + (product.category || model.category) + " · " + model.fileName
      : model.category + " · " + model.package + " · " + model.fileName;
    byId("cadMetaNominal").textContent = product ? productDimensionText(product) : model.nominal;
    byId("cadMetaCategory").textContent = product ? (product.category || model.category) : model.category;
    byId("cadMetaPackage").textContent = product ? (product.package || model.package) : model.package;
    byId("cadMetaSubtype").textContent = model.subtype || "标准结构";
    byId("cadMetaPublished").textContent = model.nominal + " · " + model.fileName;
    byId("cadMetaPitch").textContent = model.pitches && model.pitches.length ? model.pitches.join(" / ") + " mm" : "资料待补";
    byId("cadMetaSeries").textContent = product
      ? (product.series || "系列待补")
      : (model.series && model.series.length ? model.series.join("、") : "暂无匹配系列");
    byId("cadMetaItems").textContent = product
      ? product.itemNo
      : (model.itemNos && model.itemNos.length ? model.itemNos.length + " 个可能适用料号" : "暂无匹配料号");
    byId("cadMetaElectrical").textContent = product ? productElectricalText(product) : "选择具体料号后显示";
    byId("cadMetaMapping").textContent = product
      ? (multiple ? multiple + " 份可选 CAD" : "已关联 CAD")
      : (model.productCandidateCount
        ? model.productCandidateCount + " 个可能适用料号" + (model.productAmbiguousCount ? " · 其中 " + model.productAmbiguousCount + " 个还匹配到其他 CAD" : "")
        : "暂无匹配产品");
    byId("cadMetaFile").textContent = formatFileSize(model.fileSize);
    byId("cadMetaUpdated").textContent = model.modified ? String(model.modified).slice(0, 10) : "日期待补";
    byId("cadMetaSource").textContent = model.step;
    var terminalNote = byId("cadTerminalNote");
    var isBaseboardModel = ["snapin", "t"].indexOf(model.packageKey) !== -1;
    terminalNote.hidden = !isBaseboardModel;
    if (isBaseboardModel) {
      terminalNote.textContent = model.id === "cad-41a3cc4860"
        ? "源文件提示：该 STEP 只包含壳体与封口几何，没有可见端子实体；网页不会自行补画。"
        : "显示方向：端子已统一朝上，且保留源 STEP 中各零件的相对角度；可切换“顶视”核对端子结构。";
    }
    byId("cadMetaParts").textContent = model.cadParts != null ? model.cadParts + " 个" : "—";
    byId("cadMetaTriangles").textContent = model.cadTriangles != null ? Number(model.cadTriangles).toLocaleString("zh-CN") + " 面" : "—";
    ["cadEnvelopeX", "cadEnvelopeY", "cadEnvelopeZ"].forEach(function (id, index) {
      byId(id).textContent = model.cadEnvelope && model.cadEnvelope.length === 3 ? formatNumber(model.cadEnvelope[index]) : "—";
    });
    var link = byId("cadModalDownload");
    link.href = model.step;
    link.download = model.fileName;
    var productLink = byId("cadModalProductLink");
    productLink.hidden = !product;
    productLink.href = product ? "product-detail.html?pn=" + encodeURIComponent(product.itemNo) : "product-center.html";
    updateModelChoice(model, previewModels);
  }

  function updateModelChoice(model, models) {
    var wrap = byId("cadModelChoiceWrap");
    var select = byId("cadModelChoice");
    wrap.hidden = models.length < 2;
    if (models.length < 2) {
      select.innerHTML = "";
      return;
    }
    select.innerHTML = models.map(function (candidate, index) {
      return '<option value="' + escapeHtml(candidate.id) + '"' + (candidate.id === model.id ? " selected" : "") + '>' +
        escapeHtml("CAD " + (index + 1) + " · " + candidate.nominal + " · " + candidate.package + " · " + candidate.fileName) + '</option>';
    }).join("");
  }

  function setLoading(visible, title, detail) {
    var loading = byId("cadViewerLoading");
    loading.hidden = !visible;
    if (title) byId("cadLoadingTitle").textContent = title;
    if (detail) byId("cadLoadingDetail").textContent = detail;
  }

  function nextFrame() {
    return new Promise(function (resolve) { requestAnimationFrame(resolve); });
  }

  function getOcct() {
    if (state.occtPromise) return state.occtPromise;
    if (typeof window.occtimportjs !== "function") {
      return Promise.reject(new Error("OCCT_SCRIPT_UNAVAILABLE"));
    }
    state.occtPromise = window.occtimportjs({
      locateFile: function (path) { return OCCT_DIST + path; }
    }).catch(function (error) {
      state.occtPromise = null;
      throw error;
    });
    return state.occtPromise;
  }

  function createCadMaterial(colorValue) {
    var color = colorValue instanceof THREE.Color ? colorValue.clone() : new THREE.Color(colorValue || 0x7890a8);
    if (color.r + color.g + color.b < 0.16) color.offsetHSL(0, 0, 0.075);
    var material = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.22,
      roughness: 0.46,
      side: THREE.DoubleSide
    });
    material.userData.baseOpacity = 1;
    return material;
  }

  function meshColor(meshData, face) {
    var color = face && face.color ? face.color : meshData.color;
    return color ? new THREE.Color(color[0], color[1], color[2]) : new THREE.Color(0x8098ae);
  }

  function colorKey(color) {
    return [color.r, color.g, color.b].map(function (value) { return Math.round(value * 255); }).join("-");
  }

  function buildStepGroup(result) {
    var group = new THREE.Group();
    group.name = "STEP model";
    var vertices = 0;
    var triangles = 0;

    result.meshes.forEach(function (meshData, index) {
      var geometry = new THREE.BufferGeometry();
      var positions = meshData.attributes.position.array;
      var indices = Uint32Array.from(meshData.index.array);
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      if (meshData.attributes.normal) {
        geometry.setAttribute("normal", new THREE.Float32BufferAttribute(meshData.attributes.normal.array, 3));
      } else {
        geometry.computeVertexNormals();
      }
      geometry.setIndex(new THREE.BufferAttribute(indices, 1));
      geometry.name = meshData.name || "Part " + (index + 1);
      vertices += positions.length / 3;
      triangles += indices.length / 3;

      var materials = [];
      var materialMap = {};
      function materialIndexFor(color) {
        var key = colorKey(color);
        if (materialMap[key] != null) return materialMap[key];
        materialMap[key] = materials.length;
        materials.push(createCadMaterial(color));
        return materialMap[key];
      }

      var defaultIndex = materialIndexFor(meshColor(meshData));
      var triangleCount = indices.length / 3;
      var cursor = 0;
      var faces = (meshData.brep_faces || []).slice().sort(function (a, b) { return a.first - b.first; });
      faces.forEach(function (face) {
        if (face.first > cursor) geometry.addGroup(cursor * 3, (face.first - cursor) * 3, defaultIndex);
        var last = Math.min(face.last + 1, triangleCount);
        geometry.addGroup(face.first * 3, Math.max(0, last - face.first) * 3, materialIndexFor(meshColor(meshData, face)));
        cursor = Math.max(cursor, last);
      });
      if (cursor < triangleCount) geometry.addGroup(cursor * 3, (triangleCount - cursor) * 3, defaultIndex);

      var mesh = new THREE.Mesh(geometry, materials.length === 1 ? materials[0] : materials);
      mesh.name = geometry.name;
      mesh.userData.cadMesh = true;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);

      var edgeGeometry = new THREE.EdgesGeometry(geometry, 34);
      var edgeMaterial = new THREE.LineBasicMaterial({ color: 0x80b3dc, transparent: true, opacity: 0.46, depthTest: true });
      var edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
      edges.name = mesh.name + " edges";
      edges.userData.cadEdge = true;
      edges.renderOrder = 2;
      group.add(edges);
    });
    return { group: group, parts: result.meshes.length, vertices: vertices, triangles: triangles };
  }

  function normalizeCadOrientation(group, model) {
    var uprightPackages = ["radial", "smd", "snapin", "screw", "t", "stacked"];
    if (!model || uprightPackages.indexOf(model.packageKey) === -1) return;

    group.updateMatrixWorld(true);
    var size = new THREE.Box3().setFromObject(group).getSize(new THREE.Vector3());
    var axes = [size.x, size.y, size.z];
    var diameter = Number(model.diameter) || 0;
    var length = Number(model.length) || 0;
    var axialIndex = model.packageKey === "smd" ? 0 : (model.packageKey === "stacked" ? 1 : 2);

    if (length > 0 && model.packageKey !== "smd" && model.packageKey !== "stacked") {
      axialIndex = [2, 1, 0].reduce(function (best, index) {
        return Math.abs(axes[index] - length) < Math.abs(axes[best] - length) ? index : best;
      }, 2);
      var largestIndex = axes.indexOf(Math.max.apply(null, axes));
      var radialAxes = axes.filter(function (_, index) { return index !== largestIndex; });
      var hasLongLeadEnvelope = model.packageKey === "radial" && diameter > 0 && axes[largestIndex] > length * 1.35 &&
        radialAxes.every(function (value) { return Math.abs(value - diameter) <= Math.max(diameter * 0.35, 1.5); });
      if (hasLongLeadEnvelope) axialIndex = largestIndex;
    }

    // The radial library places leads on the negative axial end; the other libraries
    // place terminals or the component body above its base on the positive axial end.
    var positiveAxialSideFacesUp = model.packageKey !== "radial";
    if (axialIndex === 0) group.rotation.y = positiveAxialSideFacesUp ? -Math.PI / 2 : Math.PI / 2;
    if (axialIndex === 1) group.rotation.x = positiveAxialSideFacesUp ? Math.PI / 2 : -Math.PI / 2;
    group.userData.orientationNormalized = axialIndex !== 2;
    group.userData.originalAxialAxis = ["X", "Y", "Z"][axialIndex];
    group.updateMatrixWorld(true);
  }

  function buildFallbackModel(model) {
    var group = new THREE.Group();
    group.name = "Parametric fallback";
    var diameter = Math.max(Number(model.diameter) || 6.3, 2);
    var total = Math.max(Number(model.length) || 8, 3);
    var radius = diameter / 2;
    var isSmd = model.packageKey === "smd";
    var isStacked = model.packageKey === "stacked";
    var isLargeTerminal = ["snapin", "screw", "t"].indexOf(model.packageKey) !== -1;
    var baseHeight = isSmd ? Math.min(0.65, total * 0.12) : Math.min(0.42, total * 0.08);
    var bodyHeight = Math.max(total - baseHeight, total * 0.72);
    var bodyBottom = isSmd ? baseHeight : 0;
    var navy = new THREE.MeshPhysicalMaterial({ color: 0x183b65, roughness: 0.34, metalness: 0.08, clearcoat: 0.45, clearcoatRoughness: 0.45 });
    var aluminum = new THREE.MeshStandardMaterial({ color: 0xc6d0d8, roughness: 0.28, metalness: 0.86 });
    var rubber = new THREE.MeshStandardMaterial({ color: 0x202b38, roughness: 0.84, metalness: 0.02 });
    var stripe = new THREE.MeshStandardMaterial({ color: 0xdce6eb, roughness: 0.62, metalness: 0.06 });
    var terminal = new THREE.MeshStandardMaterial({ color: 0xb9c4cd, roughness: 0.24, metalness: 0.92 });
    [navy, aluminum, rubber, stripe, terminal].forEach(function (material) { material.userData.baseOpacity = 1; });

    function addCylinder(radTop, radBottom, height, material, z, segments) {
      var geometry = new THREE.CylinderGeometry(radTop, radBottom, height, segments || 64);
      geometry.rotateX(Math.PI / 2);
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.z = z;
      mesh.userData.cadMesh = true;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
      return mesh;
    }

    function addBox(width, depth, height, material, x, y, z) {
      var mesh = new THREE.Mesh(new THREE.BoxGeometry(width, depth, height), material);
      mesh.position.set(x || 0, y || 0, z || 0);
      mesh.userData.cadMesh = true;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
      return mesh;
    }

    if (isStacked) {
      var stackWidth = Math.max(Number(model.width) || diameter, 2);
      var stackDepth = Math.max(Number(model.depth) || stackWidth * 0.72, 2);
      var stackHeight = Math.max(Number(model.height) || total, 0.8);
      addBox(stackWidth * 0.9, stackDepth, stackHeight * 0.86, navy, 0, 0, stackHeight * 0.52);
      addBox(stackWidth, stackDepth * 0.92, stackHeight * 0.12, aluminum, 0, 0, stackHeight * 0.97);
      [-1, 1].forEach(function (side) {
        addBox(stackWidth * 0.22, stackDepth * 1.04, Math.max(0.12, stackHeight * 0.1), terminal, side * stackWidth * 0.42, 0, stackHeight * 0.06);
      });
      addBox(stackWidth * 0.08, stackDepth * 0.025, stackHeight * 0.56, stripe, stackWidth * 0.46, stackDepth * 0.51, stackHeight * 0.5);
      return group;
    }

    if (isSmd) {
      var cut = diameter * 0.11;
      var half = diameter * 0.55;
      var shape = new THREE.Shape();
      shape.moveTo(-half + cut, -half);
      shape.lineTo(half - cut, -half); shape.lineTo(half, -half + cut);
      shape.lineTo(half, half - cut); shape.lineTo(half - cut, half);
      shape.lineTo(-half + cut, half); shape.lineTo(-half, half - cut);
      shape.lineTo(-half, -half + cut); shape.closePath();
      var baseGeometry = new THREE.ExtrudeGeometry(shape, { depth: baseHeight, bevelEnabled: true, bevelSize: Math.min(0.08, diameter * 0.012), bevelThickness: 0.04, bevelSegments: 2 });
      var base = new THREE.Mesh(baseGeometry, rubber);
      base.userData.cadMesh = true;
      base.castShadow = true;
      group.add(base);
      [-1, 1].forEach(function (side) {
        var pad = new THREE.Mesh(new THREE.BoxGeometry(diameter * 0.32, diameter * 0.72, baseHeight * 0.42), terminal);
        pad.position.set(side * diameter * 0.48, 0, baseHeight * 0.18);
        pad.userData.cadMesh = true;
        group.add(pad);
      });
    } else if (!isLargeTerminal) {
      addCylinder(radius * 0.91, radius * 0.91, baseHeight, rubber, baseHeight / 2, 64);
      var leadLength = Math.max(total * 0.36, 4);
      var pitch = model.pitches && model.pitches.length ? model.pitches[0] : Math.min(diameter * 0.45, 5);
      [-1, 1].forEach(function (side) {
        var lead = addCylinder(Math.min(0.28, diameter * 0.045), Math.min(0.28, diameter * 0.045), leadLength, terminal, -leadLength / 2, 14);
        lead.position.x = side * pitch / 2;
      });
    } else {
      addCylinder(radius * 0.93, radius * 0.93, Math.max(baseHeight, total * 0.025), rubber, baseHeight / 2, 72);
      var terminalSpacing = Math.min(diameter * 0.42, 28);
      if (model.packageKey === "screw") {
        [-1, 1].forEach(function (side) {
          var post = addCylinder(Math.max(1.2, diameter * 0.065), Math.max(1.2, diameter * 0.065), Math.max(2.2, total * 0.045), terminal, -Math.max(1.1, total * 0.0225), 24);
          post.position.x = side * terminalSpacing / 2;
        });
      } else {
        var terminalCount = model.packageKey === "snapin" ? 3 : 2;
        for (var terminalIndex = 0; terminalIndex < terminalCount; terminalIndex += 1) {
          var angle = terminalCount === 2 ? terminalIndex * Math.PI : terminalIndex * Math.PI * 2 / terminalCount;
          var tab = addBox(Math.max(0.8, diameter * 0.035), Math.max(1.8, diameter * 0.085), Math.max(3, total * 0.08), terminal,
            Math.cos(angle) * terminalSpacing * 0.46, Math.sin(angle) * terminalSpacing * 0.46, -Math.max(1.5, total * 0.04));
          tab.rotation.z = angle;
        }
      }
    }

    addCylinder(radius, radius * 0.985, bodyHeight, navy, bodyBottom + bodyHeight / 2, 72);
    addCylinder(radius * 0.925, radius * 0.925, Math.min(0.28, total * 0.04), aluminum, bodyBottom + bodyHeight + 0.03, 72);
    var ring = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.965, Math.max(0.045, diameter * 0.013), 10, 72), aluminum);
    ring.position.z = bodyBottom + bodyHeight - Math.min(0.35, total * 0.06);
    ring.userData.cadMesh = true;
    group.add(ring);

    var stripeHeight = bodyHeight * 0.72;
    var polarity = new THREE.Mesh(new THREE.BoxGeometry(Math.max(0.34, diameter * 0.085), Math.max(0.04, diameter * 0.012), stripeHeight), stripe);
    polarity.position.set(radius + diameter * 0.006, 0, bodyBottom + bodyHeight * 0.54);
    polarity.userData.cadMesh = true;
    group.add(polarity);

    var topZ = bodyBottom + bodyHeight + 0.19;
    [0, Math.PI / 2].forEach(function (rotation) {
      var vent = new THREE.Mesh(new THREE.BoxGeometry(radius * 0.95, Math.max(0.045, diameter * 0.012), Math.max(0.025, diameter * 0.006)), rubber);
      vent.position.z = topZ;
      vent.rotation.z = rotation;
      vent.userData.cadMesh = true;
      group.add(vent);
    });

    group.traverse(function (child) {
      if (child.isMesh && !child.userData.cadMesh) child.userData.cadMesh = true;
    });
    if (!isSmd && !isStacked) group.rotation.x = Math.PI;
    return group;
  }

  function clearCurrentModel() {
    if (state.modelGroup) {
      state.scene.remove(state.modelGroup);
      disposeObject(state.modelGroup);
      state.modelGroup = null;
    }
    ["grid", "axes", "boundsHelper"].forEach(function (key) {
      if (!state[key]) return;
      state.scene.remove(state[key]);
      disposeObject(state[key]);
      state[key] = null;
    });
    state.modelBox = null;
  }

  function disposeObject(object) {
    object.traverse(function (child) {
      if (child.geometry && child.geometry.dispose) child.geometry.dispose();
      if (child.material) {
        var materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach(function (material) { if (material && material.dispose) material.dispose(); });
      }
    });
  }

  function attachModel(group, info) {
    state.modelGroup = group;
    state.scene.add(group);
    var initialBox = new THREE.Box3().setFromObject(group);
    var center = initialBox.getCenter(new THREE.Vector3());
    group.position.sub(center);
    group.updateMatrixWorld(true);
    state.modelBox = new THREE.Box3().setFromObject(group);
    var size = state.modelBox.getSize(new THREE.Vector3());
    var maxSize = Math.max(size.x, size.y, size.z, 1);

    var gridSize = niceGridSize(maxSize * 3.2);
    state.grid = new THREE.GridHelper(gridSize, 20, 0x385b7b, 0x1b334b);
    state.grid.rotation.x = Math.PI / 2;
    state.grid.position.z = state.modelBox.min.z - maxSize * 0.065;
    state.grid.material.transparent = true;
    state.grid.material.opacity = 0.62;
    state.scene.add(state.grid);

    state.axes = new THREE.AxesHelper(maxSize * 0.42);
    state.axes.position.set(state.modelBox.min.x - maxSize * 0.13, state.modelBox.min.y - maxSize * 0.13, state.grid.position.z);
    state.scene.add(state.axes);

    state.boundsHelper = new THREE.Box3Helper(state.modelBox, 0xf0a45b);
    state.boundsHelper.visible = state.boundsVisible;
    state.scene.add(state.boundsHelper);

    byId("cadEnvelopeX").textContent = formatNumber(size.x);
    byId("cadEnvelopeY").textContent = formatNumber(size.y);
    byId("cadEnvelopeZ").textContent = formatNumber(size.z);
    byId("cadMetaParts").textContent = info.parts + " 个";
    byId("cadMetaTriangles").textContent = info.source === "step" ? Number(info.triangles).toLocaleString("zh-CN") + " 面" : "示意几何";
    var status = byId("cadViewerStatus");
    if (info.source === "step") {
      status.textContent = "真实 STEP · 已解析";
      status.classList.remove("is-fallback");
      byId("cadViewerSourceBadge").innerHTML = '<span class="material-symbols-outlined">verified</span> REAL STEP · 正投影';
    } else {
      status.textContent = "增强示意 · 降级模式";
      status.classList.add("is-fallback");
      byId("cadViewerSourceBadge").innerHTML = '<span class="material-symbols-outlined">deployed_code</span> PARAMETRIC FALLBACK';
    }
    applyDisplayMode();
    setView("iso");
  }

  function niceGridSize(value) {
    var exponent = Math.pow(10, Math.floor(Math.log10(value)));
    var normalized = value / exponent;
    var nice = normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
    return nice * exponent;
  }

  function resetViewerTools() {
    state.autoRotate = false;
    state.edgesVisible = true;
    state.boundsVisible = false;
    state.displayModeIndex = 1;
    if (state.controls) state.controls.autoRotate = false;
    byId("cadAutoRotate").classList.remove("is-active");
    byId("cadEdges").classList.add("is-active");
    byId("cadBounds").classList.remove("is-active");
    updateDisplayModeButton();
  }

  function setView(view) {
    if (!state.modelBox || !state.camera || !state.controls) return;
    var size = state.modelBox.getSize(new THREE.Vector3());
    var maxSize = Math.max(size.x, size.y, size.z, 1);
    var distance = maxSize * 3.2;
    var directions = {
      iso: new THREE.Vector3(1.25, -1.45, 1.05),
      front: new THREE.Vector3(0, -1, 0),
      right: new THREE.Vector3(1, 0, 0),
      top: new THREE.Vector3(0, 0, 1),
      bottom: new THREE.Vector3(0, 0, -1)
    };
    var direction = (directions[view] || directions.iso).normalize();
    state.currentView = view;
    state.camera.up.set(0, view === "top" || view === "bottom" ? 1 : 0, view === "top" || view === "bottom" ? 0 : 1);
    state.camera.position.copy(direction.multiplyScalar(distance));
    state.camera.near = Math.max(maxSize / 1000, 0.001);
    state.camera.far = Math.max(maxSize * 100, 100);
    updateOrthographicFrustum(maxSize);
    state.controls.target.set(0, 0, 0);
    state.controls.minDistance = maxSize * 0.3;
    state.controls.maxDistance = maxSize * 15;
    state.controls.minZoom = 0.35;
    state.controls.maxZoom = 16;
    state.controls.update();
    document.querySelectorAll("[data-cad-view]").forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-cad-view") === view);
    });
  }

  function toggleAutoRotate() {
    state.autoRotate = !state.autoRotate;
    if (state.controls) state.controls.autoRotate = state.autoRotate;
    byId("cadAutoRotate").classList.toggle("is-active", state.autoRotate);
  }

  function toggleEdges() {
    state.edgesVisible = !state.edgesVisible;
    if (state.modelGroup) {
      state.modelGroup.traverse(function (child) {
        if (child.userData.cadEdge) child.visible = state.edgesVisible;
      });
    }
    byId("cadEdges").classList.toggle("is-active", state.edgesVisible);
  }

  function toggleBounds() {
    state.boundsVisible = !state.boundsVisible;
    if (state.boundsHelper) state.boundsHelper.visible = state.boundsVisible;
    byId("cadBounds").classList.toggle("is-active", state.boundsVisible);
  }

  function cycleDisplayMode() {
    state.displayModeIndex = (state.displayModeIndex + 1) % displayModes.length;
    applyDisplayMode();
    updateDisplayModeButton();
  }

  function updateDisplayModeButton() {
    var labels = { solid: "实体", xray: "X 光", wireframe: "线框" };
    byId("cadDisplayModeLabel").textContent = labels[displayModes[state.displayModeIndex]];
  }

  function applyDisplayMode() {
    if (!state.modelGroup) return;
    var mode = displayModes[state.displayModeIndex];
    state.modelGroup.traverse(function (child) {
      if (!child.userData.cadMesh || !child.material) return;
      var materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach(function (material) {
        material.wireframe = mode === "wireframe";
        material.transparent = mode === "xray";
        material.opacity = mode === "xray" ? 0.24 : 1;
        material.depthWrite = mode !== "xray";
        material.needsUpdate = true;
      });
    });
  }

  function showToast(message, icon) {
    var toast = byId("cadToast");
    byId("cadToastIcon").textContent = icon || "info";
    byId("cadToastText").textContent = message;
    toast.hidden = false;
    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(function () { toast.hidden = true; }, 5600);
  }

  function debounce(fn, delay) {
    var timer;
    return function () {
      var args = arguments;
      var context = this;
      window.clearTimeout(timer);
      timer = window.setTimeout(function () { fn.apply(context, args); }, delay);
    };
  }

  document.addEventListener("DOMContentLoaded", init);
})();
