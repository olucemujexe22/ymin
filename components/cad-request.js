(function () {
  "use strict";

  var fieldMap = {
    item: "cadRequestItem",
    category: "cadRequestCategory",
    series: "cadRequestSeries",
    package: "cadRequestPackage",
    voltage: "cadRequestVoltage",
    capacitance: "cadRequestCapacitance",
    size: "cadRequestSize"
  };

  function byId(id) {
    return document.getElementById(id);
  }

  function setField(key, value, prefilled) {
    var input = byId(fieldMap[key]);
    if (!input || value == null || value === "") return;
    input.value = value;
    input.classList.toggle("is-prefilled", !!prefilled);
  }

  function fillFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var filledCount = 0;
    Object.keys(fieldMap).forEach(function (key) {
      var value = params.get(key);
      if (value) {
        setField(key, value, true);
        filledCount += 1;
      }
    });
    if (params.get("item")) {
      var matchStatus = byId("cadItemMatchStatus");
      matchStatus.textContent = filledCount > 1
        ? "已从产品页面带入料号和现有规格"
        : "已带入所查询的产品料号，请补充相关规格";
      matchStatus.classList.add("is-match");
    }
    if (filledCount > 1) {
      byId("cadProductPrefillNote").textContent =
        "已从产品页面自动带入现有规格；如有特殊需求，可在“补充需求”中说明。";
    }
  }

  function refreshProductMatch() {
    var itemInput = byId("cadRequestItem");
    var matchStatus = byId("cadItemMatchStatus");
    matchStatus.textContent = itemInput.value.trim()
      ? "请核对料号，并补充当前页面尚未带入的产品规格"
      : "用于确认所需模型对应的产品";
    matchStatus.classList.remove("is-match");
  }

  function validateContact() {
    var phone = byId("cadRequestPhone");
    var email = byId("cadRequestEmail");
    var valid = !!(phone.value.trim() || email.value.trim());
    phone.setCustomValidity(valid ? "" : "电话或邮箱至少填写一项");
    return valid;
  }

  function submitRequest(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var error = byId("cadRequestFormError");
    error.hidden = true;
    validateContact();
    if (!form.checkValidity()) {
      form.reportValidity();
      error.textContent = "请先补充必填信息，并填写电话或邮箱中的至少一项。";
      error.hidden = false;
      return;
    }

    var itemNo = byId("cadRequestItem").value.trim();
    var company = byId("cadRequestCompany").value.trim();
    var application = byId("cadRequestApplication").value.trim();
    byId("cadRequestSuccessText").textContent =
      "已确认 " + company + " 关于料号 " + itemNo + "（" + application + "）的 3D-CAD 申请信息。";
    form.hidden = true;
    var success = byId("cadRequestSuccess");
    success.hidden = false;
    success.focus();
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function init() {
    if (window.YMIN) {
      if (YMIN.navbar && YMIN.navbar.inject) YMIN.navbar.inject("tools");
      if (YMIN.footer && YMIN.footer.inject) YMIN.footer.inject();
    }
    fillFromUrl();
    byId("cadRequestItem").addEventListener("change", refreshProductMatch);
    byId("cadRequestPhone").addEventListener("input", validateContact);
    byId("cadRequestEmail").addEventListener("input", validateContact);
    byId("cadRequestForm").addEventListener("submit", submitRequest);
    byId("cadRequestEdit").addEventListener("click", function () {
      byId("cadRequestSuccess").hidden = true;
      byId("cadRequestForm").hidden = false;
      byId("cadRequestForm").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
