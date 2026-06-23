import * as Processor from "./blueprint-processor.js";
import * as UI from "./ui-manager.js";

window.dictionaries = {
  es: typeof locale_es !== "undefined" ? locale_es : {},
  en: typeof locale_en !== "undefined" ? locale_en : {},
};

window.processBlueprintString = async () => {
  const input = document.getElementById("inputString").value.trim();
  const MAX_CHARS = 20000000;

  if (!input.startsWith("0")) return alert(UI.translate("err_invalid_string"));
  if (input.length > MAX_CHARS) {
    return alert(`Blueprint string exceeds maximum length (${input.length.toLocaleString()} / ${MAX_CHARS.toLocaleString()} characters)`);
  }

  try {
    const json = await Processor.decompressBlueprintString(input.substring(1));
    UI.setBlueprintRootJson(json);
    UI.setGlobalReferenceMap({});
    UI.setGlobalIdCounter(0);
    UI.renderFailsafeTreeAndMapping(json);
  } catch (error) {
    alert(UI.translate("err_scan", { message: error.message }));
  }
};

window.exportRawJsonFile = () => {
  if (!UI.blueprintRootJson) return alert(UI.translate("err_no_data"));
  const blob = new Blob([JSON.stringify(UI.blueprintRootJson, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "factorio_blueprint.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

window.changeLanguage = (newLang) => {
  if (!window.dictionaries[newLang]) return;
  UI.setCurrentLanguage(newLang);
  localStorage.setItem("fbp_lang", newLang);
  UI.translateStaticUi();
  if (UI.blueprintRootJson) {
    UI.renderFailsafeTreeAndMapping(UI.blueprintRootJson);
  }
};

window.applyBatchChanges = () => {
  const batchRawText = document.getElementById("batchTextarea").value;
  const lines = batchRawText.split(/\r?\n/);
  let processedCount = 0;

  lines.forEach((line) => {
    line = line.trim();
    if (!line || line.startsWith("#")) return;

    const equalIndex = line.indexOf("=");
    if (equalIndex === -1) return;

    let uniqueId = line.substring(0, equalIndex).trim();
    let importedValue = line.substring(equalIndex + 1).trim();

    uniqueId = uniqueId.toLowerCase().replace(/\s+/g, "");
    importedValue = importedValue.replace(/\\n/g, "\n");

    if (UI.globalReferenceMap[uniqueId]) {
      const reference = UI.globalReferenceMap[uniqueId];
      reference.targetObject[reference.targetProperty] = importedValue;

      const inlineInput = document.getElementById(`tree-${uniqueId}`);
      if (inlineInput) inlineInput.value = importedValue;
      processedCount++;
    }
  });
  alert(UI.translate("msg_sincronizado", { count: processedCount }));
};

window.generateAndCopyString = async () => {
  if (!UI.blueprintRootJson) return alert(UI.translate("err_no_data"));
  const btn = document.getElementById("btnGenCopy");

  try {
    const generatedString = await Processor.compressBlueprintJson(
      UI.blueprintRootJson,
    );
    document.getElementById("outputString").value = generatedString;

    await navigator.clipboard.writeText(generatedString);

    btn.innerText = UI.translate("msg_copied");
    btn.style.filter = "hue-rotate(90deg)";

    setTimeout(() => {
      btn.innerText = UI.translate("btn_generate_copy");
      btn.style.filter = "none";
    }, 2000);
  } catch (e) {
    alert(UI.translate("err_generate", { message: e.message }));
  }
};

window.switchCatalogTab = (tabId, clickEvent) => {
  UI.setCurrentCatalogTab(tabId);
  document
    .querySelectorAll(".catalog-tab-link")
    .forEach((btn) => btn.classList.remove("active"));

  if (clickEvent && clickEvent.currentTarget) {
    clickEvent.currentTarget.classList.add("active");
  }
  document.getElementById("catalogSearch").value = "";
  UI.renderCatalogCategory(tabId);
};

window.filterCatalog = () => {
  const text = document.getElementById("catalogSearch").value;
  UI.renderCatalogCategory(UI.currentCatalogTab, text);
};

window.addEventListener("DOMContentLoaded", () => {
  const savedLang =
    localStorage.getItem("fbp_lang") ||
    (navigator.language.startsWith("es") ? "es" : "en");
  document.getElementById("langSelect").value = savedLang;
  window.changeLanguage(savedLang);

  const btnOpen = document.getElementById("btnOpenCatalog");
  const btnClose = document.getElementById("btnCloseCatalog");
  const catalog = document.getElementById("factorioCatalog");
  const hintBubble = document.getElementById("catalogHintBubble");

  const dismissHint = () => {
    hintBubble.hidden = true;
    localStorage.setItem("fbp_seen_catalog_hint", "1");
  };

  if (!localStorage.getItem("fbp_seen_catalog_hint")) {
    hintBubble.hidden = false;
    setTimeout(dismissHint, 8000);
  }

  btnOpen.addEventListener("click", () => {
    dismissHint();
    if (!catalog.classList.contains("active")) {
      UI.renderCatalogCategory(UI.currentCatalogTab);
    }
    catalog.classList.toggle("active");
  });
  btnClose.addEventListener("click", () => catalog.classList.remove("active"));

  document.addEventListener("click", (e) => {
    if (
      catalog.classList.contains("active") &&
      !catalog.contains(e.target) &&
      !btnOpen.contains(e.target)
    ) {
      catalog.classList.remove("active");
    }
  });

  const btnOpenHelp = document.getElementById("btnOpenHelp");
  const btnCloseHelp = document.getElementById("btnCloseHelp");
  const helpModal = document.getElementById("helpModal");

  const openHelp = () => {
    helpModal.hidden = false;
    btnCloseHelp.focus();
  };
  const closeHelp = () => {
    helpModal.hidden = true;
    btnOpenHelp.focus();
  };

  btnOpenHelp.addEventListener("click", openHelp);
  btnCloseHelp.addEventListener("click", closeHelp);
  helpModal.addEventListener("click", (e) => {
    if (e.target === helpModal) closeHelp();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!helpModal.hidden) closeHelp();
    else if (catalog.classList.contains("active")) {
      catalog.classList.remove("active");
      btnOpen.focus();
    }
  });
});
