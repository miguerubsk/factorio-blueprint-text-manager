let blueprintRootJson = null;
let globalReferenceMap = {};
let globalIdCounter = 0;
let currentLanguage = "es";

const dictionaries = {
  es: locale_es,
  en: locale_en,
};

function translate(key, replacements = {}) {
  let text =
    dictionaries[currentLanguage] && dictionaries[currentLanguage][key]
      ? dictionaries[currentLanguage][key]
      : key;
  for (let k in replacements) {
    text = text.replace(`{${k}}`, replacements[k]);
  }
  return text;
}

function translateStaticUi() {
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

  if (
    document.getElementById("factorioCatalog")?.classList.contains("active")
  ) {
    renderCatalogCategory(currentCatalogTab);
  }
}

function changeLanguage(newLang) {
  if (!dictionaries[newLang]) return;
  currentLanguage = newLang;
  localStorage.setItem("fbp_lang", newLang);
  translateStaticUi();
  if (blueprintRootJson) {
    renderFailsafeTreeAndMapping(blueprintRootJson);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const savedLang =
    localStorage.getItem("fbp_lang") ||
    (navigator.language.startsWith("es") ? "es" : "en");
  document.getElementById("langSelect").value = savedLang;
  changeLanguage(savedLang);
});

async function decompressBlueprintString(base64Str) {
  const bytes = Uint8Array.from(atob(base64Str), (c) => c.charCodeAt(0));
  const stream = new Response(bytes).body.pipeThrough(
    new DecompressionStream("deflate"),
  );
  const text = await new Response(stream).text();
  return JSON.parse(text);
}

async function compressBlueprintJson(jsonObj) {
  const jsonStr = JSON.stringify(jsonObj);
  const binChunks = new TextEncoder().encode(jsonStr);
  const stream = new Blob([binChunks])
    .stream()
    .pipeThrough(new CompressionStream("deflate"));
  const buffer = await new Response(stream).arrayBuffer();

  const uint8 = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < uint8.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, uint8.subarray(i, i + chunkSize));
  }
  return "0" + btoa(binary);
}

