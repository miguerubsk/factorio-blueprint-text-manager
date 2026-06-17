const FACTORIO_ICONS_DATA = {
  logistics: [
    // Fila 1: Cofres y Almacenamiento
    [
      { id: "wooden-chest", en: "Wooden chest", es: "Cofre de madera" },
      { id: "iron-chest", en: "Iron chest", es: "Cofre de hierro" },
      { id: "steel-chest", en: "Steel chest", es: "Cofre de acero" },
      { id: "storage-tank", en: "Storage tank", es: "Tanque de almacenaje" },
    ],
    // Fila 2: Cintas de transporte básicas y rápidas
    [
      {
        id: "transport-belt",
        en: "Transport belt",
        es: "Cinta transportadora",
      },
      {
        id: "fast-transport-belt",
        en: "Fast transport belt",
        es: "Cinta transportadora rápida",
      },
      {
        id: "express-transport-belt",
        en: "Express transport belt",
        es: "Cinta transportadora exprés",
      },
      {
        id: "turbo-transport-belt",
        en: "Turbo transport belt",
        es: "Cinta transportadora turbo",
      },
    ],
    // Fila 3: Cintas subterráneas
    [
      {
        id: "underground-belt",
        en: "Underground belt",
        es: "Cinta transportadora subterránea",
      },
      {
        id: "fast-underground-belt",
        en: "Fast underground belt",
        es: "Cinta transportadora subterránea rápida",
      },
      {
        id: "express-underground-belt",
        en: "Express underground belt",
        es: "Cinta transportadora subterránea exprés",
      },
      {
        id: "turbo-underground-belt",
        en: "Turbo underground belt",
        es: "Cinta transportadora subterránea turbo",
      },
    ],
    // Fila 4: Divisores de cinta
    [
      { id: "splitter", en: "Splitter", es: "Divisor" },
      { id: "fast-splitter", en: "Fast splitter", es: "Divisor rápido" },
      { id: "express-splitter", en: "Express splitter", es: "Divisor exprés" },
      { id: "turbo-splitter", en: "Turbo splitter", es: "Divisor turbo" },
    ],
    // Fila 5: Insertadores
    [
      {
        id: "burner-inserter",
        en: "Burner inserter",
        es: "Insertador a vapor",
      },
      { id: "inserter", en: "Inserter", es: "Insertador" },
      {
        id: "long-handed-inserter",
        en: "Long-handed inserter",
        es: "Insertador largo",
      },
      { id: "fast-inserter", en: "Fast inserter", es: "Insertador rápido" },
      { id: "bulk-inserter", en: "Bulk inserter", es: "Insertador por lotes" },
      {
        id: "stack-inserter",
        en: "Stack inserter",
        es: "Insertador de apilamiento",
      },
    ],
    // Fila 6: Red eléctrica y tuberías básica
    [
      {
        id: "small-electric-pole",
        en: "Small electric pole",
        es: "Poste eléctrico pequeño",
      },
      {
        id: "medium-electric-pole",
        en: "Medium electric pole",
        es: "Poste eléctrico mediano",
      },
      {
        id: "big-electric-pole",
        en: "Big electric pole",
        es: "Poste eléctrico grande",
      },
      { id: "substation", en: "Substation", es: "Subestación eléctrica" },
      { id: "pipe", en: "Pipe", es: "Tubería" },
      { id: "pipe-to-ground", en: "Pipe to ground", es: "Tubería subterránea" },
      { id: "pump", en: "Pump", es: "Bomba" },
    ],
    // Fila 7: Infraestructura ferroviaria y Trenes
    [
      { id: "rail", en: "Rail", es: "Raíl" },
      { id: "rail-ramp", en: "Rail ramp", es: "Rampa de vía" },
      { id: "rail-support", en: "Rail support", es: "Soporte de vía" },
      { id: "train-stop", en: "Train stop", es: "Parada de tren" },
      { id: "rail-signal", en: "Rail signal", es: "Semáforo ferroviario" },
      {
        id: "rail-chain-signal",
        en: "Rail chain signal",
        es: "Semáforo ferroviario de cadena",
      },
      { id: "locomotive", en: "Locomotive", es: "Locomotora" },
      { id: "cargo-wagon", en: "Cargo wagon", es: "Vagón de carga" },
      { id: "fluid-wagon", en: "Fluid wagon", es: "Vagón de fluidos" },
      {
        id: "artillery-wagon",
        en: "Artillery wagon",
        es: "Vagón de artillería",
      },
    ],
    // Fila 8: Vehículos independientes
    [
      { id: "car", en: "Car", es: "Coche" },
      { id: "tank", en: "Tank", es: "Tanque" },
      { id: "spidertron", en: "Spidertron", es: "Mecanoaraña" },
      {
        id: "spidertron-remote",
        en: "Spidertron remote",
        es: "Control remoto de Mecanoaraña",
      },
    ],
    // Fila 9: Red Logística de Robots
    [
      { id: "logistic-robot", en: "Logistic robot", es: "Robot logístico" },
      {
        id: "construction-robot",
        en: "Construction robot",
        es: "Robot de construcción",
      },
      {
        id: "active-provider-chest",
        en: "Active provider chest",
        es: "Cofre proveedor activo",
      },
      {
        id: "passive-provider-chest",
        en: "Passive provider chest",
        es: "Cofre proveedor pasivo",
      },
      {
        id: "storage-chest",
        en: "Storage chest",
        es: "Cofre de almacenamiento logístico",
      },
      { id: "buffer-chest", en: "Buffer chest", es: "Cofre de buffer" },
      {
        id: "requester-chest",
        en: "Requester chest",
        es: "Cofre solicitador logístico",
      },
      { id: "roboport", en: "Roboport", es: "Robopuerto" },
    ],
    // Fila 10: Sistema lógico de circuitos
    [
      { id: "lamp", en: "Lamp", es: "Lámpara" },
      { id: "red-wire", en: "Red wire", es: "Cable rojo" },
      { id: "green-wire", en: "Green wire", es: "Cable verde" },
      {
        id: "arithmetic-combinator",
        en: "Arithmetic combinator",
        es: "Combinador aritmético",
      },
      {
        id: "decider-combinator",
        en: "Decider combinator",
        es: "Combinador comparador",
      },
      {
        id: "selector-combinator",
        en: "Selector combinator",
        es: "Combinador selector",
      },
      {
        id: "constant-combinator",
        en: "Constant combinator",
        es: "Combinador constante",
      },
      { id: "power-switch", en: "Power switch", es: "Interruptor" },
      {
        id: "programmable-speaker",
        en: "Programmable speaker",
        es: "Sirena programable",
      },
      {
        id: "display-panel",
        en: "Display panel",
        es: "Panel de visualización",
      },
    ],
    // Fila 11: Suelos y pavimentos
    [
      { id: "stone-brick", en: "Stone brick", es: "Ladrillo de piedra" },
      { id: "concrete", en: "Concrete", es: "Hormigón" },
      {
        id: "hazard-concrete",
        en: "Hazard concrete",
        es: "Hormigón con señal de peligro",
      },
      {
        id: "refined-concrete",
        en: "Refined concrete",
        es: "Hormigón refinado",
      },
      {
        id: "refined-hazard-concrete",
        en: "Refined hazard concrete",
        es: "Hormigón refinado con señal de peligro",
      },
      { id: "landfill", en: "Landfill", es: "Relleno de tierra" },
      {
        id: "cliff-explosives",
        en: "Cliff explosives",
        es: "Explosivos de acantilado",
      },
    ],
    // Fila 12: Agricultura y plataformas exóticas (Space Age)
    [
      {
        id: "artificial-yumako-soil",
        en: "Artificial yumako soil",
        es: "Tierra artificial de yumako",
      },
      {
        id: "overgrowth-yumako-soil",
        en: "Overgrowth yumako soil",
        es: "Tierra de yumako en crecimiento excesivo",
      },
      {
        id: "artificial-jellynut-soil",
        en: "Artificial jellynut soil",
        es: "Tierra artificial de jellynut",
      },
      {
        id: "overgrowth-jellynut-soil",
        en: "Overgrowth jellynut soil",
        es: "Tierra de jellynut en crecimiento excesivo",
      },
      { id: "ice-platform", en: "Ice platform", es: "Plataforma de hielo" },
      { id: "foundation", en: "Foundation", es: "Cimiento" },
    ],
  ],
  production: [
    // Fila 1: Planificación y Planos
    [
      { id: "repair-pack", en: "Repair pack", es: "Pack de reparación" },
      { id: "blueprint", en: "Blueprint", es: "Plano" },
      {
        id: "deconstruction-planner",
        en: "Deconstruction planner",
        es: "Plano de desmantelamiento",
      },
      { id: "upgrade-planner", en: "Upgrade planner", es: "Plano de mejora" },
      { id: "blueprint-book", en: "Blueprint book", es: "Libro de planos" },
    ],
    // Fila 2: Generación de energía básica y nuclear
    [
      { id: "boiler", en: "Boiler", es: "Caldera" },
      { id: "steam-engine", en: "Steam engine", es: "Generador de vapor" },
      { id: "solar-panel", en: "Solar panel", es: "Panel solar" },
      { id: "accumulator", en: "Accumulator", es: "Acumulador" },
      { id: "nuclear-reactor", en: "Nuclear reactor", es: "Reactor nuclear" },
      { id: "heat-pipe", en: "Heat pipe", es: "Tubería térmica" },
      {
        id: "heat-exchanger",
        en: "Heat exchanger",
        es: "Intercambiador de calor",
      },
      { id: "steam-turbine", en: "Steam turbine", es: "Turbina de vapor" },
    ],
    // Fila 3: Fusión y Extractores
    [
      { id: "fusion-reactor", en: "Fusion reactor", es: "Reactor de fusión" },
      {
        id: "fusion-generator",
        en: "Fusion generator",
        es: "Generador de fusión",
      },
      {
        id: "burner-mining-drill",
        en: "Burner mining drill",
        es: "Perforadora a vapor",
      },
      {
        id: "electric-mining-drill",
        en: "Electric mining drill",
        es: "Perforadora eléctrica",
      },
      {
        id: "big-mining-drill",
        en: "Big mining drill",
        es: "Perforadora grande",
      },
      { id: "offshore-pump", en: "Offshore pump", es: "Bomba costera" },
      { id: "pumpjack", en: "Pumpjack", es: "Bomba extractora" },
    ],
    // Fila 4: Hornos y Procesamiento pesado
    [
      { id: "stone-furnace", en: "Stone furnace", es: "Horno de piedra" },
      { id: "steel-furnace", en: "Steel furnace", es: "Horno de acero" },
      { id: "electric-furnace", en: "Electric furnace", es: "Horno eléctrico" },
      { id: "foundry", en: "Foundry", es: "Fundición" },
      { id: "recycler", en: "Recycler", es: "Recicladora" },
    ],
    // Fila 5: Biología y Torres Agrícolas
    [
      {
        id: "agricultural-tower",
        en: "Agricultural tower",
        es: "Torre agrícola",
      },
      { id: "biochamber", en: "Biochamber", es: "Biocámara" },
      {
        id: "captive-biter-spawner",
        en: "Captive biter spawner",
        es: "Generador de biter captivo",
      },
    ],
    // Fila 6: Ensamblado y Refinado químico
    [
      {
        id: "assembling-machine-1",
        en: "Assembling machine 1",
        es: "Máquina de ensamblaje 1",
      },
      {
        id: "assembling-machine-2",
        en: "Assembling machine 2",
        es: "Máquina de ensamblaje 2",
      },
      {
        id: "assembling-machine-3",
        en: "Assembling machine 3",
        es: "Máquina de ensamblaje 3",
      },
      { id: "oil-refinery", en: "Oil refinery", es: "Refinería de petróleo" },
      { id: "chemical-plant", en: "Chemical plant", es: "Planta química" },
      { id: "centrifuge", en: "Centrifuge", es: "Centrifugadora" },
    ],
    // Fila 7: Plantas avanzadas y Laboratorios
    [
      {
        id: "electromagnetic-plant",
        en: "Electromagnetic plant",
        es: "Planta electromagnética",
      },
      { id: "cryogenic-plant", en: "Cryogenic plant", es: "Planta criogénica" },
      { id: "lab", en: "Lab", es: "Laboratorio" },
      { id: "biolab", en: "Biolab", es: "Biolaboratorio" },
    ],
    // Fila 8: Clima, Faros y Módulos de velocidad
    [
      { id: "lightning-rod", en: "Lightning rod", es: "Pararrayos" },
      {
        id: "lightning-collector",
        en: "Lightning collector",
        es: "Recolector de rayos",
      },
      { id: "heating-tower", en: "Heating tower", es: "Torre de calefacción" },
      { id: "beacon", en: "Beacon", es: "Faro" },
      { id: "speed-module", en: "Speed module", es: "Módulo de velocidad" },
      {
        id: "speed-module-2",
        en: "Speed module 2",
        es: "Módulo de velocidad 2",
      },
      {
        id: "speed-module-3",
        en: "Speed module 3",
        es: "Módulo de velocidad 3",
      },
    ],
    // Fila 9: Módulos de Eficiencia, Productividad y Calidad
    [
      {
        id: "efficiency-module",
        en: "Efficiency module",
        es: "Módulo de eficiencia",
      },
      {
        id: "efficiency-module-2",
        en: "Efficiency module 2",
        es: "Módulo de eficiencia 2",
      },
      {
        id: "efficiency-module-3",
        en: "Efficiency module 3",
        es: "Módulo de eficiencia 3",
      },
      {
        id: "productivity-module",
        en: "Productivity module",
        es: "Módulo de productividad",
      },
      {
        id: "productivity-module-2",
        en: "Productivity module 2",
        es: "Módulo de productividad 2",
      },
      {
        id: "productivity-module-3",
        en: "Productivity module 3",
        es: "Módulo de productividad 3",
      },
      { id: "quality-module", en: "Quality module", es: "Módulo de calidad" },
      {
        id: "quality-module-2",
        en: "Quality module 2",
        es: "Módulo de calidad 2",
      },
      {
        id: "quality-module-3",
        en: "Quality module 3",
        es: "Módulo de calidad 3",
      },
    ],
  ],
  intermediates: [
    // Fila 1: Procesos avanzados e hidrocarburos (Fluorocetona, Petróleo)
    [
      {
        id: "fluoroketone-(hot)",
        en: "Fluoroketone (hot)",
        es: "Fluorocetona (caliente)",
      },
      {
        id: "fluoroketone-(cold)",
        en: "Fluoroketone (cold)",
        es: "Fluorocetona (fría)",
      },
      {
        id: "basic-oil-processing",
        en: "Basic oil processing",
        es: "Procesamiento de petróleo básico",
      },
      {
        id: "advanced-oil-processing",
        en: "Advanced oil processing",
        es: "Procesamiento de petróleo avanzado",
      },
      {
        id: "simple-coal-liquefaction",
        en: "Simple coal liquefaction",
        es: "Licuefacción de carbón simple",
      },
      {
        id: "coal-liquefaction",
        en: "Coal liquefaction",
        es: "Licuefacción de carbón",
      },
      {
        id: "heavy-oil-cracking",
        en: "Heavy oil cracking",
        es: "Destilar petróleo pesado a petróleo ligero",
      },
      {
        id: "light-oil-cracking",
        en: "Light oil cracking",
        es: "Destilar petróleo ligero",
      },
    ],
    // Fila 2: Síntesis de Combustibles y fluidos secundarios
    [
      {
        id: "solid-fuel-from-petroleum-gas",
        en: "Solid fuel from petroleum gas",
        es: "Combustible sólido a partir de gas de petróleo",
      },
      {
        id: "solid-fuel-from-light-oil",
        en: "Solid fuel from light oil",
        es: "Combustible sólido a partir de petróleo ligero",
      },
      {
        id: "solid-fuel-from-heavy-oil",
        en: "Solid fuel from heavy oil",
        es: "Combustible sólido a partir de petróleo pesado",
      },
      {
        id: "acid-neutralisation",
        en: "Acid neutralisation",
        es: "Neutralización de ácido",
      },
      {
        id: "steam-condensation",
        en: "Steam condensation",
        es: "Condensación de vapor",
      },
      { id: "ice-melting", en: "Ice melting", es: "Derretimiento de hielo" },
    ],
    // Fila 3: Materiales básicos extraídos (Menas y Recursos)
    [
      { id: "wood", en: "Wood", es: "Madera" },
      { id: "coal", en: "Coal", es: "Carbón" },
      { id: "stone", en: "Stone", es: "Piedra" },
      { id: "iron-ore", en: "Iron ore", es: "Mena de hierro" },
      { id: "copper-ore", en: "Copper ore", es: "Mena de cobre" },
      { id: "uranium-ore", en: "Uranium ore", es: "Mineral de uranio" },
      { id: "raw-fish", en: "Raw fish", es: "Pescado crudo" },
      { id: "ice", en: "Ice", es: "Hielo" },
    ],
    // Fila 4: Placas y Refinados químicos sólidos
    [
      { id: "iron-plate", en: "Iron plate", es: "Placa de hierro" },
      { id: "copper-plate", en: "Copper plate", es: "Placa de cobre" },
      { id: "steel-plate", en: "Steel plate", es: "Barra de acero" },
      { id: "solid-fuel", en: "Solid fuel", es: "Combustible sólido" },
      { id: "plastic-bar", en: "Plastic bar", es: "Barra de plástico" },
      { id: "sulfur", en: "Sulfur", es: "Azufre" },
      { id: "battery", en: "Battery", es: "Batería" },
      { id: "explosives", en: "Explosives", es: "Explosivos" },
      { id: "carbon", en: "Carbon", es: "Carbon" },
      {
        id: "coal-synthesis",
        en: "Coal synthesis",
        es: "Licuefacción de carbón",
      },
    ],
    // Fila 5: Barriles de almacenamiento de fluidos
    [
      { id: "water-barrel", en: "Water barrel", es: "Barril de agua" },
      {
        id: "crude-oil-barrel",
        en: "Crude oil barrel",
        es: "Barril de petróleo crudo",
      },
      {
        id: "petroleum-gas-barrel",
        en: "Petroleum gas barrel",
        es: "Barril de gas de petróleo",
      },
      {
        id: "light-oil-barrel",
        en: "Light oil barrel",
        es: "Barril de petróleo ligero",
      },
      {
        id: "heavy-oil-barrel",
        en: "Heavy oil barrel",
        es: "Barril de petróleo pesado",
      },
      {
        id: "lubricant-barrel",
        en: "Lubricant barrel",
        es: "Barril de lubricante",
      },
      {
        id: "sulfuric-acid-barrel",
        en: "Sulfuric acid barrel",
        es: "Barril de ácido sulfúrico",
      },
      {
        id: "fluoroketone-(hot)-barrel",
        en: "Fluoroketone (hot) barrel",
        es: "Barril de fluorocetona (hot)",
      },
      {
        id: "fluoroketone-(cold)-barrel",
        en: "Fluoroketone (cold) barrel",
        es: "Barril de fluorocetona (fría)",
      },
    ],
    // Fila 6: Componentes mecánicos y Circuitos lógicos progresivos
    [
      {
        id: "iron-gear-wheel",
        en: "Iron gear wheel",
        es: "Engranaje de hierro",
      },
      { id: "iron-stick", en: "Iron stick", es: "Vara de hierro" },
      { id: "copper-cable", en: "Copper cable", es: "Cable de cobre" },
      { id: "barrel", en: "Barrel", es: "Barril" },
      {
        id: "electronic-circuit",
        en: "Electronic circuit",
        es: "Circuito electrónico",
      },
      {
        id: "advanced-circuit",
        en: "Advanced circuit",
        es: "Circuito electrónico avanzado",
      },
      {
        id: "processing-unit",
        en: "Processing unit",
        es: "Unidad de procesamiento",
      },
    ],
    // Fila 7: Motores y Marcos robóticos / Cohetes
    [
      { id: "engine-unit", en: "Engine unit", es: "Motor" },
      {
        id: "electric-engine-unit",
        en: "Electric engine unit",
        es: "Motor eléctrico",
      },
      {
        id: "flying-robot-frame",
        en: "Flying robot frame",
        es: "Estructura de robot volador",
      },
      {
        id: "low-density-structure",
        en: "Low density structure",
        es: "Estrutura de baja densidad",
      },
      { id: "rocket-fuel", en: "Rocket fuel", es: "Combustible de cohete" },
    ],
    // Fila 8: Procesamiento de Uranio y Enriquecimiento
    [
      {
        id: "uranium-processing",
        en: "Uranium processing",
        es: "Procesamiento de uranio",
      },
      { id: "uranium-235", en: "Uranium-235", es: "Uranio 235" },
      { id: "uranium-238", en: "Uranium-238", es: "Uranio 238" },
      {
        id: "uranium-fuel-cell",
        en: "Uranium fuel cell",
        es: "Celda combustible de uranio",
      },
      {
        id: "depleted-uranium-fuel-cell",
        en: "Depleted uranium fuel cell",
        es: "Celda combustible de uranio gastada",
      },
      {
        id: "nuclear-fuel-reprocessing",
        en: "Nuclear fuel reprocessing",
        es: "Reprocesamiento de combustible nuclear",
      },
      {
        id: "kovarex-enrichment-process",
        en: "Kovarex enrichment process",
        es: "Proceso de enriquecimiento de Kovarex",
      },
      { id: "nuclear-fuel", en: "Nuclear fuel", es: "Combustible nuclear" },
    ],
    // Fila 9: Recursos e intermedios de Vulcano y Fulgora (Metalurgia / Electrónica)
    [
      { id: "calcite", en: "Calcite", es: "Calcite" },
      { id: "tungsten-ore", en: "Tungsten ore", es: "Mena de tungsteno" },
      {
        id: "tungsten-carbide",
        en: "Tungsten carbide",
        es: "Carburo de tungsteno",
      },
      { id: "tungsten-plate", en: "Tungsten plate", es: "Placa de tungsteno" },
      { id: "scrap", en: "Scrap", es: "Chatarra" },
      {
        id: "scrap-recycling",
        en: "Scrap recycling",
        es: "Reciclaje de chatarra",
      },
      { id: "holmium-ore", en: "Holmium ore", es: "Mena de holmio" },
      { id: "holmium-plate", en: "Holmium plate", es: "Placa de holmio" },
      { id: "superconductor", en: "Superconductor", es: "Superconductor" },
      { id: "supercapacitor", en: "Supercapacitor", es: "Supercondensador" },
    ],
    // Fila 10: Procesamientos biológicos de Gleba (Yumako y Gelanuez)
    [
      {
        id: "yumako-processing",
        en: "Yumako processing",
        es: "Procesamiento de Yumako",
      },
      { id: "yumako-seed", en: "Yumako seed", es: "Semilla de Yumako" },
      {
        id: "jellynut-processing",
        en: "Jellynut processing",
        es: "Procesamiento de Gelanuez",
      },
      { id: "jellynut-seed", en: "Jellynut seed", es: "Semilla de Gelanuez" },
      { id: "yumako", en: "Yumako", es: "Yumako" },
      { id: "jellynut", en: "Jellynut", es: "Gelanuez" },
      { id: "iron-bacteria", en: "Iron bacteria", es: "Bacteria del hierro" },
      {
        id: "copper-bacteria",
        en: "Copper bacteria",
        es: "Bacteria del cobre",
      },
    ],
    // Fila 11: Nutrientes, Biomasa y subproductos biológicos
    [
      { id: "spoilage", en: "Spoilage", es: "Desperdicios" },
      { id: "nutrients", en: "Nutrients", es: "Nutrientes" },
      {
        id: "nutrients-from-spoilage",
        en: "Nutrients from spoilage",
        es: "Nutrientes a partir de desperdicios",
      },
      {
        id: "nutrients-from-yumako-mash",
        en: "Nutrients from yumako mash",
        es: "Nutrientes a partir de puré de Yumako",
      },
      {
        id: "nutrients-from-bioflux",
        en: "Nutrients from bioflux",
        es: "Nutrientes a partir de bioflux",
      },
      { id: "bioflux", en: "Bioflux", es: "Bioflux" },
      { id: "yumako-mash", en: "Yumako mash", es: "Puré de Yumako" },
      { id: "jelly", en: "Jelly", es: "Gelatina" },
      {
        id: "rocket-fuel-from-jelly",
        en: "Rocket fuel from jelly",
        es: "Combustible de cohete a partir de gelatina",
      },
    ],
    // Fila 12: Bioquímica avanzada y Cultivos de huevos
    [
      { id: "biolubricant", en: "Biolubricant", es: "Biolubricante" },
      { id: "bioplastic", en: "Bioplastic", es: "Bioplastico" },
      { id: "biosulfur", en: "Biosulfur", es: "Biosulfuro" },
      { id: "carbon-fiber", en: "Carbon fiber", es: "Fibra de carbono" },
      {
        id: "burnt-spoilage",
        en: "Burnt spoilage",
        es: "Desperdicios quemados",
      },
      { id: "biter-egg", en: "Biter egg", es: "Huevo de Mordedor" },
      { id: "pentapod-egg", en: "Pentapod egg", es: "Huevo de Pentápodo" },
      { id: "tree-seed", en: "Tree seed", es: "Semilla de árbol" },
      { id: "fish-breeding", en: "Fish breeding", es: "Cría de pescado" },
      {
        id: "nutrients-from-fish",
        en: "Nutrients from fish",
        es: "Nutrientes a partir de pescado",
      },
      {
        id: "nutrients-from-biter-egg",
        en: "Nutrients from biter egg",
        es: "Nutrientes a partir de huevo de mordedor",
      },
    ],
    // Fila 13: Soluciones criogénicas y Componentes cuánticos/fusión finales (Aquilo)
    [
      {
        id: "ammoniacal-solution-separation",
        en: "Ammoniacal solution separation",
        es: "Separación de solución de amoníaco",
      },
      {
        id: "solid-fuel-from-ammonia",
        en: "Solid fuel from ammonia",
        es: "Combustible sólido a partir de amoníaco",
      },
      {
        id: "ammonia-rocket-fuel",
        en: "Ammonia rocket fuel",
        es: "Combustible de cohete a partir de amoníaco",
      },
      {
        id: "cooling-hot-fluoroketone",
        en: "Cooling hot fluoroketone",
        es: "Enfriamiento de fluorocetona caliente",
      },
      { id: "lithium", en: "Lithium", es: "Litio" },
      { id: "lithium-plate", en: "Lithium plate", es: "Placa de litio" },
      {
        id: "quantum-processor",
        en: "Quantum processor",
        es: "Procesador cuántico",
      },
      {
        id: "fusion-power-cell",
        en: "Fusion power cell",
        es: "Celda de energía de fusión",
      },
    ],
    // Fila 14: Paquetes de Ciencia Fundacionales e Intermedios
    [
      {
        id: "automation-science-pack",
        en: "Automation science pack",
        es: "Paquete de ciencia de automatización",
      },
      {
        id: "logistic-science-pack",
        en: "Logistic science pack",
        es: "Paquete de ciencia logística",
      },
      {
        id: "military-science-pack",
        en: "Military science pack",
        es: "Paquete de ciencia militar",
      },
      {
        id: "chemical-science-pack",
        en: "Chemical science pack",
        es: "Paquete de ciencia química",
      },
      {
        id: "production-science-pack",
        en: "Production science pack",
        es: "Paquete de ciencia de producción",
      },
      {
        id: "utility-science-pack",
        en: "Utility science pack",
        es: "Paquete de ciencia de utilidad",
      },
    ],
    // Fila 15: Paquetes de Ciencia de Expansión Planetarios (Space Age)
    [
      {
        id: "space-science-pack",
        en: "Space science pack",
        es: "Paquete de ciencia espacial",
      },
      {
        id: "metallurgic-science-pack",
        en: "Metallurgic science pack",
        es: "Paquete de ciencia metalúrgica",
      },
      {
        id: "electromagnetic-science-pack",
        en: "Electromagnetic science pack",
        es: "Paquete de ciencia electromagnética",
      },
      {
        id: "agricultural-science-pack",
        en: "Agricultural science pack",
        es: "Paquete de ciencia agrícola",
      },
      {
        id: "cryogenic-science-pack",
        en: "Cryogenic science pack",
        es: "Paquete de ciencia criogénica",
      },
      {
        id: "promethium-science-pack",
        en: "Promethium science pack",
        es: "Paquete de ciencia de prometio",
      },
    ],
  ],
  space: [
    // Fila 1: Silos e Infraestructura de Lanzamiento y Aterrizaje
    [
      { id: "rocket-silo", en: "Rocket silo", es: "Silo de cohete" },
      { id: "rocket-part", en: "Rocket part", es: "Parte del cohete" },
      {
        id: "cargo-landing-pad",
        en: "Cargo landing pad",
        es: "Plataforma de aterrizaje",
      },
      { id: "cargo-pod", en: "Cargo pod", es: "Cápsula de carga" },
    ],
    // Fila 2: Componentes Modulares de Plataforma Espacial
    [
      {
        id: "space-platform-foundation",
        en: "Space platform foundation",
        es: "Cimientos de plataforma espacial",
      },
      {
        id: "space-platform-hub",
        en: "Space platform hub",
        es: "Centro de plataforma espacial",
      },
      { id: "cargo-bay", en: "Cargo bay", es: "Bodega de carga" },
      {
        id: "asteroid-collector",
        en: "Asteroid collector",
        es: "Recolector de asteroides",
      },
      { id: "crusher", en: "Crusher", es: "Trituradora" },
      { id: "thruster", en: "Thruster", es: "Propulsor" },
      { id: "satellite", en: "Satellite", es: "Satélite" },
      {
        id: "space-platform-starter-pack",
        en: "Space platform starter pack",
        es: "Paquete de inicio de plataforma espacial",
      },
    ],
    // Fila 3: Fragmentos crudos de Asteroides
    [
      {
        id: "metallic-asteroid-chunk",
        en: "Metallic asteroid chunk",
        es: "Trozo de asteroide metálico",
      },
      {
        id: "carbonic-asteroid-chunk",
        en: "Carbonic asteroid chunk",
        es: "Trozo de asteroide de carbono",
      },
      {
        id: "oxide-asteroid-chunk",
        en: "Oxide asteroid chunk",
        es: "Trozo de asteroide de óxido",
      },
      {
        id: "promethium-asteroid-chunk",
        en: "Promethium asteroid chunk",
        es: "Trozo de asteroide de prometio",
      },
    ],
    // Fila 4: Procesos Básicos de Trituración y Reprocesamiento de Asteroides
    [
      {
        id: "metallic-asteroid-crushing",
        en: "Metallic asteroid crushing",
        es: "Trituración de asteroide metálico",
      },
      {
        id: "carbonic-asteroid-crushing",
        en: "Carbonic asteroid crushing",
        es: "Trituración de asteroide de carbono",
      },
      {
        id: "oxide-asteroid-crushing",
        en: "Oxide asteroid crushing",
        es: "Trituración de asteroide de óxido",
      },
      {
        id: "metallic-asteroid-reprocessing",
        en: "Metallic asteroid reprocessing",
        es: "Reprocesamiento de asteroide metálico",
      },
      {
        id: "carbonic-asteroid-reprocessing",
        en: "Carbonic asteroid reprocessing",
        es: "Reprocesamiento de asteroide de carbono",
      },
      {
        id: "oxide-asteroid-reprocessing",
        en: "Oxide asteroid reprocessing",
        es: "Reprocesamiento de asteroide de óxido",
      },
    ],
    // Fila 5: Trituración Avanzada y Combustibles de Propulsión Espacial
    [
      {
        id: "advanced-metallic-asteroid-crushing",
        en: "Advanced metallic asteroid crushing",
        es: "Trituración de asteroide metálico avanzada",
      },
      {
        id: "advanced-carbonic-asteroid-crushing",
        en: "Advanced carbonic asteroid crushing",
        es: "Trituración de asteroide de carbono avanzada",
      },
      {
        id: "advanced-oxide-asteroid-crushing",
        en: "Advanced oxide asteroid crushing",
        es: "Trituración de asteroide de óxido avanzada",
      },
      {
        id: "advanced-thruster-fuel",
        en: "Advanced thruster fuel",
        es: "Combustible de impulsores avanzado",
      },
      {
        id: "advanced-thruster-oxidizer",
        en: "Advanced thruster oxidizer",
        es: "Oxidante de impulsores avanzado",
      },
    ],
    // Fila 6: Indicadores de Destinos y Planetas
    [
      { id: "nauvis", en: "Nauvis", es: "Nauvis" },
      { id: "space-platform", en: "Space platform", es: "Plataforma espacial" },
      { id: "vulcanus", en: "Vulcanus", es: "Vulcano" },
      { id: "gleba", en: "Gleba", es: "Gleba" },
      { id: "fulgora", en: "Fulgora", es: "Fulgora" },
      { id: "aquilo", en: "Aquilo", es: "Aquilo" },
      {
        id: "solar-system-edge",
        en: "Solar system edge",
        es: "Borde del sistema solar",
      },
      {
        id: "shattered-planet",
        en: "Shattered planet",
        es: "Planeta destrozado",
      },
    ],
  ],
  combat: [
    // Fila 1: Armas de fuego y Armas avanzadas de mano
    [
      { id: "pistol", en: "Pistol", es: "Pistola" },
      { id: "submachine-gun", en: "Submachine gun", es: "Subfusil" },
      { id: "railgun", en: "Railgun", es: "Railgun" },
      { id: "tesla-gun", en: "Tesla gun", es: "Tesla gun" },
      { id: "shotgun", en: "Shotgun", es: "Escopeta" },
      { id: "combat-shotgun", en: "Combat shotgun", es: "Escopeta de combate" },
      { id: "rocket-launcher", en: "Rocket launcher", es: "Lanzamisiles" },
      { id: "flamethrower", en: "Flamethrower", es: "Lanzallamas" },
    ],
    // Fila 2: Cargadores de munición balística y Cañones
    [
      { id: "firearm-magazine", en: "Firearm magazine", es: "Munición" },
      {
        id: "piercing-rounds-magazine",
        en: "Piercing rounds magazine",
        es: "Munición penetrante",
      },
      {
        id: "uranium-rounds-magazine",
        en: "Uranium rounds magazine",
        es: "Munición de uranio",
      },
      {
        id: "shotgun-shells",
        en: "Shotgun shells",
        es: "Cartuchos de escopeta",
      },
      {
        id: "piercing-shotgun-shells",
        en: "Piercing shotgun shells",
        es: "Cartuchos penetrantes de escopeta",
      },
      { id: "cannon-shell", en: "Cannon shell", es: "Proyectil de cañón" },
      {
        id: "explosive-cannon-shell",
        en: "Explosive cannon shell",
        es: "Proyectil de cañon explosivo",
      },
      {
        id: "uranium-cannon-shell",
        en: "Uranium cannon shell",
        es: "Proyectil de cañón de uranio",
      },
      {
        id: "explosive-uranium-cannon-shell",
        en: "Explosive uranium cannon shell",
        es: "Casquillo explosivo de uranio de cañón",
      },
    ],
    // Fila 3: Misiles, Munición de energía y Artillería
    [
      {
        id: "artillery-shell",
        en: "Artillery shell",
        es: "Proyectil de artillería",
      },
      { id: "rocket", en: "Rocket", es: "Cohete" },
      {
        id: "explosive-rocket",
        en: "Explosive rocket",
        es: "Cohete explosivo",
      },
      { id: "atomic-bomb", en: "Atomic bomb", es: "Bomba atómica" },
      {
        id: "capture-bot-rocket",
        en: "Capture bot rocket",
        es: "Cohete de robot capturador",
      },
      {
        id: "flamethrower-ammo",
        en: "Flamethrower ammo",
        es: "Munición de lanzallamas",
      },
      { id: "railgun-ammo", en: "Railgun ammo", es: "Munición de railgun" },
      { id: "tesla-ammo", en: "Tesla ammo", es: "Munición tesla" },
    ],
    // Fila 4: Explosivos arrojadizos y Cápsulas de Combate de Robots autónomos
    [
      { id: "grenade", en: "Grenade", es: "Granada" },
      { id: "cluster-grenade", en: "Cluster grenade", es: "Granada de racimo" },
      { id: "poison-capsule", en: "Poison capsule", es: "Cápsula de veneno" },
      {
        id: "slowdown-capsule",
        en: "Slowdown capsule",
        es: "Cápsula de ralentizamiento",
      },
      {
        id: "defender-capsule",
        en: "Defender capsule",
        es: "Cápsula de defensor",
      },
      {
        id: "distractor-capsule",
        en: "Distractor capsule",
        es: "Cápsula de distractor",
      },
      {
        id: "destroyer-capsule",
        en: "Destroyer capsule",
        es: "Cápsula de destructor",
      },
    ],
    // Fila 5: Armaduras corporales
    [
      { id: "light-armor", en: "Light armor", es: "Armadura ligera" },
      { id: "heavy-armor", en: "Heavy armor", es: "Armadura pesada" },
      { id: "modular-armor", en: "Modular armor", es: "Armadura modular" },
      { id: "power-armor", en: "Power armor", es: "Nanoarmadura" },
      {
        id: "power-armor-mk2",
        en: "Power armor MK2",
        es: "Servo-armadura MK2",
      },
      { id: "mech-armor", en: "Mech armor", es: "Mecarmadura" },
    ],
    // Fila 6: Equipamiento modular integrado de soporte y energía
    [
      {
        id: "portable-solar-panel",
        en: "Portable solar panel",
        es: "Panel solar portátil",
      },
      {
        id: "portable-fission-reactor",
        en: "Portable fission reactor",
        es: "Reactor de fisión portátil",
      },
      {
        id: "portable-fusion-reactor",
        en: "Portable fusion reactor",
        es: "Reactor de fusión portátil",
      },
      {
        id: "personal-battery",
        en: "Personal battery",
        es: "Batería personal",
      },
      {
        id: "personal-battery-mk2",
        en: "Personal battery MK2",
        es: "Batería personal MK2",
      },
      {
        id: "personal-battery-mk3",
        en: "Personal battery MK3",
        es: "Batería personal MK3",
      },
      {
        id: "belt-immunity-equipment",
        en: "Belt immunity equipment",
        es: "Equioi de inmunidad a las cintas",
      },
      { id: "exoskeleton", en: "Exoskeleton", es: "Exoesqueleto" },
    ],
    // Fila 7: Equipamiento modular ofensivo, Visión y Robopuertos portátiles
    [
      {
        id: "personal-roboport",
        en: "Personal roboport",
        es: "Robopuerto personal",
      },
      {
        id: "personal-roboport-mk2",
        en: "Personal roboport MK2",
        es: "Robopuerto personal MK2",
      },
      { id: "nightvision", en: "Nightvision", es: "Visión nocturna" },
      {
        id: "toolbelt-equipment",
        en: "Toolbelt equipment",
        es: "Cinturón de herramientas",
      },
      { id: "energy-shield", en: "Energy shield", es: "Escudo de energía" },
      {
        id: "energy-shield-mk2",
        en: "Energy shield MK2",
        es: "Escudo de energía MK2",
      },
      {
        id: "personal-laser-defense",
        en: "Personal laser defense",
        es: "Láser de defensa personal",
      },
      {
        id: "discharge-defense",
        en: "Discharge defense",
        es: "Defensa eléctrica",
      },
      {
        id: "discharge-defense-remote",
        en: "Discharge defense remote",
        es: "Control remoto de defensa eléctrica",
      },
    ],
    // Fila 8: Estructuras defensivas estáticas y Controles Remotos de torretas
    [
      { id: "wall", en: "Wall", es: "Muro" },
      { id: "gate", en: "Gate", es: "Puerta" },
      { id: "radar", en: "Radar", es: "Radar" },
      { id: "land-mine", en: "Land mine", es: "Mina" },
      { id: "gun-turret", en: "Gun turret", es: "Torreta" },
      { id: "laser-turret", en: "Laser turret", es: "Torreta láser" },
      {
        id: "flamethrower-turret",
        en: "Flamethrower turret",
        es: "Torreta lanzallamas",
      },
      {
        id: "artillery-turret",
        en: "Artillery turret",
        es: "Torreta de artillería",
      },
      {
        id: "artillery-targeting-remote",
        en: "Artillery targeting remote",
        es: "Control remoto de artillería",
      },
      { id: "rocket-turret", en: "Rocket turret", es: "Torreta de misiles" },
      { id: "tesla-turret", en: "Tesla turret", es: "Torre de Tesla" },
      { id: "railgun-turret", en: "Railgun turret", es: "Torreta de railgun" },
    ],
  ],
  fluids: [
    // Fila 1: Fluidos base e Hidrocarburos tradicionales
    [
      { id: "water", en: "Water", es: "Agua" },
      { id: "steam", en: "Steam", es: "Vapor" },
      { id: "crude-oil", en: "Crude oil", es: "Petróleo crudo" },
      { id: "petroleum-gas", en: "Petroleum gas", es: "Gas de petróleo" },
      { id: "light-oil", en: "Light oil", es: "Petróleo ligero" },
      { id: "heavy-oil", en: "Heavy oil", es: "Petróleo pesado" },
      { id: "lubricant", en: "Lubricant", es: "Lubricante" },
      { id: "sulfuric-acid", en: "Sulfuric acid", es: "Ácido sulfúrico" },
    ],
    // Fila 2: Combustibles líquidos directos de propulsores espaciales
    [
      {
        id: "thruster-fuel",
        en: "Thruster fuel",
        es: "Combustible de propulsor",
      },
      {
        id: "thruster-oxidizer",
        en: "Thruster oxidizer",
        es: "Oxidante de propulsor",
      },
    ],
    // Fila 3: Fluidos planetarios extremos y Soluciones químicas exóticas
    [
      { id: "lava", en: "Lava", es: "Lava" },
      { id: "molten-iron", en: "Molten iron", es: "Hierro fundido" },
      { id: "molten-copper", en: "Molten copper", es: "Cobre fundido" },
      {
        id: "holmium-solution",
        en: "Holmium solution",
        es: "Solución de holmio",
      },
      { id: "electrolyte", en: "Electrolyte", es: "Electrolito" },
      {
        id: "ammoniacal-solution",
        en: "Ammoniacal solution",
        es: "Solución de amoníaco",
      },
      { id: "ammonia", en: "Ammonia", es: "Amoníaco" },
      { id: "fluorine", en: "Fluorine", es: "Flúor" },
      { id: "lithium-brine", en: "Lithium brine", es: "Solucción de litio" },
      { id: "plasma", en: "Plasma", es: "Plasma" },
    ],
  ],
  enemies: [
    // Fila 1: Línea evolutiva de Mordedores
    [
      { id: "small-biter", es: "Mordedor pequeño", en: "Small biter" },
      { id: "medium-biter", es: "Mordedor mediano", en: "Medium biter" },
      { id: "big-biter", es: "Mordedor grande", en: "Big biter" },
      { id: "behemoth-biter", es: "Mordedor behemoth", en: "Behemoth biter" },
    ],
    // Fila 2: Línea evolutiva de Escupidores y Organismos planetarios mayores
    [
      { id: "small-spitter", es: "Escupidor pequeño", en: "Small spitter" },
      { id: "medium-spitter", es: "Escupidor mediano", en: "Medium spitter" },
      { id: "big-spitter", es: "Escupidor grande", en: "Big spitter" },
      {
        id: "behemoth-spitter",
        es: "Escupidor behemoth",
        en: "Behemoth spitter",
      },
      { id: "demolisher", es: "Demoledor", en: "Demolisher" },
      { id: "Stomper", es: "Acechador", en: "Stomper" },
    ],
  ],
  signals: [
    // Fila 1: Señales virtuales lógicas globales
    [
      { id: "signal-everything", es: "Señal todos", en: "Signal everything" },
      {
        id: "signal-anything",
        es: "Señal Cualquiera",
        en: "Signal anything",
      },
      { id: "signal-each", es: "Señal Cada uno", en: "Signal each" },
    ],
    // Fila 2: Señales de caracteres alfabéticos
    [
      { id: "signal-A", es: "Señal A", en: "Signal A" },
      { id: "signal-B", es: "Señal B", en: "Signal B" },
      { id: "signal-C", es: "Señal C", en: "Signal C" },
      { id: "signal-D", es: "Señal D", en: "Signal D" },
      { id: "signal-E", es: "Señal E", en: "Signal E" },
      { id: "signal-F", es: "Señal F", en: "Signal F" },
      { id: "signal-G", es: "Señal G", en: "Signal G" },
      { id: "signal-H", es: "Señal H", en: "Signal H" },
      { id: "signal-I", es: "Señal I", en: "Signal I" },
      { id: "signal-J", es: "Señal J", en: "Signal J" },
      { id: "signal-K", es: "Señal K", en: "Signal K" },
      { id: "signal-L", es: "Señal L", en: "Signal L" },
      { id: "signal-M", es: "Señal M", en: "Signal M" },
      { id: "signal-N", es: "Señal N", en: "Signal N" },
      { id: "signal-O", es: "Señal O", en: "Signal O" },
      { id: "signal-P", es: "Señal P", en: "Signal P" },
      { id: "signal-Q", es: "Señal Q", en: "Signal Q" },
      { id: "signal-R", es: "Señal R", en: "Signal R" },
      { id: "signal-S", es: "Señal S", en: "Signal S" },
      { id: "signal-T", es: "Señal T", en: "Signal T" },
      { id: "signal-U", es: "Señal U", en: "Signal U" },
      { id: "signal-V", es: "Señal V", en: "Signal V" },
      { id: "signal-W", es: "Señal W", en: "Signal W" },
      { id: "signal-X", es: "Señal X", en: "Signal X" },
      { id: "signal-Y", es: "Señal Y", en: "Signal Y" },
      { id: "signal-Z", es: "Señal Z", en: "Signal Z" },
    ],
    // Fila 3: Señales numéricas discretas
    [
      { id: "signal-0", es: "Señal 0", en: "Signal 0" },
      { id: "signal-1", es: "Señal 1", en: "Signal 1" },
      { id: "signal-2", es: "Señal 2", en: "Signal 2" },
      { id: "signal-3", es: "Señal 3", en: "Signal 3" },
      { id: "signal-4", es: "Señal 4", en: "Signal 4" },
      { id: "signal-5", es: "Señal 5", en: "Signal 5" },
      { id: "signal-6", es: "Señal 6", en: "Signal 6" },
      { id: "signal-7", es: "Señal 7", en: "Signal 7" },
      { id: "signal-8", es: "Señal 8", en: "Signal 8" },
      { id: "signal-9", es: "Señal 9", en: "Signal 9" },
    ],
  ],
};
