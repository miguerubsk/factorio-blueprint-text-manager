export async function decompressBlueprintString(base64Str) {
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
