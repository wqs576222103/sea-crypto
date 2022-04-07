// @ts-ignore
import { AESEncrypt, AESDecrypt, generateAESKey } from "./AES.js";
// @ts-ignore
import {
  RSAEncrypt,
  // RSADecrypt,
  // clientRSAKeyPair,
  serverRSAKeyPair,
  generateRSASign,
} from "./RSA.js";
import {
  str2ab,
  abConcatenate,
  ab2base64Str,
  base64Str2ab,
  number2ab,
} from "./utils.js";

export const encrypt = async (data: string) => {
  // 生成签名
  const sign = (await generateRSASign(data)) || "";
  // console.log("sign", sign);
  // 时间戳
  const timestemp = Date.now();
  // console.log("timestemp", timestemp);
  // 组合 时间戳、签名、数据
  const hybridBuffer = abConcatenate(
    number2ab(timestemp),
    base64Str2ab(sign),
    str2ab(data)
  );

  // 生成AESKey
  const AESKey = (await generateAESKey()) || "";
  // const AESKey = 'dFvRuiiKY+srZbgVbU/JFg=='
  // console.log("AESKey", AESKey);
  // 生成Nonce
  const nonce = ab2base64Str(window.crypto.getRandomValues(new Uint8Array(16)));
  // console.log("nonce", nonce);
  // 加密数据
  let encrypt = await AESEncrypt(AESKey, hybridBuffer, nonce);
  // console.log("encrypt", encrypt);
  // 组合 Nonce、加密数据、用公钥加密的AESKey

  const encryptAESKey =
    (await RSAEncrypt(serverRSAKeyPair.PUBLIC_KEY, base64Str2ab(AESKey))) || "";
  // console.log('encryptAESKey', encryptAESKey)

  const result = abConcatenate(
    base64Str2ab(nonce),
    base64Str2ab(encryptAESKey),
    base64Str2ab(encrypt)
  );

  return ab2base64Str(result);
};

export const decrypt = (text: string) => {};
