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
  if (!blueprintRootJson) return alert("No data loaded.");
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
  if (!input.startsWith("0")) return alert("Invalid blueprint string.");

  try {
    blueprintRootJson = await decompressBlueprintString(input.substring(1));
    globalReferenceMap = {};
    globalIdCounter = 0;
    renderFailsafeTreeAndMapping(blueprintRootJson);
  } catch (error) {
    alert("Scan error: " + error.message);
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
  if (!blueprintRootJson) return;
  try {
    const generatedString = await compressBlueprintJson(blueprintRootJson);
    document.getElementById("outputString").value = generatedString;
  } catch (e) {
    alert("Error generating string: " + e.message);
  }
}
