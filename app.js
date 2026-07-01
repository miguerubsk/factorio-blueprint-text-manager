import * as Processor from "./blueprint-processor.js";
import * as UI from "./ui-manager.js";

window.dictionaries = {
  es: typeof locale_es !== "undefined" ? locale_es : {},
  en: typeof locale_en !== "undefined" ? locale_en : {},
};

window.processBlueprintString = async () => {
  const inputEl = document.getElementById("inputString");
  if (!inputEl) return;
  const input = inputEl.value.trim();
  const MAX_CHARS = 20000000;

  if (!input.startsWith("0")) return alert(UI.translate("err_invalid_string"));
  if (input.length > MAX_CHARS) {
    return alert(
      `Blueprint string exceeds maximum length (${input.length.toLocaleString()} / ${MAX_CHARS.toLocaleString()} characters)`,
    );
  }

  try {
    const json = await Processor.decompressBlueprintString(input);
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
  const batchEl = document.getElementById("batchTextarea");
  if (!batchEl) return;
  const lines = batchEl.value.split(/\r?\n/);
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
  if (!btn) return;

  try {
    const generatedString = await Processor.compressBlueprintJson(
      UI.blueprintRootJson,
    );
    const outputEl = document.getElementById("outputString");
    if (outputEl) outputEl.value = generatedString;

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
  const searchEl = document.getElementById("catalogSearch");
  if (searchEl) searchEl.value = "";
  UI.renderCatalogCategory(tabId);
};

window.filterCatalog = () => {
  const searchEl = document.getElementById("catalogSearch");
  UI.renderCatalogCategory(UI.currentCatalogTab, searchEl ? searchEl.value : "");
};

const FR_STORAGE_KEY = "fbp_saved_replacements";
const FR_MAX_SAVED = 20;

function frGetSaved() {
  try {
    const raw = localStorage.getItem(FR_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function frSetSaved(list) {
  localStorage.setItem(
    FR_STORAGE_KEY,
    JSON.stringify(list.slice(0, FR_MAX_SAVED)),
  );
}

// Construye el RegExp a partir de los campos del panel. En modo simple
// (sin "usar regex") se escapan los caracteres especiales para que el
// usuario novel pueda buscar texto literal sin sorpresas.
function frBuildRegex(searchValue, useRegex, caseInsensitive) {
  if (!searchValue) return null;
  const flags = "g" + (caseInsensitive ? "i" : "");
  if (useRegex) {
    return new RegExp(searchValue, flags);
  }
  const escaped = searchValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(escaped, flags);
}

function frCountMatches(regex) {
  if (!regex) return 0;
  let total = 0;
  for (const ref of Object.values(UI.globalReferenceMap)) {
    const text = ref.targetObject[ref.targetProperty] || "";
    const matches = text.match(regex);
    if (matches) total += matches.length;
  }
  return total;
}

function frApply(regex, replaceValue) {
  // String.replace() con un regex global reinicia lastIndex internamente,
  // así que es seguro reutilizar el mismo objeto RegExp en cada iteración
  // (a diferencia de regex.test()/exec(), que arrastrarían el lastIndex
  // de una entrada a la siguiente y se saltarían coincidencias).
  let changedRefs = 0;
  for (const uniqueId in UI.globalReferenceMap) {
    const ref = UI.globalReferenceMap[uniqueId];
    const text = ref.targetObject[ref.targetProperty] || "";
    const newText = text.replace(regex, replaceValue);
    if (newText === text) continue;
    ref.targetObject[ref.targetProperty] = newText;
    const inlineInput = document.getElementById(`tree-${uniqueId}`);
    if (inlineInput) inlineInput.value = newText;
    changedRefs++;
  }
  return changedRefs;
}

window.addEventListener("DOMContentLoaded", () => {
  const savedLang =
    localStorage.getItem("fbp_lang") ||
    (navigator.language.startsWith("es") ? "es" : "en");
  const langSelectEl = document.getElementById("langSelect");
  if (langSelectEl) langSelectEl.value = savedLang;
  window.changeLanguage(savedLang);

  // ===== HINT SYSTEM =====
  const HINT_STORAGE_PREFIX = "fbp_hint_";
  const HINT_TIMEOUT = 8000;

  const showHint = (hintId, timeout = HINT_TIMEOUT) => {
    const el = document.getElementById(hintId);
    const storageKey = HINT_STORAGE_PREFIX + hintId;
    if (!el || localStorage.getItem(storageKey)) return;
    el.hidden = false;
    if (timeout > 0) {
      setTimeout(() => dismissHint(hintId), timeout);
    }
  };

  const dismissHint = (hintId) => {
    const el = document.getElementById(hintId);
    const storageKey = HINT_STORAGE_PREFIX + hintId;
    if (el) el.hidden = true;
    localStorage.setItem(storageKey, "1");
  };

  const dismissAllHints = (...hintIds) => {
    hintIds.forEach(dismissHint);
  };

  // Show scan hint when user pastes text in input
  const inputString = document.getElementById("inputString");
  if (inputString) {
    inputString.addEventListener("input", () => {
      if (inputString.value.trim().startsWith("0")) {
        showHint("hintScan");
      }
    });
  }

  // Show batch apply hint when user edits batch textarea
  const batchTextarea = document.getElementById("batchTextarea");
  if (batchTextarea) {
    batchTextarea.addEventListener("input", () => {
      if (batchTextarea.value.trim()) {
        showHint("hintBatchApply");
      }
    });
  }

  // Dismiss scan hint and show catalog/FR hints after scanning
  const originalProcessBlueprint = window.processBlueprintString;
  window.processBlueprintString = async (...args) => {
    const prevJson = UI.blueprintRootJson;
    const result = await originalProcessBlueprint(...args);
    // Only dismiss/show hints if scan succeeded (new data loaded)
    if (UI.blueprintRootJson && UI.blueprintRootJson !== prevJson) {
      dismissHint("hintScan");
      showHint("hintCatalog");
      showHint("hintFindReplace");
    }
    return result;
  };

  // Dismiss batch apply hint when applied
  const originalApplyBatch = window.applyBatchChanges;
  window.applyBatchChanges = (...args) => {
    const result = originalApplyBatch(...args);
    dismissHint("hintBatchApply");
    return result;
  };

  // ===== CATALOG =====
  const btnOpen = document.getElementById("btnOpenCatalog");
  const btnClose = document.getElementById("btnCloseCatalog");
  const catalog = document.getElementById("factorioCatalog");
  if (!btnOpen || !btnClose || !catalog) return;

  btnOpen.addEventListener("click", () => {
    dismissHint("hintCatalog");
    const wasActive = catalog.classList.contains("active");
    if (!wasActive) {
      UI.renderCatalogCategory(UI.currentCatalogTab);
      // Show internal catalog hints on first open
      showHint("hintCatalogSearch");
      showHint("hintCatalogGrid");
    }
    catalog.classList.toggle("active");
  });
  btnClose.addEventListener("click", () => {
    catalog.classList.remove("active");
    dismissAllHints("hintCatalogSearch", "hintCatalogGrid");
  });

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

  // --- Buscar y reemplazar ---
  const btnOpenFR = document.getElementById("btnOpenFindReplace");
  const btnCloseFR = document.getElementById("btnCloseFindReplace");
  const frModal = document.getElementById("findReplaceModal");
  const frSearch = document.getElementById("frSearch");
  const frReplace = document.getElementById("frReplace");
  const frCaseInsensitive = document.getElementById("frCaseInsensitive");
  const frUseRegex = document.getElementById("frUseRegex");
  const frMatchCount = document.getElementById("frMatchCount");
  const frError = document.getElementById("frError");
  const frSavedList = document.getElementById("frSavedList");
  const btnApplyFR = document.getElementById("btnApplyFindReplace");
  const btnSaveFR = document.getElementById("btnSaveFindReplace");

  function frUpdatePreview() {
    frError.hidden = true;
    const searchValue = frSearch.value;
    if (!searchValue) {
      frMatchCount.innerText = "";
      return;
    }
    try {
      const regex = frBuildRegex(
        searchValue,
        frUseRegex.checked,
        frCaseInsensitive.checked,
      );
      const count = frCountMatches(regex);
      frMatchCount.innerText = UI.translate("fr_match_count", { count });
    } catch (e) {
      frMatchCount.innerText = "";
      frError.innerText = UI.translate("fr_invalid_regex", {
        message: e.message,
      });
      frError.hidden = false;
    }
  }

  function frRenderSavedList() {
    const saved = frGetSaved();
    frSavedList.innerHTML = "";
    saved.forEach((item, idx) => {
      const row = document.createElement("div");
      row.className = "fr-saved-item";

      const label = document.createElement("span");
      label.className = "fr-saved-item-label";
      label.title = `${item.search} -> ${item.replace}`;
      label.innerText = `${item.search} -> ${item.replace}`;
      label.addEventListener("click", () => {
        frSearch.value = item.search;
        frReplace.value = item.replace;
        frCaseInsensitive.checked = !!item.caseInsensitive;
        frUseRegex.checked = !!item.regex;
        frUpdatePreview();
      });
      row.appendChild(label);

      const btnDelete = document.createElement("button");
      btnDelete.className = "secondary";
      btnDelete.innerText = "X";
      btnDelete.setAttribute("aria-label", UI.translate("btn_fr_delete_saved"));
      btnDelete.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const list = frGetSaved();
        list.splice(idx, 1);
        frSetSaved(list);
        frRenderSavedList();
      });
      row.appendChild(btnDelete);

      frSavedList.appendChild(row);
    });
  }

  const openFR = () => {
    frModal.hidden = false;
    frRenderSavedList();
    frUpdatePreview();
    frSearch.focus();
    // Show internal FR hints on first open
    showHint("hintFrSearch");
    showHint("hintFrRegex");
    showHint("hintFrSaved");
  };
  const closeFR = () => {
    frModal.hidden = true;
    btnOpenFR.focus();
    dismissAllHints("hintFrSearch", "hintFrRegex", "hintFrSaved");
  };

  btnOpenFR.addEventListener("click", () => {
    dismissHint("hintFindReplace");
    if (frModal.hidden) openFR();
    else closeFR();
  });
  btnCloseFR.addEventListener("click", closeFR);
  frModal.addEventListener("click", (e) => {
    if (e.target === frModal) closeFR();
  });

  frSearch.addEventListener("input", UI.debounce(frUpdatePreview, 250));
  frReplace.addEventListener("input", UI.debounce(frUpdatePreview, 250));
  frCaseInsensitive.addEventListener("change", frUpdatePreview);
  frUseRegex.addEventListener("change", frUpdatePreview);

  btnApplyFR.addEventListener("click", () => {
    if (!UI.blueprintRootJson) return alert(UI.translate("err_no_data"));
    if (!frSearch.value) return;
    let regex;
    try {
      regex = frBuildRegex(
        frSearch.value,
        frUseRegex.checked,
        frCaseInsensitive.checked,
      );
    } catch (e) {
      frError.innerText = UI.translate("fr_invalid_regex", {
        message: e.message,
      });
      frError.hidden = false;
      return;
    }
    const changedRefs = frApply(regex, frReplace.value);
    UI.synchronizeTreeToBatchField();
    frUpdatePreview();
    alert(UI.translate("msg_fr_applied", { count: changedRefs }));
  });

  btnSaveFR.addEventListener("click", () => {
    if (!frSearch.value) return;
    const saved = frGetSaved();
    saved.unshift({
      search: frSearch.value,
      replace: frReplace.value,
      regex: frUseRegex.checked,
      caseInsensitive: frCaseInsensitive.checked,
    });
    frSetSaved(saved);
    frRenderSavedList();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!frModal.hidden) closeFR();
    else if (!helpModal.hidden) closeHelp();
    else if (catalog.classList.contains("active")) {
      catalog.classList.remove("active");
      btnOpen.focus();
    }
  });
});
