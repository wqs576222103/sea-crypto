
import { AESEncrypt, AESDecrypt, generateAESKey } from "./AES.ts";

import {
  RSAEncrypt,
  clientRSAKeyPair,
  serverRSAKeyPair,
  generateRSASign,
  RSADecrypt,
} from "./RSA.ts";
import {
  str2ab,
  abConcatenate,
  ab2base64Str,
  base64Str2ab,
  number2ab,
  ab2str,
} from "./utils.ts";

const encrypt = async (data: string) => {
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

  // 生成会话密钥AESKey
  const AESKey = (await generateAESKey()) || "";
  // const AESKey = 'dFvRuiiKY+srZbgVbU/JFg=='
  // console.log("AESKey", AESKey);
  // 生成Nonce
  const nonce = ab2base64Str(window.crypto.getRandomValues(new Uint8Array(16)));
  // console.log("nonce", nonce);
  // 加密数据
  let encrypt = await AESEncrypt(AESKey, hybridBuffer, nonce);
  // console.log("encrypt", encrypt);
  // 用公钥加密的AESKey
  const encryptAESKey =
    (await RSAEncrypt(serverRSAKeyPair.PUBLIC_KEY, base64Str2ab(AESKey))) || "";
  // console.log('encryptAESKey', encryptAESKey)
  // 组合 Nonce、加密会话密钥、加密数据
  const result = abConcatenate(
    base64Str2ab(nonce),
    base64Str2ab(encryptAESKey),
    base64Str2ab(encrypt)
  );

  return ab2base64Str(result);
};

 const decrypt = async (text: string) => {
  
  // base64转字节码
  const result = base64Str2ab(text);
  // 截取nonce
  const nonce = result.slice(0, 16);
  // 截取用公钥加密的AESKey
  const encryptAESKey = result.slice(16, 16 + 256);
  // 截取加密后的组合数据
  const encrypt = result.slice(16 + 256);

  // 获取AESKey
  const AESKey = await RSADecrypt(
    clientRSAKeyPair.PRIVATE_KEY || "",
    encryptAESKey
  );

  // 获取解密后的组合数据
  const hybridBuffer = await AESDecrypt(
    ab2base64Str(AESKey),
    ab2base64Str(encrypt),
    ab2base64Str(nonce)
  );

  // // 截取时间戳 五分钟校验
  // const timestemp = hybridBuffer.slice(0, 8)
  // // 截取签名
  // const sign = hybridBuffer.slice(8, 8 +256)
  // 截取消息体
  const data = hybridBuffer.slice(8 + 256);
  return ab2str(data);
};

export {encrypt, decrypt,RSAEncrypt, RSADecrypt, AESEncrypt, AESDecrypt}