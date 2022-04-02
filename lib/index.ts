// @ts-ignore
import { AESEncrypt, AESDecrypt, generateAESKey } from "./AES.js";
// @ts-ignore
import { RSAEncrypt, RSADecrypt, RSAKeyPair, generateRSASign } from "./RSA.js";
import { str2ab, abConcatenate, ab2base64Str, base64Str2ab } from "./utils.js";


export const encrypt = async (data: any) => {
  // 生成签名
  const sign = (await generateRSASign(JSON.stringify(data))) || "";
  // 时间戳
  const timestemp = String(new Date().getTime());

  // 组合 时间戳、签名、数据
  const hybridData = abConcatenate(
    str2ab(timestemp),
    base64Str2ab(sign),
    str2ab(data)
  );

  // 生成AESKey
  const AESKey = (await generateAESKey()) || "";
  // 生成Nonce
  const nonce = ab2base64Str(window.crypto.getRandomValues(new Uint8Array(16)));
  // 加密数据
  let encrypt = await AESEncrypt(AESKey, hybridData, nonce);
  // 组合 Nonce、加密数据、用公钥加密的AESKey

  const encryptAESKey = (await RSAEncrypt(AESKey)) || "";

  const result = abConcatenate(
    base64Str2ab(nonce),
    base64Str2ab(encrypt),
    base64Str2ab(encryptAESKey)
  );
  console.log(result);
  return result;
};

export const decrypt = (text: string) => {};
