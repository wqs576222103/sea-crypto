import { ab2base64Str, base64Str2ab } from "./utils";

const RSA_CONFIG = {
  name: "RSA-OAEP",
  hash: { name: "SHA-256" },
};
export const RSACryptoKey2BufferKey = async (
  key: CryptoKey,
  isPrivate: boolean
) => {
  return window.crypto.subtle.exportKey(isPrivate ? "pkcs8" : "spki", key);
};
/*
 CryptoKey转base64(pem)格式
 */
export async function RSACryptoKey2Base64Key(
  key: CryptoKey,
  isPrivate: boolean
): Promise<string> {
  try {
    const exported = await RSACryptoKey2BufferKey(key, isPrivate);
    const exportedAsBase64 = ab2base64Str(exported);
    return exportedAsBase64;
  } catch (error) {
    console.log(error);
  }
  return "";
}

export const RSABufferKeyCryptoKey = async (
  binaryDer: ArrayBuffer,
  isPrivate: boolean
) => {
  return window.crypto.subtle.importKey(
    isPrivate ? "pkcs8" : "spki",
    binaryDer,
    {
      name: RSA_CONFIG.name,
      hash: RSA_CONFIG.hash,
    },
    true,
    [isPrivate ? "decrypt" : "encrypt"]
  );
};
/*
 base64(pem)格式转CryptoKey
 */
export function RSABase64Key2CryptoKey(
  pem: string,
  isPrivate: boolean
): Promise<CryptoKey> {
  // convert from a binary string to an ArrayBuffer
  const binaryDer = base64Str2ab(pem);

  return RSABufferKeyCryptoKey(binaryDer, isPrivate);
}

/*
 自定义生成密钥对
 */
export const generateRSAKey = async (): Promise<TRSAKeyPair> => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: RSA_CONFIG.name,
      // Consider using a 4096-bit key for systems that require long-term security
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: RSA_CONFIG.hash,
    },
    true,
    ["encrypt", "decrypt"]
  );
  const PUBLIC_KEY = await RSACryptoKey2Base64Key(keyPair.publicKey, false);
  const PRIVATE_KEY = await RSACryptoKey2Base64Key(keyPair.privateKey, true);
  return {
    PUBLIC_KEY,
    PRIVATE_KEY,
  };
};

export const RSACryptoKey2SignKey = (
  key: ArrayBuffer,
  isPrivate: boolean,
  keyUsages: KeyUsage[]
): Promise<CryptoKey> => {
  // @ts-ignore
  return window.crypto.subtle.importKey(
    isPrivate ? "pkcs8" : "spki",
    key,
    {
      name: "RSASSA-PKCS1-v1_5",
      // Consider using a 4096-bit key for systems that require long-term security
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    keyUsages
  );
};

/*
 生成签名
 */
export const generateRSASign = async (
  privateKey: ArrayBuffer,
  data: ArrayBuffer
): Promise<ArrayBuffer> => {
  const signKey = await RSACryptoKey2SignKey(privateKey, true, ["sign"]);
  return window.crypto.subtle.sign("RSASSA-PKCS1-v1_5", signKey, data);
};
/**
 * 验证客户端自己生成的签名
 */
export const verifySign = async (
  publicKey: ArrayBuffer,
  sign: ArrayBuffer,
  data: ArrayBuffer
): Promise<boolean> => {
  const signKey = await RSACryptoKey2SignKey(publicKey || "", false, [
    "verify",
  ]);
  return window.crypto.subtle.verify("RSASSA-PKCS1-v1_5", signKey, sign, data);
};

/*
 加密
 */
export const RSAEncrypt = (
  publicKey: CryptoKey,
  data: ArrayBuffer
): Promise<ArrayBuffer> => {
  return window.crypto.subtle.encrypt(
    {
      name: RSA_CONFIG.name,
    },
    publicKey,
    data
  );
};
/*
 解密
 */
export const RSADecrypt = async (
  privateKey: CryptoKey,
  text: ArrayBuffer
): Promise<ArrayBuffer> => {
  return window.crypto.subtle.decrypt(
    {
      name: RSA_CONFIG.name,
    },
    privateKey,
    text
  );
};
