import {
  Crypto,
  encryptWithKey,
  decryptWithKey,
  generateAESKey,
  AESEncrypt,
  AESDecrypt,
  RSAEncrypt,
  RSADecrypt,
  generateRSAKey,
  RSABase64Key2CryptoKey,
  str2ab,
  ab2str,
} from "../dist/crypto.es";
import { Crypto as Webcrypto} from "@peculiar/webcrypto";
const { JSDOM } = require("jsdom");

const KeyPair = {
  PRIVATE_KEY:
    "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDazaTyppG1Hep+pi6bF5DXyG6VzxopKI31MnYlZVG7f08UF5yY/dE1NYs325VerACupzrD8nmVjRRGwfTuYBGoCP/FQ7fIIo6n3b3M/RoEj88p+pYf7eqMcridWRbW9gwUlJb2Q11Rlq5//A45p3CFGqx5KaP8A6JMnE/1lkVHx6L2bGpIC5U2+wJ+MPTElgltVomr0Nx1rmm/1Dlj4UMddzIvhUVPruNlqFOICYzLIbDXl7GyE5NUu5Lq93sJKXWO00tj7/wakIO5oiiTfcdZ6ImM+k8S5kTaSuEd0MRNapu6KB+w+i5HijAhYk0HTnu+A9EV3tTB9wI9BT3pfoaHAgMBAAECggEAVKJS+WEg31PxDogtYuRcrHrk+6GeVulO79dTB+gHE2WNKxJvCmazc8eAUFzpjDMwGF6rRnwWN5jYjP4dRc93RO4mMSGehxWG5LvK3O3SEI2n7m71fuhCX41Ih+ScBw4pYhSPyDYKdLK6UNsojXiM9493w24t9h9ZuhSEgVRc/AQvTTPC7SznWTcm2Tff5aXad6G+U8FAxkr5BNBkYgPw5GhULFUg845pgclpcv3jbCoqDtu1QMPQkLcMpw2TCjDaSeD3VKdwgGFT64amNjtWuW8ecdW564WBX3iyFbiOcqo+TsV9SqVP4qaGs9PkVUsDLqq+zTdgiwHqGatnoOV7AQKBgQD6Tz82Jw5/ZWlaWSizUtuOEO6kTsG9i5lOZ275xF3aYopuM32yGqHkVpdiGb8EpyOGUNqniZV5i/IaypZzjIOJybGkXqW8ZyOJ3J4swDsFaVXXwqxNQVK/BwHdbSest4KY0l1bLfOsWdD42MusDeI5IWND2zDeBKf853YwrshQwQKBgQDfxwl+XUyd3bPUdCM1K02eGvwft+kVgc6BFLhy9dpuCd0RApSenJvChpWLsXlN7n6ZHbcUkz6RJQgbdeRPc7jXSFxF1dvwppT71YRCTgEBg0mPv47c59wP7Jd3CEUIhrsvEQlwY5J9PkQUGKyuvKLEizzxuycCIHj1laZOSBdhRwKBgE9hsnpKCJ7+Wlr8y5uTO23ikMwq7eZez0++HcO4Mst/VMd+LO6+43i2vWuvHpUrLGj8W1umlnDloPI+LViXx197R4sJOSZ2zx55iPBIRm+A6Gh0pJAbl1JdtomyhFKSICi3DkRMXmraURuaJX17KbNUk1aBvQ2sDFp4TVNDGuQBAoGBAKkObi6n/6TYA+6CGsMlRssmKckwoIdd/ItqAvren7k3/GnIYEz/lXC9Sicx2am1frDgURrbLo5qwpg0VVps23zQrt0XdsR0pOMoaHXLBlmFPMK7fguHoqnpHHiRp82MM8eYAGCG6PlzW+0uwu5zligT5OPedtbVf2xRNUW4kukrAoGBALp3sXXGzDbw5phgWNEynxr5FBVJNZAWQTKmr2AAdv9S95LyWkc0ZPmo1kKvK57DS6C/JGHkA0N9zfM874Gcww5+ckEubXGA0UvpWk8SMwY07/BX3FOJMY86TqY1zI5KBRQE5isKptfWJ5Q/l2nrotXt3mLjnO8p00xP3xJCtZ4Q",
  PUBLIC_KEY: `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2s2k8qaRtR3qfqYumxeQ18hulc8aKSiN9TJ2JWVRu39PFBecmP3RNTWLN9uVXqwArqc6w/J5lY0URsH07mARqAj/xUO3yCKOp929zP0aBI/PKfqWH+3qjHK4nVkW1vYMFJSW9kNdUZauf/wOOadwhRqseSmj/AOiTJxP9ZZFR8ei9mxqSAuVNvsCfjD0xJYJbVaJq9Dcda5pv9Q5Y+FDHXcyL4VFT67jZahTiAmMyyGw15exshOTVLuS6vd7CSl1jtNLY+/8GpCDuaIok33HWeiJjPpPEuZE2krhHdDETWqbuigfsPouR4owIWJNB057vgPRFd7UwfcCPQU96X6GhwIDAQAB`,
};
const clientPrivateKey = KeyPair.PRIVATE_KEY;
const serverPublicKey =
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2s2k8qaRtR3qfqYumxeQ18hulc8aKSiN9TJ2JWVRu39PFBecmP3RNTWLN9uVXqwArqc6w/J5lY0URsH07mARqAj/xUO3yCKOp929zP0aBI/PKfqWH+3qjHK4nVkW1vYMFJSW9kNdUZauf/wOOadwhRqseSmj/AOiTJxP9ZZFR8ei9mxqSAuVNvsCfjD0xJYJbVaJq9Dcda5pv9Q5Y+FDHXcyL4VFT67jZahTiAmMyyGw15exshOTVLuS6vd7CSl1jtNLY+/8GpCDuaIok33HWeiJjPpPEuZE2krhHdDETWqbuigfsPouR4owIWJNB057vgPRFd7UwfcCPQU96X6GhwIDAQAB";

