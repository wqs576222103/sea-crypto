// TODO why is js
import { base64Str2ab, ab2base64Str } from "./utils";

const AES_CONFIG = {
  name: "AES-CTR",
  // iv: "TjBU0kAoEV5wx2n+JaRIPg==", // 改为随机
  length: 128,
};

export async function AESCryptoKey2BufferKey(
  key: CryptoKey
): Promise<ArrayBuffer> {
  return window.crypto.subtle.exportKey("raw", key);
}
export async function AESBufferKey2CryptoKey(
  binaryDer: ArrayBuffer
): Promise<CryptoKey> {
  return window.crypto.subtle.importKey(
    "raw",
    binaryDer,
    AES_CONFIG.name,
    true,
    ["encrypt", "decrypt"]
  );
}

/*
 CryptoKey转base64(pem)格式
 */
export async function AESCryptoKey2Base64Key(key: CryptoKey): Promise<string> {
  try {
    const exported = await AESCryptoKey2BufferKey(key);
    const exportedAsBase64 = ab2base64Str(exported);
    const pemExported = `${exportedAsBase64
      .replace(/[^\x00-\xff]/g, "$&\x01")
      .replace(/.{64}\x01?/g, "$&\n")}`;
    return pemExported;
  } catch (error) {
    console.log(error);
  }
  return "";
}

/*
 base64(pem)格式转CryptoKey
 */
export function AESBase64Key2CryptoKey(pem: string): Promise<CryptoKey> {
  // convert from a binary string to an ArrayBuffer
  const binaryDer = base64Str2ab(pem);

  return AESBufferKey2CryptoKey(binaryDer);
}

/*
 自定义生成密钥对
 */
export const generateAESKey = async (): Promise<CryptoKey> => {
  return window.crypto.subtle.generateKey(
    {
      name: AES_CONFIG.name,
      length: AES_CONFIG.length,
    },
    true,
    ["encrypt", "decrypt"]
  );
};

export const AESEncrypt = async (
  privateKey: CryptoKey,
  data: ArrayBuffer,
  iv: ArrayBuffer
): Promise<ArrayBuffer> => {
  return await window.crypto.subtle.encrypt(
    {
      name: AES_CONFIG.name,
      counter: iv,
      length: AES_CONFIG.length,
    },
    privateKey,
    data
  );
};

export const AESDecrypt = async (
  publicKey: CryptoKey,
  text: ArrayBuffer,
  iv: ArrayBuffer
): Promise<ArrayBuffer> => {
  return await window.crypto.subtle.decrypt(
    {
      name: AES_CONFIG.name,
      counter: iv,
      length: AES_CONFIG.length,
    },
    publicKey,
    text
  );
};
