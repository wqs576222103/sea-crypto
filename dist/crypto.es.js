function ab2str(uintArray) {
  var encodedString = String.fromCharCode.apply(null, Array.from(new Uint8Array(uintArray))), decodedString = decodeURIComponent(encodedString);
  return decodedString;
}
function str2ab(string) {
  const str = encodeURIComponent(string), charList = str.split(""), uintArray = [];
  for (let i = 0; i < charList.length; i++) {
    uintArray.push(charList[i].charCodeAt(0));
  }
  return new Uint8Array(uintArray);
}
function ab2base64Str(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
function base64Str2ab(base64String) {
  const rawData = window.atob(base64String);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
const number2ab = (n) => {
  const buf = new BigUint64Array([BigInt(n)]).buffer;
  return buf;
};
const abConcatenate = (...arrays) => {
  let totalLen = 0;
  for (let arr of arrays)
    totalLen += arr.byteLength;
  let res = new Uint8Array(totalLen);
  let offset = 0;
  for (let arr of arrays) {
    let uint8Arr = new Uint8Array(arr);
    res.set(uint8Arr, offset);
    offset += arr.byteLength;
  }
  return res.buffer;
};
const AES_CONFIG = {
  name: "AES-CTR",
  length: 128
};
async function cryptoKey2Base64Key(key) {
  try {
    const exported = await window.crypto.subtle.exportKey("raw", key);
    const exportedAsBase64 = ab2base64Str(exported);
    const pemExported = `${exportedAsBase64.replace(/[^\x00-\xff]/g, "$&").replace(/.{64}\x01?/g, "$&\n")}`;
    return pemExported;
  } catch (error) {
    console.log(error);
  }
  return null;
}
function base64Key2CryptoKey$1(pem) {
  const binaryDer = base64Str2ab(pem);
  return window.crypto.subtle.importKey("raw", binaryDer, AES_CONFIG.name, true, ["encrypt", "decrypt"]);
}
const generateAESKey = async () => {
  let key = await window.crypto.subtle.generateKey({
    name: AES_CONFIG.name,
    length: AES_CONFIG.length
  }, true, ["encrypt", "decrypt"]);
  return cryptoKey2Base64Key(key);
};
const AESEncrypt = async (key, data, iv) => {
  const privateKey = await base64Key2CryptoKey$1(key);
  const buffer = await window.crypto.subtle.encrypt({
    name: AES_CONFIG.name,
    counter: base64Str2ab(iv),
    length: AES_CONFIG.length
  }, privateKey, data);
  return ab2base64Str(buffer);
};
const AESDecrypt = async (key, text, iv) => {
  const publicKey = await base64Key2CryptoKey$1(key);
  const buffer = await window.crypto.subtle.decrypt({
    name: AES_CONFIG.name,
    counter: base64Str2ab(iv),
    length: AES_CONFIG.length
  }, publicKey, base64Str2ab(text));
  return buffer;
};
const RSA_CONFIG = {
  name: "RSA-OAEP",
  hash: { name: "SHA-256" }
};
const clientRSAKeyPair = {
  PRIVATE_KEY: "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCHQrZ0kuI9midV2Ky08TIdxDbL6wsiQcsApG90SIZhWBCs42lfX8Gvyn7RRBKw9KoYRwshybLbnfLKEb/t9BS0zKtzxnLOL2GAXhSgNWXAV7YMQuiy9ScvpS2uiBL6OA7eP5+qmRtGh41FZs9GbTiYg2AvpZkgvnJsALP3TteRXoujVnq3MKTZpzfcFAiHIdWz9gIhZYfWRnZUamHK3Xyiysk/6QLs3n8nXjDRc2UyOVUmryl4uhNJ8p/Q3AnlXtWpyT3yImq/JS8/L7GRUuDD9EOdlngAlkcDp1gCfclJQcyoTsA6Yc1p0p3NmcbVWeUGZ9O3SsjEW2ckwNpaWDe5AgMBAAECggEAAfZ23VQwUkKFZZqCTxHc70+kl+ruO24G+xhnwaE3yfvUKh4WrlqeXeWrV3AMcWLrgPSu9auOm9874bDGPza2gjUiG8j6a4GGga1b0UNVGahsLNtfsxEZo3hbJFg3Jkhf9tunfntASRK4exRV16jIFHZ7k9VsVmxNDsIn2mPbfvGBv1yCtlsuCiBlZ58faQzitQmuhd+N50OV6M8+3NIwgOKp9VTWqHEWIU9INxaTtoplL3x7u9nkuN9Hn5Y2XQGKulxyVduj549v9/3Wh41GpisQvK4fQxs9erg+bUy+mCUr8k5TFh9WdpJ+gF2dX2LTpodoKH0Up6ZtV2usQ5s9gQKBgQDnrKaKM1rvLqVIJjdECg/ygdkOpwgsNsZCS3Mb0eAJcaZAs7sotMGiVj+c4Qe+QbwnLILqW83ggrBK/YhpL0Nn1nGorFTkEb7yGBv4AzITl2WjSInirjjD4ALvrM6o6s60w/Olp/MMrCenH0aX3ZG+jQu61miFyPfzw5m127F+kQKBgQCVdnuyXi1b8fTfSPetj5B44t3PQdBcv6wI27NBpcvU4005Iz/kGpITWxpmE72KGrkDeiCcs4AZRLOG7ko4NOvamsPhGjNYDa1ukXWR4RdTYWUyTUfSGOR89Wp9/ias6n3WFLy22exOoOA+UsTaLDhkj6/mTH7kTKlxRFh9QJoKqQKBgE3nmuEiP9PqZZ4La84vbAlqbKkmtfLYQHcOlBiozKOgWf2r8qXPksWaJy4D5eyugizSJPvV/zcd+1ZcR0DHqe0DCZlkye8foIwcW1tdB7vaz0zHGcbmOyRy8cnS3HOk8fmLYyUzguGiCnuCYuSyl03ydB1R+Df0ypxoDApBZEBhAoGAePUwWkPZVaXU1LdKqo2bEBoaBFdw9v6vjWOwCJrTAPELWAhs9n+CZGPAU4f6RsAlpui5Z9fk/Y4Z9EL4kdBSZ9IEYDJCByrahrb1fR+7LuGNck4Up7U5hN9gVaLPTfVf7VdO+nQWx/NuR0HYyfArm0alxi12K/DW2DHFo2gawjECgYAIfSyU+9YmqGiRmBb8VGh8lx8SpL0f0iOjTBZnSNPtRUSLMwCnATBvscUsVpYCaUvDVDwsVdvk5XxZ53Kp6UZHyWqTiskI7LT4dioIdbQfuW2gC2KJjMzCOcjAfS+9GyUhhA1Y1mlv5rscqMPNMwOkOJtBIDXZcI5+oIb0DL1FUw==",
  PUBLIC_KEY: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh0K2dJLiPZonVdistPEyHcQ2y+sLIkHLAKRvdEiGYVgQrONpX1/Br8p+0UQSsPSqGEcLIcmy253yyhG/7fQUtMyrc8Zyzi9hgF4UoDVlwFe2DELosvUnL6UtrogS+jgO3j+fqpkbRoeNRWbPRm04mINgL6WZIL5ybACz907XkV6Lo1Z6tzCk2ac33BQIhyHVs/YCIWWH1kZ2VGphyt18osrJP+kC7N5/J14w0XNlMjlVJq8peLoTSfKf0NwJ5V7Vqck98iJqvyUvPy+xkVLgw/RDnZZ4AJZHA6dYAn3JSUHMqE7AOmHNadKdzZnG1VnlBmfTt0rIxFtnJMDaWlg3uQIDAQAB"
};
const serverRSAKeyPair = {
  PUBLIC_KEY: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh0K2dJLiPZonVdistPEyHcQ2y+sLIkHLAKRvdEiGYVgQrONpX1/Br8p+0UQSsPSqGEcLIcmy253yyhG/7fQUtMyrc8Zyzi9hgF4UoDVlwFe2DELosvUnL6UtrogS+jgO3j+fqpkbRoeNRWbPRm04mINgL6WZIL5ybACz907XkV6Lo1Z6tzCk2ac33BQIhyHVs/YCIWWH1kZ2VGphyt18osrJP+kC7N5/J14w0XNlMjlVJq8peLoTSfKf0NwJ5V7Vqck98iJqvyUvPy+xkVLgw/RDnZZ4AJZHA6dYAn3JSUHMqE7AOmHNadKdzZnG1VnlBmfTt0rIxFtnJMDaWlg3uQIDAQAB"
};
function base64Key2CryptoKey(pem, isPrivate) {
  const binaryDer = base64Str2ab(pem);
  return window.crypto.subtle.importKey(isPrivate ? "pkcs8" : "spki", binaryDer, {
    name: RSA_CONFIG.name,
    hash: RSA_CONFIG.hash
  }, true, [isPrivate ? "decrypt" : "encrypt"]);
}
const base64Key2CryptoSignKey = (key, isPrivate, keyUsages) => {
  const binaryDer = base64Str2ab(key);
  return window.crypto.subtle.importKey(isPrivate ? "pkcs8" : "spki", binaryDer, {
    name: "RSASSA-PKCS1-v1_5",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256"
  }, true, keyUsages);
};
const generateRSASign = async (data) => {
  const privateKey = await base64Key2CryptoSignKey(clientRSAKeyPair.PRIVATE_KEY, true, ["sign"]);
  if (privateKey !== null) {
    let buffer = await window.crypto.subtle.sign("RSASSA-PKCS1-v1_5", privateKey, str2ab(data));
    return ab2base64Str(buffer);
  }
  return null;
};
const RSAEncrypt = async (publicKey, data) => {
  const bufferKey = await base64Key2CryptoKey(publicKey, false);
  if (bufferKey !== null) {
    const buffer = await window.crypto.subtle.encrypt({
      name: RSA_CONFIG.name
    }, bufferKey, data);
    return ab2base64Str(buffer);
  }
  return "";
};
const RSADecrypt = async (privateKey, textAb) => {
  const bufferKey = await base64Key2CryptoKey(privateKey, true);
  if (bufferKey !== null) {
    const buffer = await window.crypto.subtle.decrypt({
      name: RSA_CONFIG.name
    }, bufferKey, textAb);
    return buffer;
  }
  return new ArrayBuffer(0);
};
const encrypt = async (data) => {
  const sign = await generateRSASign(data) || "";
  const timestemp = Date.now();
  const hybridBuffer = abConcatenate(number2ab(timestemp), base64Str2ab(sign), str2ab(data));
  const AESKey = await generateAESKey() || "";
  const nonce = ab2base64Str(window.crypto.getRandomValues(new Uint8Array(16)));
  let encrypt2 = await AESEncrypt(AESKey, hybridBuffer, nonce);
  const encryptAESKey = await RSAEncrypt(serverRSAKeyPair.PUBLIC_KEY, base64Str2ab(AESKey)) || "";
  const result = abConcatenate(base64Str2ab(nonce), base64Str2ab(encryptAESKey), base64Str2ab(encrypt2));
  return ab2base64Str(result);
};
const decrypt = async (text) => {
  const result = base64Str2ab(text);
  const nonce = result.slice(0, 16);
  const encryptAESKey = result.slice(16, 16 + 256);
  const encrypt2 = result.slice(16 + 256);
  const AESKey = await RSADecrypt(clientRSAKeyPair.PRIVATE_KEY, encryptAESKey);
  const hybridBuffer = await AESDecrypt(ab2base64Str(AESKey), ab2base64Str(encrypt2), ab2base64Str(nonce));
  const data = hybridBuffer.slice(8 + 256);
  return ab2str(data);
};
export { decrypt, encrypt };
//# sourceMappingURL=crypto.es.js.map
