//  This method is used to calculate HMAC hash of the user ID (using the Refloat "secret key",
//  that you can find in your Refloat dashboard). Remember, to keep your secret key safe and secure.
//  Although you could calculate HMAC hash on the client side, it is recommended to do it on the server instead,
//  in order NOT to expose your secret key to the client (browser).
//  The computed auth HASH is used to authorize the communication between the application and the Refloat servers.
//  You should supply the HMAC hash to your client, in order to send them to the Refloat servers through the SDK
//  by calling `window.refloat.init` method in order to authorize the actions performed on the user subscription object on Stripe.
//  The HMAC hash is verified on Refloat server and used to authorize the actions performed on the user's subscription.
//  The HMAC hash is used to prevent unauthorized access to the user's subscription and to ensure that only the user can perform actions on their subscription.

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
