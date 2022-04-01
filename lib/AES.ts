import { base64Str2ab, str2ab } from "./utils.js";

const AES_CONFIG = {
  name: "AES-CTR",
  iv: "TjBU0kAoEV5wx2n+JaRIPg==",
  length: 128,
};

/*
 CryptoKey转base64(pem)格式
 */
// async function cryptoKey2Base64Key(key: CryptoKey, isPrivate: boolean) {
//   try {
//     const exported = await window.crypto.subtle.exportKey(
//       isPrivate ? "pkcs8" : "spki",
//       key
//     );
//     const exportedAsBase64 = ab2base64Str(exported);
//     const keyType = isPrivate ? "PRIVATE" : "PUBLIC";
//     const pemExported = `-----BEGIN ${keyType} KEY-----\n${exportedAsBase64
//       .replace(/[^\x00-\xff]/g, "$&\x01")
//       .replace(/.{64}\x01?/g, "$&\n")}\n-----END ${keyType} KEY-----`;
//     return pemExported;
//   } catch (error) {
//     console.log(error);
//   }
//   return null;
// }

/*
 base64(pem)格式转CryptoKey
 */
function base64Key2CryptoKey(pem: string, isPrivate: boolean) {
  // fetch the part of the PEM string between header and footer
  const keyType = isPrivate ? "PRIVATE" : "PUBLIC";
  const pemHeader = `-----BEGIN ${keyType} KEY-----\n`;
  const pemFooter = `\n-----END ${keyType} KEY-----`;
  const pemContents = pem.substring(
    pemHeader.length,
    pem.length - pemFooter.length
  );
  // convert from a binary string to an ArrayBuffer
  const binaryDer = base64Str2ab(pemContents);

  return window.crypto.subtle.importKey(
    isPrivate ? "pkcs8" : "spki",
    binaryDer,
    {
      name: "RSA-OAEP",
      hash: { name: "SHA-512" },
    },
    true,
    [isPrivate ? "decrypt" : "encrypt"]
  );
}

export const encrypt = async (key: string, data: any = "") => {
  const privateKey = await base64Key2CryptoKey(key, false);
  return window.crypto.subtle.encrypt(
    {
      name: AES_CONFIG.name,
      counter: str2ab(AES_CONFIG.iv),
      length: AES_CONFIG.length,
    },
    privateKey,
    data
  );
};

export const decrypt = async (key: string, ciphertext: string) => {
  const publicKey = await base64Key2CryptoKey(key, true);
  return window.crypto.subtle.decrypt(
    {
      name: AES_CONFIG.name,
      counter: str2ab(AES_CONFIG.iv),
      length: AES_CONFIG.length,
    },
    publicKey,
    str2ab(ciphertext)
  );
};
