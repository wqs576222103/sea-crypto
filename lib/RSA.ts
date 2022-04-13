import { ab2base64Str, base64Str2ab, str2ab } from "./utils.ts";

const RSA_CONFIG = {
  name: "RSA-OAEP",
  hash: { name: "SHA-256" },
};

export const clientRSAKeyPair: TRSAKeyPair = {
  PRIVATE_KEY:
    "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCHQrZ0kuI9midV2Ky08TIdxDbL6wsiQcsApG90SIZhWBCs42lfX8Gvyn7RRBKw9KoYRwshybLbnfLKEb/t9BS0zKtzxnLOL2GAXhSgNWXAV7YMQuiy9ScvpS2uiBL6OA7eP5+qmRtGh41FZs9GbTiYg2AvpZkgvnJsALP3TteRXoujVnq3MKTZpzfcFAiHIdWz9gIhZYfWRnZUamHK3Xyiysk/6QLs3n8nXjDRc2UyOVUmryl4uhNJ8p/Q3AnlXtWpyT3yImq/JS8/L7GRUuDD9EOdlngAlkcDp1gCfclJQcyoTsA6Yc1p0p3NmcbVWeUGZ9O3SsjEW2ckwNpaWDe5AgMBAAECggEAAfZ23VQwUkKFZZqCTxHc70+kl+ruO24G+xhnwaE3yfvUKh4WrlqeXeWrV3AMcWLrgPSu9auOm9874bDGPza2gjUiG8j6a4GGga1b0UNVGahsLNtfsxEZo3hbJFg3Jkhf9tunfntASRK4exRV16jIFHZ7k9VsVmxNDsIn2mPbfvGBv1yCtlsuCiBlZ58faQzitQmuhd+N50OV6M8+3NIwgOKp9VTWqHEWIU9INxaTtoplL3x7u9nkuN9Hn5Y2XQGKulxyVduj549v9/3Wh41GpisQvK4fQxs9erg+bUy+mCUr8k5TFh9WdpJ+gF2dX2LTpodoKH0Up6ZtV2usQ5s9gQKBgQDnrKaKM1rvLqVIJjdECg/ygdkOpwgsNsZCS3Mb0eAJcaZAs7sotMGiVj+c4Qe+QbwnLILqW83ggrBK/YhpL0Nn1nGorFTkEb7yGBv4AzITl2WjSInirjjD4ALvrM6o6s60w/Olp/MMrCenH0aX3ZG+jQu61miFyPfzw5m127F+kQKBgQCVdnuyXi1b8fTfSPetj5B44t3PQdBcv6wI27NBpcvU4005Iz/kGpITWxpmE72KGrkDeiCcs4AZRLOG7ko4NOvamsPhGjNYDa1ukXWR4RdTYWUyTUfSGOR89Wp9/ias6n3WFLy22exOoOA+UsTaLDhkj6/mTH7kTKlxRFh9QJoKqQKBgE3nmuEiP9PqZZ4La84vbAlqbKkmtfLYQHcOlBiozKOgWf2r8qXPksWaJy4D5eyugizSJPvV/zcd+1ZcR0DHqe0DCZlkye8foIwcW1tdB7vaz0zHGcbmOyRy8cnS3HOk8fmLYyUzguGiCnuCYuSyl03ydB1R+Df0ypxoDApBZEBhAoGAePUwWkPZVaXU1LdKqo2bEBoaBFdw9v6vjWOwCJrTAPELWAhs9n+CZGPAU4f6RsAlpui5Z9fk/Y4Z9EL4kdBSZ9IEYDJCByrahrb1fR+7LuGNck4Up7U5hN9gVaLPTfVf7VdO+nQWx/NuR0HYyfArm0alxi12K/DW2DHFo2gawjECgYAIfSyU+9YmqGiRmBb8VGh8lx8SpL0f0iOjTBZnSNPtRUSLMwCnATBvscUsVpYCaUvDVDwsVdvk5XxZ53Kp6UZHyWqTiskI7LT4dioIdbQfuW2gC2KJjMzCOcjAfS+9GyUhhA1Y1mlv5rscqMPNMwOkOJtBIDXZcI5+oIb0DL1FUw==",
  PUBLIC_KEY:
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh0K2dJLiPZonVdistPEyHcQ2y+sLIkHLAKRvdEiGYVgQrONpX1/Br8p+0UQSsPSqGEcLIcmy253yyhG/7fQUtMyrc8Zyzi9hgF4UoDVlwFe2DELosvUnL6UtrogS+jgO3j+fqpkbRoeNRWbPRm04mINgL6WZIL5ybACz907XkV6Lo1Z6tzCk2ac33BQIhyHVs/YCIWWH1kZ2VGphyt18osrJP+kC7N5/J14w0XNlMjlVJq8peLoTSfKf0NwJ5V7Vqck98iJqvyUvPy+xkVLgw/RDnZZ4AJZHA6dYAn3JSUHMqE7AOmHNadKdzZnG1VnlBmfTt0rIxFtnJMDaWlg3uQIDAQAB",
};

export const serverRSAKeyPair = {
  PUBLIC_KEY:
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh0K2dJLiPZonVdistPEyHcQ2y+sLIkHLAKRvdEiGYVgQrONpX1/Br8p+0UQSsPSqGEcLIcmy253yyhG/7fQUtMyrc8Zyzi9hgF4UoDVlwFe2DELosvUnL6UtrogS+jgO3j+fqpkbRoeNRWbPRm04mINgL6WZIL5ybACz907XkV6Lo1Z6tzCk2ac33BQIhyHVs/YCIWWH1kZ2VGphyt18osrJP+kC7N5/J14w0XNlMjlVJq8peLoTSfKf0NwJ5V7Vqck98iJqvyUvPy+xkVLgw/RDnZZ4AJZHA6dYAn3JSUHMqE7AOmHNadKdzZnG1VnlBmfTt0rIxFtnJMDaWlg3uQIDAQAB",
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
