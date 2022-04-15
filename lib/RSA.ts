import { ab2base64Str, base64Str2ab, str2ab } from "./utils";

const {
  VITE_CLIENT_PRIVATE_KEY,
  VITE_CLIENT_PUBLIC_KEY,
  VITE_SERVER_PUBLIC_KEY,
} = import.meta?.env || {};
const RSA_CONFIG = {
  name: "RSA-OAEP",
  hash: { name: "SHA-256" },
};
// console.log(import.meta.env)

export const clientRSAKeyPair: TRSAKeyPair = {
  PRIVATE_KEY: VITE_CLIENT_PRIVATE_KEY,
  PUBLIC_KEY: VITE_CLIENT_PUBLIC_KEY,
};

export const serverRSAKeyPair = {
  PUBLIC_KEY: VITE_SERVER_PUBLIC_KEY,
};
/**
 * 自定义设置客户端密钥
 * @param clientPrivateKey
 * @param clientPublicKey
 */
export const setClientKeyPair = (
  clientPrivateKey: string,
  clientPublicKey?: string
) => {
  clientRSAKeyPair.PRIVATE_KEY = clientPrivateKey;
  if (clientPublicKey) {
    clientRSAKeyPair.PUBLIC_KEY = clientPublicKey;
  }
};
/**
 * 自定义设置客户端公钥
 * @param serverPublicKey
 */
export const setServerPublicKey = (serverPublicKey: string) => {
  serverRSAKeyPair.PUBLIC_KEY = serverPublicKey;
};

/*
 CryptoKey转base64(pem)格式
 */
async function cryptoKey2Base64Key(key: CryptoKey, isPrivate: boolean) {
  try {
    const exported = await window.crypto.subtle.exportKey(
      isPrivate ? "pkcs8" : "spki",
      key
    );
    const exportedAsBase64 = ab2base64Str(exported);
    return exportedAsBase64;
  } catch (error) {
    console.log(error);
  }
  return null;
}

/*
 base64(pem)格式转CryptoKey
 */
function base64Key2CryptoKey(pem: string, isPrivate: boolean) {
  // convert from a binary string to an ArrayBuffer
  const binaryDer = base64Str2ab(pem);

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
}

async function savePublicKey(publicKey: CryptoKey) {
  clientRSAKeyPair.PUBLIC_KEY = await cryptoKey2Base64Key(publicKey, false);
}
async function savePrivateKey(privateKey: CryptoKey) {
  clientRSAKeyPair.PRIVATE_KEY = await cryptoKey2Base64Key(privateKey, true);
}

/*
 自定义生成密钥对
 */
export const generateRSAKey = async () => {
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
  await savePublicKey(keyPair.publicKey);
  await savePrivateKey(keyPair.privateKey);
  return clientRSAKeyPair;
};

export const base64Key2CryptoSignKey = (
  key: string,
  isPrivate: boolean,
  keyUsages: KeyUsage[]
) => {
  const binaryDer = base64Str2ab(key);
  // @ts-ignore
  return window.crypto.subtle.importKey(
    isPrivate ? "pkcs8" : "spki",
    binaryDer,
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
export const generateRSASign = async (data: string) => {
  const privateKey = await base64Key2CryptoSignKey(
    clientRSAKeyPair.PRIVATE_KEY || "",
    true,
    ["sign"]
  );
  if (privateKey !== null) {
    let buffer = await window.crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      privateKey,
      str2ab(data)
    );
    return ab2base64Str(buffer);
  }
  return null;
};
/**
 * 验证客户端自己生成的签名
 */
export const verifySign = async (sign: string, data: string) => {
  const publicKey = await base64Key2CryptoSignKey(
    clientRSAKeyPair.PUBLIC_KEY || "",
    false,
    ["verify"]
  );
  return window.crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    publicKey,
    base64Str2ab(sign),
    str2ab(data)
  );
};

/*
 加密
 */
export const RSAEncrypt = async (publicKey: string, data: ArrayBuffer) => {
  const bufferKey = await base64Key2CryptoKey(publicKey, false);
  if (bufferKey !== null) {
    const buffer = await window.crypto.subtle.encrypt(
      {
        name: RSA_CONFIG.name,
      },
      bufferKey,
      data
    );
    return ab2base64Str(buffer);
  }
  return "";
};
/*
 解密
 */
export const RSADecrypt = async (privateKey: string, textAb: ArrayBuffer) => {
  const bufferKey = await base64Key2CryptoKey(privateKey, true);

  if (bufferKey !== null) {
    const buffer = await window.crypto.subtle.decrypt(
      {
        name: RSA_CONFIG.name,
      },
      bufferKey,
      textAb
    );
    return buffer;
  }
  return new ArrayBuffer(0);
};
