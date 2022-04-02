import { ab2base64Str, base64Str2ab, str2ab, ab2str } from "./utils.js";

const RSA_CONFIG = {
  name: "RSA-OAEP",
  hash: { name: "SHA-512" },
};

export const clientRSAKeyPair: TRSAKeyPair = {
  PRIVATE_KEY:
    "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDVLTa9+5ZGqiaprnbRtUxISDK1NlC3m/ovbVAZ2fYkf4BLSF5iWyDqcQzUmk0lJjb8Tdi3FxydCHzFz6NN58NiW0/oMy8SO7eFNw1GMOismZWGdSAOOxtm7rHPe/2rnYVtlgqZtJzM6pDuNyYDNDwg8AsbUwdKopoKgud18fYg3R+FQ5xXQrLesb79k/beU+Mhg3FCWrcbtqQY80g48XVDa3Fji/AklZvY3FAKF9L7sb7R1mySvm0wStRPCIEMAEaZloza6F2faWw3mlUzd0epKKfsnOVI3/+5Ele+dPzY0iXE8akC/HpmJ/j7LEI3T9Qc7RXzN9eRSkVxRhFJxLLAgMBAAECggEAFp5ndvfA1PaeUZI+8WJpa4//gR1Wr0ScxuG47GVNBCobtL0qJC3CsBhnjN3dKuaOMOHk3QDRf7ts9v5ZEvc+5s1kJjsTmjYD2xmlSky80sk/ynahQdvVnPeskEfe0rzvFaKQ4RAZDJgN/luYx86sHz3SchKR/sqfTmKYB8Yl8S9L61SxnTIxbg9KZXIGtX2tcbn0TIFWUp6dwd2/6mbkKXHswhaj/0A9LW/7TM9JDO8lXLh/xFapgquJaP1NmLMsUwUsDUUoGNGRcBBdQcZUpkht8zDHTk4UNOrZztayQARwRSDOasreHgFoMijEbWNw3+uAvKLqFq0Sbs2s+UtVaQKBgQDnW5iOfeS8aO8jDEC2UkZJnvaZQ8Sg1u6kp4TpG4S+I87kJVBGrLQ9NHaK15qh+glLk9OUJlQp2LN5pd8IGaIyJhhDkwsbTkNZz0wNu83IfjgKheXEgNAOwsvMiwMmiJ7hKZKhOmqIZmLlXhGvccTOcmD887VHbs9rkUu84RGQFwKBgQDYIsTtLq2MrmulZVJ8pJx5jRqrpJl3AYW65xl1Z75F6yDTaHe52uJvh7rqodAHl7eYWf9Xrwgwhvoo7oCI7nmItzKglGUQzP28qcAOJFTno8t6MUDPW+2eZ0WhtWsNqsTvHduzcTX5ub0PCevrn/Ae/De7q54ylNj6rf7p4VuvbQKBgQDANUG+B+tzeD5MQM62ag4I9e7rj/iYo1fqJV5vh7Q1f2xP8IwL20l2m9JsMQk/zonQZ0TdDSbZCTa6NsrfYOR2g12fLleI3PFpeKY3trIVAn+uhmVIZrfzu3QzP75jUhek+rPeDLkbDuzUn91Tg9I8rZvUKuiNKwtZ04E3r0i3CwKBgCPrw2bX9ygGZQWcDVWB1i+tb91PAeJxclRZzDVjBJCCP3ZjSmKtKiz3Fe2g7v4UDQNZEcL06BuIk1LyMJKRb8l1CQj/ILzmFNWiMLUo/KNy6YJpZSgRUzCcYUo66Ivg8dH72GO+UQYsBGvXbko+zp2XtXuPTj+B1X30JQWh2qcRAoGBAMLjMvc5SyCIwADSOVJp/EysTAs6gUmYMGFPPQfYkukt883x7oBPMqIG6+RpdF4w+tFDJQIO+XIoVmlDwNJ558vJkFMW4h97ZkpukbUUxlcSadb7u2yYP/bYSItXqE5z2FmBsV2G0e/33mALY75mlagm1tEVNZY/12KhuuKSxqAB",
  PUBLIC_KEY:
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw1S02vfuWRqomqa520bVMSEgytTZQt5v6L21QGdn2JH+AS0heYlsg6nEM1JpNJSY2/E3YtxccnQh8xc+jTefDYltP6DMvEju3hTcNRjDorJmVhnUgDjsbZu6xz3v9q52FbZYKmbSczOqQ7jcmAzQ8IPALG1MHSqKaCoLndfH2IN0fhUOcV0Ky3rG+/ZP23lPjIYNxQlq3G7akGPNIOPF1Q2txY4vwJJWb2NxQChfS+7G+0dZskr5tMErUTwiBDABGmZaM2uhdn2lsN5pVM3dHqSin7JzlSN//uRJXvnT82NIlxPGpAvx6Zif4+yxCN0/UHO0V8zfXkUpFcUYRScSywIDAQAB",
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
  // const digestbuffer = await crypto.subtle.digest('SHA-256', str2ab(JSON.stringify(data)));
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
export const RSAEncrypt = async (publicKey: string, data: any, ) => {
  const bufferKey = await base64Key2CryptoKey(publicKey, false);
  if (bufferKey !== null) {
    const buffer = await window.crypto.subtle.encrypt(
      {
        name: RSA_CONFIG.name,
      },
      bufferKey,
      str2ab(JSON.stringify(data))
    );
    return ab2base64Str(buffer);
  }
  return "";
};
/*
 解密
 */
export const RSADecrypt = async (privateKey: string, text: string) => {
  const bufferKey = await base64Key2CryptoKey(privateKey, true);
 
  if (privateKey !== null) {
    const buffer = await window.crypto.subtle.decrypt(
      {
        name: RSA_CONFIG.name,
      },
      bufferKey,
      str2ab(window.atob(text))
    );
    return ab2str(buffer);
  }
  return "";
};
