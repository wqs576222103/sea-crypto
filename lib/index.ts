import {
  AESEncrypt,
  AESDecrypt,
  generateAESKey,
  AESCryptoKey2BufferKey,
  AESBufferKey2CryptoKey,
} from "./AES";

import {
  RSAEncrypt,
  generateRSASign,
  RSADecrypt,
  RSABase64Key2CryptoKey,
} from "./RSA";
import {
  str2ab,
  abConcatenate,
  ab2base64Str,
  base64Str2ab,
  number2ab,
  ab2str,
} from "./utils";

export const encryptWithKey = async (
  clientPrivateKey: string,
  serverPublicKey: string,
  data: string
) => {
  // string key转换CryptoKey
  const clientPrivateBufferKey = base64Str2ab(clientPrivateKey);
  const serverPublicCryptoKey = await RSABase64Key2CryptoKey(
    serverPublicKey,
    false
  );
  // 生成签名
  const sign = await generateRSASign(clientPrivateBufferKey, str2ab(data));
  // 时间戳
  const timestemp = Date.now();
  // 组合 时间戳、签名、数据
  const hybridBuffer = abConcatenate(number2ab(timestemp), sign, str2ab(data));

  // 生成会话密钥AESKey
  const AESKey = await generateAESKey();
  // 生成Nonce
  const nonce = window.crypto.getRandomValues(new Uint8Array(16));
  // 加密数据
  let encrypt = await AESEncrypt(AESKey, hybridBuffer, nonce);
  // 用公钥加密的AESKey

  const bufferAESKey = await AESCryptoKey2BufferKey(AESKey);
  const encryptAESKey = await RSAEncrypt(serverPublicCryptoKey, bufferAESKey);
  // console.log('encryptAESKey', encryptAESKey)
  // 组合 Nonce、加密会话密钥、加密数据
  const result = abConcatenate(nonce, encryptAESKey, encrypt);

  return ab2base64Str(result);
};
export const decryptWithKey = async (
  clientPrivateKey: string,
  serverPublicKey: string,
  text: string
) => {
  // string key转换CryptoKey
  const clientPrivateCryptoKey = await RSABase64Key2CryptoKey(
    clientPrivateKey,
    true
  );
  // console.log(serverPublicKey);
  // const serverPublicCryptoKey = await RSABase64Key2CryptoKey(
  //   serverPublicKey,
  //   false
  // );
  // base64转字节码
  const result = base64Str2ab(text);
  // 截取nonce
  const nonce = result.slice(0, 16);
  // 截取用公钥加密的AESKey
  const encryptAESKey = result.slice(16, 16 + 256);
  // 截取加密后的组合数据
  const encrypt = result.slice(16 + 256);

  // 获取AESKey
  const AESKey = await RSADecrypt(clientPrivateCryptoKey, encryptAESKey);
  const cryptoAESKey = await AESBufferKey2CryptoKey(AESKey);
  // 获取解密后的组合数据
  const hybridBuffer = await AESDecrypt(cryptoAESKey, encrypt, nonce);

  // // 截取时间戳 五分钟校验
  // const timestemp = hybridBuffer.slice(0, 8)
  // // 截取签名
  // const sign = hybridBuffer.slice(8, 8 +256)
  // 截取消息体
  const data = hybridBuffer.slice(8 + 256);
  return ab2str(data);
};

const {
  VITE_CLIENT_PRIVATE_KEY,
  // VITE_CLIENT_PUBLIC_KEY,
  VITE_SERVER_PUBLIC_KEY,
} = import.meta.env || {};
// console.log(import.meta.env)
// 给特定系统、不同环境，如电网需求侧提供默认密钥的加解密方法
export const encrypt = async (data: string) => {
  return encryptWithKey(VITE_CLIENT_PRIVATE_KEY, VITE_SERVER_PUBLIC_KEY, data);
};
// 使用配置密钥加解密
export const decrypt = async (text: string) => {
  return decryptWithKey(VITE_CLIENT_PRIVATE_KEY, VITE_SERVER_PUBLIC_KEY, text);
};

export class Crypto {
  private clientPrivateKey: string;
  private serverPublicKey: string;

  constructor(clientPrivateKey: string, serverPublicKey: string) {
    this.clientPrivateKey = clientPrivateKey;
    this.serverPublicKey = serverPublicKey;
  }

  encrypt = (data: string): Promise<string> => {
    return encryptWithKey(this.clientPrivateKey, this.serverPublicKey, data);
  };

  decrypt = (text: string): Promise<string> => {
    return decryptWithKey(this.clientPrivateKey, this.serverPublicKey, text);
  };
}

export * from "./AES";
export * from "./RSA";
export * from "./utils";
