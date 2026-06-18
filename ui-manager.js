import {
  decompressBlueprintString,
  compressBlueprintJson,
} from "./blueprint-processor.js";

// --- Estado Global (Exportable para otros módulos) ---
export let blueprintRootJson = null;
export let globalReferenceMap = {};
export let globalIdCounter = 0;
export let currentLanguage = "es";
export let currentCatalogTab = "logistics";
export let lastFocusedInput = null;
export let FACTORIO_ICONS_DATA = {};

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

export async function renderCatalogCategory(category, filterText = "") {
  const grid = document.getElementById("catalogGrid");
  if (!grid) return;
  grid.innerHTML = "..."; // Loading state

  if (!FACTORIO_ICONS_DATA[category]) {
    try {
      const response = await fetch(`./data/${category}.json`);
      const data = await response.json();
      FACTORIO_ICONS_DATA[category] = data[category];
    } catch (e) {
      console.error("Error loading category:", e);
      grid.innerHTML = "Error loading data.";
      return;
    }
  }

  grid.innerHTML = "";
  const groups = FACTORIO_ICONS_DATA[category] || [];
  const lang = currentLanguage;

  groups.forEach((rowItems) => {
    const rowContainer = document.createElement("div");
    rowContainer.className = "catalog-row";

    let itemsInRowAdded = 0;
    rowItems.forEach((item) => {
      const displayName = lang === "es" ? item.es : item.en;
      if (
        filterText &&
        !displayName.toLowerCase().includes(filterText.toLowerCase()) &&
        !item.id.toLowerCase().includes(filterText.toLowerCase())
      )
        return;

      itemsInRowAdded++;
      const card = document.createElement("div");
      card.className = "icon-card";
      let tagPrefix = "item";
      if (category === "signals") tagPrefix = "virtual-signal";
      if (category === "enemies") tagPrefix = "entity";
      if (category === "fluids") tagPrefix = "fluid";
      const fullTag = `[${tagPrefix}=${item.id}]`;
      card.title = displayName;

      let wikiName = "";
      const chestOverrides = {
        "logistic-chest-active-provider": "Active_provider_chest",
        "logistic-chest-passive-provider": "Passive_provider_chest",
        "logistic-chest-storage": "Storage_chest",
        "logistic-chest-buffer": "Buffer_chest",
        "logistic-chest-requester": "Requester_chest",
      };
      if (chestOverrides[item.id]) wikiName = chestOverrides[item.id];
      else if (item.id === "long-handed-inserter")
        wikiName = "Long-handed_inserter";
      else {
        let processed = item.id.replace(/-/g, "_");
        wikiName = processed.charAt(0).toUpperCase() + processed.slice(1);
      }
      if (item.id === "signal-everything") wikiName = "Everything_signal";
      if (item.id === "signal-anything") wikiName = "Anything_signal";
      if (item.id === "signal-each") wikiName = "Each_signal";
      if (item.id.startsWith("signal-") && item.id.length === 8)
        wikiName = `Signal_${item.id.charAt(7).toUpperCase()}`;

      const imgUrl = `https://wiki.factorio.com/images/${wikiName}.png`;
      card.innerHTML = `<img src="${imgUrl}" alt="${displayName}" loading="lazy" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22 viewBox=%220 0 32 32%22><rect width=%2232%22 height=%2232%22 fill=%22%23242322%22 stroke=%22%23413f3e%22 stroke-width=%221%22/><text x=%2250%%22 y=%2260%%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23ff9f1c%22 font-size=%2214%22 font-family=%22monospace%22 font-weight=%22bold%22>⚙️</text></svg>';">`;
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
          if (
            input.id.startsWith("tree-") &&
            typeof input.oninput === "function"
          )
            input.oninput();
        }
        card.classList.add("copied");
        setTimeout(() => card.classList.remove("copied"), 800);
      });
      rowContainer.appendChild(card);
    });
    if (itemsInRowAdded > 0) grid.appendChild(rowContainer);
  });
}

// --- Funciones de Lógica de UI ---
export function setBlueprintRootJson(value) {
  blueprintRootJson = value;
}
export function setGlobalReferenceMap(value) {
  globalReferenceMap = value;
}
export function setGlobalIdCounter(value) {
  globalIdCounter = value;
}
export function setCurrentLanguage(value) {
  currentLanguage = value;
}
export function setCurrentCatalogTab(value) {
  currentCatalogTab = value;
}
export function setLastFocusedInput(value) {
  lastFocusedInput = value;
}

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

export function renderFailsafeTreeAndMapping(rootObj) {
  const htmlContainer = document.getElementById("treeViewContainer");
  htmlContainer.innerHTML = "";

  let stack = [{ dataNode: rootObj, visualTarget: htmlContainer }];

  while (stack.length > 0) {
    let currentElement = stack.pop();
    let activeObj = currentElement.dataNode;
    let activeVisualTarget = currentElement.visualTarget;

    if (typeof activeObj !== "object" || activeObj === null) continue;

    const isBook = activeObj.blueprint_book !== undefined;
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

      inputTitle.onfocus = () => {
        lastFocusedInput = inputTitle;
      };
      inputTitle.oninput = debounce(function () {
        factorioNode.label = inputTitle.value;
        synchronizeTreeToBatchField();
      });
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
      textareaDesc.onfocus = () => {
        lastFocusedInput = textareaDesc;
      };
      textareaDesc.oninput = debounce(function () {
        factorioNode.description = textareaDesc.value;
        synchronizeTreeToBatchField();
      });
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
          inputParam.oninput = debounce(function () {
            param.name = inputParam.value;
            synchronizeTreeToBatchField();
          });

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

export function createEntityTreeBlock(
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
  inputEntity.oninput = debounce(function () {
    refObj[property] = inputEntity.value;
    synchronizeTreeToBatchField();
  });

  divItem.appendChild(inputEntity);
  return divItem;
}
