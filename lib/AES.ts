// TODO why is js
import { base64Str2ab, ab2base64Str, str2ab, ab2str } from "./utils.js";

const AES_CONFIG = {
  name: "AES-CTR",
  iv: "TjBU0kAoEV5wx2n+JaRIPg==", // TODO 改为随机
  length: 128,
};

/*
 CryptoKey转base64(pem)格式
 */
async function cryptoKey2Base64Key(key: CryptoKey) {
  try {
    const exported = await window.crypto.subtle.exportKey("raw", key);
    const exportedAsBase64 = ab2base64Str(exported);
    const pemExported = `${exportedAsBase64
      .replace(/[^\x00-\xff]/g, "$&\x01")
      .replace(/.{64}\x01?/g, "$&\n")}`;
    return pemExported;
  } catch (error) {
    console.log(error);
  }
  return null;
}

/*
 base64(pem)格式转CryptoKey
 */
function base64Key2CryptoKey(pem: string) {
  // convert from a binary string to an ArrayBuffer
  const binaryDer = base64Str2ab(pem);

  return window.crypto.subtle.importKey(
    "raw",
    binaryDer,
    AES_CONFIG.name,
    true,
    ["encrypt", "decrypt"]
  );
}

/*
 自定义生成密钥对
 */
export const generateAESKey = async () => {
  let key = await window.crypto.subtle.generateKey(
    {
      name: AES_CONFIG.name,
      length: AES_CONFIG.length,
    },
    true,
    ["encrypt", "decrypt"]
  );
  return cryptoKey2Base64Key(key);
  // const rawKey = window.crypto.getRandomValues(new Uint8Array(16));
  // return ab2base64Str(rawKey)
};

export const AESEncrypt = async (key: any, data: any = "", iv: string) => {
  const privateKey = await base64Key2CryptoKey(key);
  const buffer = await window.crypto.subtle.encrypt(
    {
      name: AES_CONFIG.name,
      counter: base64Str2ab(iv),
      length: AES_CONFIG.length,
    },
    privateKey,
    str2ab(JSON.stringify(data))
  );
  return ab2base64Str(buffer);
};

export const AESDecrypt = async (key: string, text: string, iv: string) => {
  const publicKey = await base64Key2CryptoKey(key);
  const buffer = await window.crypto.subtle.decrypt(
    {
      name: AES_CONFIG.name,
      counter: base64Str2ab(iv),
      length: AES_CONFIG.length,
    },
    publicKey,
    str2ab(window.atob(text))
  );
  return ab2str(buffer);
};
