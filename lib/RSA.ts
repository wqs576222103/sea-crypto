import { ab2base64Str, base64Str2ab, str2ab, ab2str } from "./utils.js";

const RSA_CONFIG = {
  name: "RSA-OAEP",
  hash: { name: "SHA-512" },
};

const keyStorage: TkeyStorage = {
  PRIVATE_KEY:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCHQrZ0kuI9midV2Ky08TIdxDbL6wsiQcsApG90SIZhWBCs42lfX8Gvyn7RRBKw9KoYRwshybLbnfLKEb/t9BS0zKtzxnLOL2GAXhSgNWXAV7YMQuiy9ScvpS2uiBL6OA7eP5+qmRtGh41FZs9GbTiYg2AvpZkgvnJsALP3TteRXoujVnq3MKTZpzfcFAiHIdWz9gIhZYfWRnZUamHK3Xyiysk/6QLs3n8nXjDRc2UyOVUmryl4uhNJ8p/Q3AnlXtWpyT3yImq/JS8/L7GRUuDD9EOdlngAlkcDp1gCfclJQcyoTsA6Yc1p0p3NmcbVWeUGZ9O3SsjEW2ckwNpaWDe5AgMBAAECggEAAfZ23VQwUkKFZZqCTxHc70+kl+ruO24G+xhnwaE3yfvUKh4WrlqeXeWrV3AMcWLrgPSu9auOm9874bDGPza2gjUiG8j6a4GGga1b0UNVGahsLNtfsxEZo3hbJFg3Jkhf9tunfntASRK4exRV16jIFHZ7k9VsVmxNDsIn2mPbfvGBv1yCtlsuCiBlZ58faQzitQmuhd+N50OV6M8+3NIwgOKp9VTWqHEWIU9INxaTtoplL3x7u9nkuN9Hn5Y2XQGKulxyVduj549v9/3Wh41GpisQvK4fQxs9erg+bUy+mCUr8k5TFh9WdpJ+gF2dX2LTpodoKH0Up6ZtV2usQ5s9gQKBgQDnrKaKM1rvLqVIJjdECg/ygdkOpwgsNsZCS3Mb0eAJcaZAs7sotMGiVj+c4Qe+QbwnLILqW83ggrBK/YhpL0Nn1nGorFTkEb7yGBv4AzITl2WjSInirjjD4ALvrM6o6s60w/Olp/MMrCenH0aX3ZG+jQu61miFyPfzw5m127F+kQKBgQCVdnuyXi1b8fTfSPetj5B44t3PQdBcv6wI27NBpcvU4005Iz/kGpITWxpmE72KGrkDeiCcs4AZRLOG7ko4NOvamsPhGjNYDa1ukXWR4RdTYWUyTUfSGOR89Wp9/ias6n3WFLy22exOoOA+UsTaLDhkj6/mTH7kTKlxRFh9QJoKqQKBgE3nmuEiP9PqZZ4La84vbAlqbKkmtfLYQHcOlBiozKOgWf2r8qXPksWaJy4D5eyugizSJPvV/zcd+1ZcR0DHqe0DCZlkye8foIwcW1tdB7vaz0zHGcbmOyRy8cnS3HOk8fmLYyUzguGiCnuCYuSyl03ydB1R+Df0ypxoDApBZEBhAoGAePUwWkPZVaXU1LdKqo2bEBoaBFdw9v6vjWOwCJrTAPELWAhs9n+CZGPAU4f6RsAlpui5Z9fk/Y4Z9EL4kdBSZ9IEYDJCByrahrb1fR+7LuGNck4Up7U5hN9gVaLPTfVf7VdO+nQWx/NuR0HYyfArm0alxi12K/DW2DHFo2gawjECgYAIfSyU+9YmqGiRmBb8VGh8lx8SpL0f0iOjTBZnSNPtRUSLMwCnATBvscUsVpYCaUvDVDwsVdvk5XxZ53Kp6UZHyWqTiskI7LT4dioIdbQfuW2gC2KJjMzCOcjAfS+9GyUhhA1Y1mlv5rscqMPNMwOkOJtBIDXZcI5+oIb0DL1FUw==\n-----END PRIVATE KEY-----",
  PUBLIC_KEY:
    "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh0K2dJLiPZonVdistPEyHcQ2y+sLIkHLAKRvdEiGYVgQrONpX1/Br8p+0UQSsPSqGEcLIcmy253yyhG/7fQUtMyrc8Zyzi9hgF4UoDVlwFe2DELosvUnL6UtrogS+jgO3j+fqpkbRoeNRWbPRm04mINgL6WZIL5ybACz907XkV6Lo1Z6tzCk2ac33BQIhyHVs/YCIWWH1kZ2VGphyt18osrJP+kC7N5/J14w0XNlMjlVJq8peLoTSfKf0NwJ5V7Vqck98iJqvyUvPy+xkVLgw/RDnZZ4AJZHA6dYAn3JSUHMqE7AOmHNadKdzZnG1VnlBmfTt0rIxFtnJMDaWlg3uQIDAQAB\n-----END PUBLIC KEY-----",
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
    const keyType = isPrivate ? "PRIVATE" : "PUBLIC";
    const pemExported = `-----BEGIN ${keyType} KEY-----\n${exportedAsBase64
      .replace(/[^\x00-\xff]/g, "$&\x01")
      .replace(/.{64}\x01?/g, "$&\n")}\n-----END ${keyType} KEY-----`;
    return pemExported;
  } catch (error) {
    console.log(error);
  }
  return null;
}

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
      name: RSA_CONFIG.name,
      hash: RSA_CONFIG.hash,
    },
    true,
    [isPrivate ? "decrypt" : "encrypt"]
  );
}

async function savePublicKey(publicKey: CryptoKey) {
  keyStorage.PUBLIC_KEY = await cryptoKey2Base64Key(publicKey, false);
}
async function savePrivateKey(privateKey: CryptoKey) {
  keyStorage.PRIVATE_KEY = await cryptoKey2Base64Key(privateKey, true);
}

async function getCryptoPrivateKey() {
  if (keyStorage.PRIVATE_KEY !== null) {
    return base64Key2CryptoKey(keyStorage.PRIVATE_KEY, true);
  }
  return null;
}
async function getCryptoPublicKey() {
  if (keyStorage.PUBLIC_KEY !== null) {
    return base64Key2CryptoKey(keyStorage.PUBLIC_KEY, false);
  }
  return null;
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
  return keyStorage;
};
/*
 加密
 */
export const encrypt = async (data: any) => {
  if (keyStorage.PUBLIC_KEY === null) {
    console.error(
      "❌ please run generateRSAKey() to generate PUBLIC_KEY before decrypt data "
    );
    return;
  }
  const publicKey = await getCryptoPublicKey();
  if (publicKey !== null) {
    const buffer = await window.crypto.subtle.encrypt(
      {
        name: RSA_CONFIG.name,
      },
      publicKey,
      str2ab(JSON.stringify(data))
    );
    return window.btoa(ab2str(buffer));
  }
  return null;
};
/*
 解密
 */
export const decrypt = async (text: string) => {
  if (keyStorage.PRIVATE_KEY === null) {
    console.error(
      "❌ please run generateRSAKey() to generate PRIVATE_KEY before decrypt data "
    );
    return;
  }
  const privateKey = await getCryptoPrivateKey();
  if (privateKey !== null) {
    const buffer = await window.crypto.subtle.decrypt(
      {
        name: RSA_CONFIG.name,
      },
      privateKey,
      str2ab(window.atob(text))
    );
    return ab2str(buffer);
  }
  return null;
};