test("client encryptWithKey/decryptWithKey Test", async () => {
  const dom = new JSDOM(``);
  global.window = dom.window;
  global.window.crypto = new Webcrypto();
  const data = "1111111";
  const encryptText = await encryptWithKey(
    KeyPair.PRIVATE_KEY,
    KeyPair.PUBLIC_KEY,
    data
  );
  const decryptText = await decryptWithKey(
    KeyPair.PRIVATE_KEY,
    KeyPair.PUBLIC_KEY,
    encryptText
  );
  expect(data).toBe(decryptText);
});
// 自生成key，测试加解密
test("client generateRSAKey encryptWithKey/decryptWithKey Test", async () => {
  const dom = new JSDOM(``);
  global.window = dom.window;
  global.window.crypto = new Webcrypto();
  const KeyPair1 = await generateRSAKey()
  console.log(KeyPair1)
  const data = "1111111";
  const encryptText = await encryptWithKey(
    KeyPair1.PRIVATE_KEY,
    KeyPair1.PUBLIC_KEY,
    data
  );
  const decryptText = await decryptWithKey(
    KeyPair1.PRIVATE_KEY,
    KeyPair1.PUBLIC_KEY,
    encryptText
  );
  expect(data).toBe(decryptText);
});

test("client-server encrypt/decrypt Test", async () => {
  const dom = new JSDOM(``);
  global.window = dom.window;
  global.window.crypto = new Webcrypto();
  const crypto = new Crypto(clientPrivateKey, serverPublicKey);
  await crypto.encrypt("1111111");
  await crypto.decrypt(
    `F5NlJSz/UWKw7Wvwl7PKDhXUV9dbKqxJSKhWQiXpnKtUbNFoCD4eK941q0UuS1qtBk/Bbfbqtb2JvtMK/BmWLyDnmNGnlgYaUnXJ9gMJCLkHW3Wxc+5PIa5CWoL6H556+Csj/K268SdfettRbNEjpOpmUGlmtRe4rs4x8eItSPxnlFBp23ekkaHX+NpXo/c2padOPSdaLpRuHVJhfPq0RqxcSFDB75AkBnxq+AHfJJKlFqS2GIO8bpiN9EUSOVpWC2uhO7mxx//L2j/11A26GFmWWa4fUBfoK/80SLmMe6iTgWfiPKQlTkk7+hYHLq/xnfjygJ8fMMmNXXm7ci4CDLMWxVnTXzIfAEBeSe0hB9Cufrt/iDTH32q310EHm5HydRME4qvPQhdaJu1fOFemxVbKHGjYzRQBqFLItEJlJvhsuJDEUQioKN1i7gFoGR+28tzw0NW9HK5JmcYf5RWRZhedDo5NdpkpF1FG6xhGdyysyaPWo9Glrgeh2PZvWozNfjyPssv2GSmgg//RycPmoN02M05h7Lq8f1Hx+XeodhtDjL3vWgjHAalgqJDfZ1WoGUHRZyDL6ZF3y87ycXIW6k/U88DdVnL1+GAh9FyzE8I2uRwDPlFxSRfftcdZDNgHk6BL+mJJehgs1kRLfp+wMSEIW/5pqkmyisLhtB3rQNflRHDIj/gu/mqZw/OXICrzPlg0TMvIZb62bqyjDOA7jYyIGy9shDeGge+f0iDZqgXEey5MBlDR5lt1CfQgcpS3KsqSP/RtCF4NymkIrnqr35JtjGIHXygL4O1psnD/AI681o0ulYDIdgALP7wYLgP6YTsZw/EL7OWAQIUzbs38r9L/rasvv7H/NDPwwmByFBz/3iEk914wSiPp/MRYlXpIVBHnjEXWsJpTBxruHYNCKFntk7WXQj+ZWnUkcB+X+K2H87Iwife8OgJSQEpASuF9DSlhzrMGLOK4276cUPhXxxqztg==`
  );
  expect(1).toBe(1);

  const data = "1111111";
  const crypto1 = new Crypto(KeyPair.PRIVATE_KEY, KeyPair.PUBLIC_KEY);
  const encryptText = await crypto1.encrypt(data);
  const decryptText = await crypto1.decrypt(encryptText);
  expect(data).toBe(decryptText);
});

test("client AESEncrypt/AESDecrypt Test", async () => {
  const dom = new JSDOM(``);
  global.window = dom.window;
  global.window.crypto = new Webcrypto();
  const data = "1122";
  const key = await generateAESKey();
  // 生成Nonce
  const nonce = window.crypto.getRandomValues(new Uint8Array(16));

  let result = await AESEncrypt(key, str2ab(data), nonce);
  let res = await AESDecrypt(key, result, nonce);
  expect(data).toBe(ab2str(res));
});

test("client RSAEncrypt/RSADecrypt Test", async () => {
  const dom = new JSDOM(``);
  global.window = dom.window;
  global.window.crypto = new Webcrypto();
  const data = "0000";
  const pubkey = await RSABase64Key2CryptoKey(KeyPair.PUBLIC_KEY, false);
  const prikey = await RSABase64Key2CryptoKey(KeyPair.PRIVATE_KEY, true);
  let result = await RSAEncrypt(pubkey, str2ab(data));
  let res = await RSADecrypt(prikey, result);
  expect(data).toBe(ab2str(res));
});