function exportRawJsonFile() {
  if (!blueprintRootJson) return alert(translate("err_no_data"));
  const blob = new Blob([JSON.stringify(blueprintRootJson, null, 2)], {
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
}

async function processBlueprintString() {
  const input = document.getElementById("inputString").value.trim();
  if (!input.startsWith("0")) return alert(translate("err_invalid_string"));

  try {
    blueprintRootJson = await decompressBlueprintString(input.substring(1));
    globalReferenceMap = {};
    globalIdCounter = 0;
    renderFailsafeTreeAndMapping(blueprintRootJson);
  } catch (error) {
    alert(translate("err_scan", { message: error.message }));
  }
}

function registerTextReference(type, objectRef, key) {
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

function renderFailsafeTreeAndMapping(rootObj) {
  const htmlContainer = document.getElementById("treeViewContainer");
  htmlContainer.innerHTML = "";

  let stack = [{ dataNode: rootObj, visualTarget: htmlContainer }];

  while (stack.length > 0) {
    let currentElement = stack.pop();
    let activeObj = currentElement.dataNode;
    let activeVisualTarget = currentElement.visualTarget;

    if (typeof activeObj !== "object" || activeObj === null) continue;

    const isBook = activeObj.blueprint_book !== undefined;
    const isBlueprint = activeObj.blueprint !== undefined;
    const factorioNode = activeObj.blueprint || activeObj.blueprint_book;

    if (factorioNode) {
      if (factorioNode.label === undefined) factorioNode.label = "";
      if (factorioNode.description === undefined) factorioNode.description = "";

      const labelRefId = registerTextReference(
        isBook ? "BOOK" : "BLUEPRINT",
        factorioNode,
        "label",
      );
      const descRefId = registerTextReference(
        isBook ? "BOOK" : "BLUEPRINT",
        factorioNode,
        "description",
      );

      const divNode = document.createElement("div");
      divNode.className = `node-container ${isBook ? "node-book" : "node-blueprint"}`;

      const divHeader = document.createElement("div");
      divHeader.className = "node-header";

      const tagType = document.createElement("span");
      tagType.className = `node-type-tag ${isBook ? "tag-book" : "tag-blueprint"}`;
      tagType.innerText = isBook
        ? translate("tag_libro")
        : translate("tag_plano");
      divHeader.appendChild(tagType);

      const inputTitle = document.createElement("input");
      inputTitle.className = "input-inline-tree";
      inputTitle.type = "text";
      inputTitle.value = factorioNode.label;
      inputTitle.id = `tree-${labelRefId}`;
      inputTitle.placeholder = isBook
        ? `[${translate("tag_libro")} sin nombre]`
        : `[${translate("tag_plano")} sin nombre]`;
      inputTitle.oninput = function () {
        factorioNode.label = inputTitle.value;
        synchronizeTreeToBatchField();
      };
      divHeader.appendChild(inputTitle);
      divNode.appendChild(divHeader);

      const divDescSection = document.createElement("div");
      divDescSection.className = "description-section";
      const labelDesc = document.createElement("label");
      labelDesc.innerText = translate("lbl_descripcion");
      divDescSection.appendChild(labelDesc);

      const textareaDesc = document.createElement("textarea");
      textareaDesc.className = "textarea-inline-tree";
      textareaDesc.value = factorioNode.description;
      textareaDesc.id = `tree-${descRefId}`;
      textareaDesc.placeholder = "...";
      textareaDesc.oninput = function () {
        factorioNode.description = textareaDesc.value;
        synchronizeTreeToBatchField();
      };
      divDescSection.appendChild(textareaDesc);
      divNode.appendChild(divDescSection);

      const divSublist = document.createElement("div");
      divSublist.className = "sublista-items";

      let parametersRoot =
        factorioNode.parameters ||
        (factorioNode.blueprint_view_settings
          ? factorioNode.blueprint_view_settings.parameters
          : null);
      if (parametersRoot && Array.isArray(parametersRoot)) {
        parametersRoot.forEach((param, idx) => {
          const variableId =
            param.variable_id !== undefined ? param.variable_id : idx;
          if (param.name === undefined) param.name = `Parametro ${variableId}`;

          const paramRefId = registerTextReference("PARAMETRO", param, "name");
          const divParamItem = document.createElement("div");
          divParamItem.className = "sublista-item p";

          const spanLabel = document.createElement("span");
          spanLabel.className = "item-label-tree";
          spanLabel.innerText = `${translate("lbl_parametro")} P${variableId}`;
          divParamItem.appendChild(spanLabel);

          const inputParam = document.createElement("input");
          inputParam.className = "input-clean-tree";
          inputParam.type = "text";
          inputParam.value = param.name;
          inputParam.id = `tree-${paramRefId}`;
          inputParam.oninput = function () {
            param.name = inputParam.value;
            synchronizeTreeToBatchField();
          };

          divParamItem.appendChild(inputParam);
          divSublist.appendChild(divParamItem);
        });
      }

      if (factorioNode.entities && Array.isArray(factorioNode.entities)) {
        factorioNode.entities.forEach((entity) => {
          let alertTargetObj = null;
          let alertKey = "alert_message";
          if (
            entity.parameters &&
            entity.parameters.alert_message !== undefined
          ) {
            alertTargetObj = entity.parameters;
          } else if (
            entity.control_behavior &&
            entity.control_behavior.circuit_alert_message !== undefined
          ) {
            alertTargetObj = entity.control_behavior;
            alertKey = "circuit_alert_message";
          }

          if (alertTargetObj) {
            const entityRefId = registerTextReference(
              "ENTIDAD",
              alertTargetObj,
              alertKey,
            );
            const divEntityItem = createEntityTreeBlock(
              `${translate("lbl_sirena")} (ID: ${entity.entity_number})`,
              alertTargetObj,
              alertKey,
              entityRefId,
              null,
            );
            divSublist.appendChild(divEntityItem);
          }

          if (entity.logistic_sections && entity.logistic_sections.sections) {
            entity.logistic_sections.sections.forEach((section, sIdx) => {
              if (section.name === undefined) section.name = "";
              const entityRefId = registerTextReference(
                "ENTIDAD",
                section,
                "name",
              );

              let filterPreview = "";
              if (section.filters && Array.isArray(section.filters)) {
                const activeFilters = section.filters
                  .filter((f) => f.value && f.value.name)
                  .map((f) => f.value.name);
                if (activeFilters.length > 0)
                  filterPreview = `Filtros: ${activeFilters.slice(0, 2).join(", ")}...`;
              }

              const divEntityItem = createEntityTreeBlock(
                `${translate("lbl_grupo_logistico")} #${sIdx + 1} [${entity.name}]`,
                section,
                "name",
                entityRefId,
                filterPreview,
              );
              divSublist.appendChild(divEntityItem);
            });
          }

          if (entity.station_name !== undefined) {
            const entityRefId = registerTextReference(
              "ENTIDAD",
              entity,
              "station_name",
            );
            const divEntityItem = createEntityTreeBlock(
              translate("lbl_estacion"),
              entity,
              "station_name",
              entityRefId,
              null,
            );
            divSublist.appendChild(divEntityItem);
          }
        });
      }

      if (divSublist.children.length > 0) divNode.appendChild(divSublist);
      activeVisualTarget.appendChild(divNode);

      if (
        isBook &&
        factorioNode.blueprints &&
        Array.isArray(factorioNode.blueprints)
      ) {
        const divChildrenContainer = document.createElement("div");
        divChildrenContainer.className = "node-children";
        divNode.appendChild(divChildrenContainer);

        for (let i = factorioNode.blueprints.length - 1; i >= 0; i--) {
          stack.push({
            dataNode: factorioNode.blueprints[i],
            visualTarget: divChildrenContainer,
          });
        }
      }
    } else {
      for (let key in activeObj) {
        stack.push({
          dataNode: activeObj[key],
          visualTarget: activeVisualTarget,
        });
      }
    }
  }

  generateMassiveTextList();
}

function createEntityTreeBlock(
  titleText,
  refObj,
  property,
  uniqueId,
  previewText,
) {
  const divItem = document.createElement("div");
  divItem.className = "sublista-item e";

  const spanInfo = document.createElement("span");
  spanInfo.className = "item-label-tree";
  spanInfo.innerText = titleText;
  divItem.appendChild(spanInfo);

  if (previewText) {
    const divPreview = document.createElement("div");
    divPreview.className = "preview-items";
    divPreview.innerText = previewText;
    divItem.appendChild(divPreview);
  }

  const inputEntity = document.createElement("input");
  inputEntity.className = "input-clean-tree";
  inputEntity.type = "text";
  inputEntity.value = refObj[property] || "";
  inputEntity.id = `tree-${uniqueId}`;
  inputEntity.oninput = function () {
    refObj[property] = inputEntity.value;
    synchronizeTreeToBatchField();
  };

  divItem.appendChild(inputEntity);
  return divItem;
}

function generateMassiveTextList() {
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

function applyBatchChanges() {
  const batchRawText = document.getElementById("batchTextarea").value;
  const lines = batchRawText.split(/\r?\n/);
  let processedCount = 0;

  lines.forEach((line) => {
    line = line.trim();
    if (!line || line.startsWith("#")) return;

    const equalIndex = line.indexOf("=");
    if (equalIndex === -1) return;

    // Limpiamos posibles espacios extra que el traductor meta alrededor del ID
    let uniqueId = line.substring(0, equalIndex).trim();
    let importedValue = line.substring(equalIndex + 1).trim();

    // Forzar minúsculas y quitar espacios internos por si el traductor alteró el ID (ej: [Bp - 5 - D])
    uniqueId = uniqueId.toLowerCase().replace(/\s+/g, "");

    importedValue = importedValue.replace(/\\n/g, "\n");

    if (globalReferenceMap[uniqueId]) {
      const reference = globalReferenceMap[uniqueId];
      reference.targetObject[reference.targetProperty] = importedValue;

      const inlineInput = document.getElementById(`tree-${uniqueId}`);
      if (inlineInput) inlineInput.value = importedValue;
      processedCount++;
    }
  });
  alert(translate("msg_sincronizado", { count: processedCount }));
}

function synchronizeTreeToBatchField() {
  generateMassiveTextList();
}

async function generateNewBlueprintString() {
  if (!blueprintRootJson) return alert(translate("err_no_data"));
  try {
    const generatedString = await compressBlueprintJson(blueprintRootJson);
    document.getElementById("outputString").value = generatedString;
  } catch (e) {
    alert(translate("err_generate", { message: e.message }));
  }
}

async function generateAndCopyString() {
  if (!blueprintRootJson) return alert(translate("err_no_data"));
  const btn = document.getElementById("btnGenCopy");

  try {
    const generatedString = await compressBlueprintJson(blueprintRootJson);
    document.getElementById("outputString").value = generatedString;

    await navigator.clipboard.writeText(generatedString);

    btn.innerText = translate("msg_copied");
    btn.style.filter = "hue-rotate(90deg)";

    setTimeout(() => {
      btn.innerText = translate("btn_generate_copy");
      btn.style.filter = "none";
    }, 2000);
  } catch (e) {
    alert(translate("err_generate", { message: e.message }));
  }
}

let currentCatalogTab = "logistics";
let lastFocusedInput = null;

document.addEventListener("focusin", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
    if (e.target.id !== "catalogSearch") {
      lastFocusedInput = e.target;
    }
  }
});

document.getElementById("btnOpenCatalog")?.addEventListener("click", () => {
  const catalog = document.getElementById("factorioCatalog");
  catalog.classList.toggle("active");

  if (catalog.classList.contains("active")) {
    renderCatalogCategory(currentCatalogTab);
  }
});

document.getElementById("btnCloseCatalog")?.addEventListener("click", () => {
  document.getElementById("factorioCatalog").classList.remove("active");
});

function switchCatalogTab(tabId) {
  currentCatalogTab = tabId;
  document
    .querySelectorAll(".catalog-tab-link")
    .forEach((btn) => btn.classList.remove("active"));

  if (event && event.currentTarget) {
    event.currentTarget.classList.add("active");
  }
  document.getElementById("catalogSearch").value = "";
  renderCatalogCategory(tabId);
}

function renderCatalogCategory(category, filterText = "") {
  const grid = document.getElementById("catalogGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const groups = FACTORIO_ICONS_DATA[category] || [];
  const lang = typeof currentLanguage !== "undefined" ? currentLanguage : "es";

  groups.forEach((rowItems) => {
    // Creamos una fila visual de Factorio
    const rowContainer = document.createElement("div");
    rowContainer.className = "catalog-row";

    let itemsInRowAdded = 0;

    rowItems.forEach((item) => {
      const displayName = lang === "es" ? item.es : item.en;

      if (
        filterText &&
        !displayName.toLowerCase().includes(filterText.toLowerCase()) &&
        !item.id.toLowerCase().includes(filterText.toLowerCase())
      ) {
        return;
      }

      itemsInRowAdded++;

      const card = document.createElement("div");
      card.className = "icon-card";

      let tagPrefix = "item";
      if (category === "signals") tagPrefix = "virtual-signal";
      if (category === "enemies") tagPrefix = "entity";
      if (category === "fluids") tagPrefix = "fluid";

      const fullTag = `[${tagPrefix}=${item.id}]`;
      card.title = fullTag;

      let wikiName = "";
      const chestOverrides = {
        "logistic-chest-active-provider": "Active_provider_chest",
        "logistic-chest-passive-provider": "Passive_provider_chest",
        "logistic-chest-storage": "Storage_chest",
        "logistic-chest-buffer": "Buffer_chest",
        "logistic-chest-requester": "Requester_chest",
      };

      if (chestOverrides[item.id]) {
        wikiName = chestOverrides[item.id];
      } else if (item.id === "long-handed-inserter") {
        wikiName = "Long-handed_inserter";
      } else {
        let processed = item.id.replace(/-/g, "_");
        wikiName = processed.charAt(0).toUpperCase() + processed.slice(1);
      }

      if (item.id === "signal-everything") wikiName = "Everything_signal";
      if (item.id === "signal-anything") wikiName = "Anything_signal";
      if (item.id === "signal-each") wikiName = "Each_signal";

      if (item.id.startsWith("signal-") && item.id.length === 8) {
        const char = item.id.charAt(7).toUpperCase();
        wikiName = `Signal_${char}`;
      }

      const imgUrl = `https://wiki.factorio.com/images/${wikiName}.png`;

      card.innerHTML = `
        <img src="${imgUrl}" alt="${displayName}" loading="lazy" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22 viewBox=%220 0 32 32%22><rect width=%2232%22 height=%2232%22 fill=%22%23242322%22 stroke=%22%23413f3e%22 stroke-width=%221%22/><text x=%2250%%22 y=%2260%%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23ff9f1c%22 font-size=%2214%22 font-family=%22monospace%22 font-weight=%22bold%22>⚙️</text></svg>';">
      `;

      card.addEventListener("click", () => {
        navigator.clipboard.writeText(fullTag);

        if (lastFocusedInput) {
          const input = lastFocusedInput;
          const startPos = input.selectionStart;
          const endPos = input.selectionEnd;
          const text = input.value;

          input.value =
            text.substring(0, startPos) + fullTag + text.substring(endPos);

          const newCursorPos = startPos + fullTag.length;
          input.setSelectionRange(newCursorPos, newCursorPos);

          input.focus();

          if (input.id === "batchTextarea") {
          } else if (input.id.startsWith("tree-")) {
            if (typeof input.oninput === "function") {
              input.oninput();
            }
          }
        }

        card.classList.add("copied");
        setTimeout(() => {
          card.classList.remove("copied");
        }, 800);
      });

      rowContainer.appendChild(card);
    });

    if (itemsInRowAdded > 0) {
      grid.appendChild(rowContainer);
    }
  });
}

function filterCatalog() {
  const text = document.getElementById("catalogSearch").value;
  renderCatalogCategory(currentCatalogTab, text);
}

document.addEventListener("click", (e) => {
  const catalog = document.getElementById("factorioCatalog");
  const btnOpen = document.getElementById("btnOpenCatalog");

  if (catalog && catalog.classList.contains("active")) {
    if (!catalog.contains(e.target) && !btnOpen.contains(e.target)) {
      catalog.classList.remove("active");
    }
  }
});
