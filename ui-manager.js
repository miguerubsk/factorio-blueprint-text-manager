import { decompressBlueprintString, compressBlueprintJson } from './blueprint-processor.js';

// --- Estado Global (Exportable para otros módulos) ---
export let blueprintRootJson = null;
export let globalReferenceMap = {};
export let globalIdCounter = 0;
export let currentLanguage = "es";
export let currentCatalogTab = "logistics";
export let lastFocusedInput = null;

// --- Configuración y Dictionaries ---
const dictionaries = {
  es: typeof locale_es !== 'undefined' ? locale_es : {},
  en: typeof locale_en !== 'undefined' ? locale_en : {},
};

// --- Funciones UI Base ---
export function translate(key, replacements = {}) {
  let text =
    dictionaries[currentLanguage] && dictionaries[currentLanguage][key]
      ? dictionaries[currentLanguage][key]
      : key;
  for (let k in replacements) {
    text = text.replace(`{${k}}`, replacements[k]);
  }
  return text;
}

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export function translateStaticUi() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.innerText = translate(key);
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const key = el.getAttribute("data-i18n-ph");
    el.placeholder = translate(key);
  });

  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    el.title = translate(key);
  });

  if (translate("ui_page_title")) {
    document.title = translate("ui_page_title");
  }

  const badgeImg = document.getElementById("globalVisitorBadge");
  if (badgeImg) {
    const textLeft = (translate("lbl_visits") || "VISITS") + "%20";
    const pageId = "miguerubsk.factorio-blueprint-text-manager";
    const colorLeft = "%23141313";
    const colorRight = "%23ff9f1c";
    badgeImg.src = `https://visitor-badge.laobi.icu/badge?page_id=${pageId}&left_text=${textLeft}&left_color=${colorLeft}&right_color=${colorRight}&radius=0&height=20`;
  }
}

// --- Funciones de Lógica de UI ---
export function setBlueprintRootJson(value) { blueprintRootJson = value; }
export function setGlobalReferenceMap(value) { globalReferenceMap = value; }
export function setGlobalIdCounter(value) { globalIdCounter = value; }
export function setCurrentLanguage(value) { currentLanguage = value; }
export function setCurrentCatalogTab(value) { currentCatalogTab = value; }
export function setLastFocusedInput(value) { lastFocusedInput = value; }

export function registerTextReference(type, objectRef, key) {
  globalIdCounter++;

  let shortType = "bp";
  if (type === "BOOK") shortType = "bk";
  if (type === "PARAMETRO") shortType = "pm";
  if (type === "ENTIDAD") shortType = "et";

  let shortKey = "l";
  if (key === "description") shortKey = "d";
  if (key === "name") shortKey = "n";
  if (key === "alert_message" || key === "circuit_alert_message")
    shortKey = "a";
  if (key === "station_name") shortKey = "s";

  const uniqueId = `[${shortType}-${globalIdCounter}-${shortKey}]`;
  globalReferenceMap[uniqueId] = {
    targetObject: objectRef,
    targetProperty: key,
  };
  return uniqueId;
}

export function generateMassiveTextList() {
  let lines = [];
  lines.push(
    "# ==========================================================================",
  );
  lines.push(
    `#  BATCH EDITING MODE - TEXTS EXTRACTED SUCCESSFULLY [LANG: ${currentLanguage.toUpperCase()}]`,
  );
  lines.push(
    "# ==========================================================================\n",
  );

  for (let uniqueId in globalReferenceMap) {
    const reference = globalReferenceMap[uniqueId];
    let cleanedValue = (
      reference.targetObject[reference.targetProperty] || ""
    ).replace(/\n/g, "\\n");
    lines.push(`${uniqueId} = ${cleanedValue}`);
  }
  document.getElementById("batchTextarea").value = lines.join("\n");
}

export function synchronizeTreeToBatchField() {
  generateMassiveTextList();
}
