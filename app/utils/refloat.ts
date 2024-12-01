export const createHMAC = async (userId: string, apiKey: string): Promise<string> => {
  const enc = new TextEncoder();
  const algorithm = { name: "HMAC", hash: "SHA-256" };

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(apiKey),
    algorithm,
    false,
    ["sign", "verify"]
  );

  const signature = await crypto.subtle.sign(
    algorithm.name,
    key,
    enc.encode(userId)
  );

  return [...new Uint8Array(signature)]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');
};
