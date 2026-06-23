export async function decompressBlueprintString(blueprintString) {
  // Factorio antepone siempre un byte de versión (actualmente "0") al
  // blob base64 real, simétrico al que compressBlueprintJson añade al
  // exportar. Lo quitamos aquí -sin condicionarlo a que sea "0", ya que
  // "0" es tambien un caracter base64 valido y podria aparecer de forma
  // legítima como primer caracter del payload real- para que el
  // contrato de esta función sea "recibe el blueprint string completo
  // tal cual lo pega el usuario", no "recibe el payload ya pelado".
  const base64Str = blueprintString.slice(1);
  const bytes = Uint8Array.from(atob(base64Str), (c) => c.charCodeAt(0));
  const stream = new Response(bytes).body.pipeThrough(
    new DecompressionStream("deflate"),
  );
  const text = await new Response(stream).text();
  return JSON.parse(text);
}

export async function compressBlueprintJson(jsonObj) {
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
