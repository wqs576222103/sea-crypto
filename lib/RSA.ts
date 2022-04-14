import { ab2base64Str, base64Str2ab, str2ab } from "./utils.ts";

const RSA_CONFIG = {
  name: "RSA-OAEP",
  hash: { name: "SHA-256" },
};

export const clientRSAKeyPair: TRSAKeyPair = {
  PRIVATE_KEY:
    "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCev3EPpZo8zx9S63aZoae7fj8pHBSFyHXIRM7b94SoP6izO4tyhjKGU96MODdTwCyik6V8siyj6GZQM4+Vh9riI2F0U6ufOCaYXT2drjTQp4GlBnQPBJ+coSUFw0tjiJWRSyVIhfIg24feKGljkd9FM5hp/sWpS1xvaCTTHXP5yrTt2UwKZ5qRz3BpZ3+kEiQfdLJqX8CoHzb+bSTO2nViKbIW3s6StJrMSj68UrunNON46lR5JHe9EDfhw9SRpv4IitAuHOAwZ38/RlGwHAiC4J6aYQ3SbxGEsLUywsn0ZclN1R0tvSPSqNZwQiarlplH+fE55449ItUIa+qnyNHdAgMBAAECggEAULAf6IMU3XmtgzkZhEcteVhXBC84ozNb4ppOxnGN5PLObaODYoehYLN6d60POiuAxHXldHcfx4QVlQhQIAH4mF7BZx4sKnag72rdKatlPvUVKWsZTJTeB//EUKSOSh4fX8VhQvaKNnc/HQVPZAO+B2+NNbsAfudGKX420XO0Ai9fQMzvmqcmkXFoMw67uwrPjAO7/92+qk1U2/K7seI6SXqSTcJyDOiS1GaruXey1FiKqV2Ewos5nv9isp0ElIAq435SSFJttSaVgZSW7uNzFFPSapQR8HrleOxLnOeHn3sxNqJIYRq+OgexmQThDSEvU9G0HTu1fw8pXkBC3WF9RQKBgQDfGKJZNtHQmC6GPjt7UunD70VGs5uWI3XX9cdUYBmN80z950MaDgiiIuSPOaIxmQ3PUDBcDQnXdnECSkkWkFyZA6pMIJ7pUUnFraNuT0ZllNYGSYxLzzDrzb4jtI3qojBBctmNa/8rv+9v6bafhbKMIdMO2OR/fYMktbdvMX86XwKBgQC2KTosVm8xREJd+PsSX/h0TTW66466Jz2viJfcVwHLzqSqWK/xDSurdu7DvpOkDcXyMvogBAQ3BLLa3GEGtdMKj0zgzrjTHaPnDGAECVYON1vEeq5AVEivHHJz6UxI8huUjXdoWiFELFjczV4hlrT93vTYx9sgrgUNdsJGtsVVQwKBgQCGmIMiFevB0H6JKTSTs7MrLcj63dNpYl1vfG3U3uGr/XSe3o5iQsM8ppaEPn43NCLbx4JVltwwLNoDSrQLs+7ZthdhNHELTKqYY6jtHVDYalIxmt/UwNy/9vHW8tCIFW/NnK/aHaTmTTb0qukuFuhgmOuP0pUQwbWESUmxAQjEOwKBgHRdR70VBfjZ2u9+4pwtVGCvBdi/KzC9aolcX24w4oPYIJZ1CweYW0IwOnwunM/awI1khSW4ixy+Uqa+yvhnZEZFnl2pkKXENHSfEiLh9+gi8utDV1bewIOkT3S+Hq4mgvnVmOa/VKrhDW8Xfb9FL59RMuXcXZ21rKKaL6bOkKZTAoGASc9Yst39DUihR6oWB/nj/PdubFv+6t6bJ/mH6atkvGCMVR4Uf+qMhmGZaATFTr9B57AueyDQER4y+n43V2MWR1jCxfcJU96dMLZnIkgnHUWpfX68dmy1Qwb6ik1OiBRjCwwFOl4H+rVt8BTRxNQa5XbdyR4iUM9xYh3VQLk2W9U=",
  PUBLIC_KEY:
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnr9xD6WaPM8fUut2maGnu34/KRwUhch1yETO2/eEqD+oszuLcoYyhlPejDg3U8AsopOlfLIso+hmUDOPlYfa4iNhdFOrnzgmmF09na400KeBpQZ0DwSfnKElBcNLY4iVkUslSIXyINuH3ihpY5HfRTOYaf7FqUtcb2gk0x1z+cq07dlMCmeakc9waWd/pBIkH3Syal/AqB82/m0kztp1YimyFt7OkrSazEo+vFK7pzTjeOpUeSR3vRA34cPUkab+CIrQLhzgMGd/P0ZRsBwIguCemmEN0m8RhLC1MsLJ9GXJTdUdLb0j0qjWcEImq5aZR/nxOeeOPSLVCGvqp8jR3QIDAQAB",
};

export const serverRSAKeyPair = {
  PUBLIC_KEY:
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqNry+b+4Y0CRr7vWEhguXMa6KMmV1UjkVOhHFD3VkhQfWyqO2qJi95uFNE1ZgTprnEbh2w1lAY88wAnWGZD8LtR7N+qzoBLfF+/HBPBTVjxSaXZwBkUdCrcK87EzPdPdtvQ1BtsWMB3j5X9cQateQJjOBXEymqnIz980+zjE5rpfDJmB6lhYn/d/2gh8neoRN/6NY4UGtX5RSb4oDMXBhgnQKf2dTEGY0ISDe8GBUUS6YO3ftBVxtcYPmFcX8xM55462V30bIBpFBL/MNAjoOPYWP/uJ1vTEUCwzWDh7HSrlRWkk7ke/O5voKC07X8cyGJ3BSidN+6UXmWCwTMD8IwIDAQAB",
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
 * 验证签名
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
export const RSAEncrypt = async (publicKey: string, data: ArrayBuffer, ) => {
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
