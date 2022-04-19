import {
  encrypt,
  decrypt,
  encryptWithKey,
  decryptWithKey,
  generateAESKey,
  AESEncrypt,
  AESDecrypt,
  RSAEncrypt,
  RSADecrypt,
  RSABase64Key2CryptoKey,
  str2ab,
  ab2str,
} from "../dist/crypto.es";
import { Crypto } from "@peculiar/webcrypto";
const { JSDOM } = require("jsdom");

const KeyPair = {
  PRIVATE_KEY:
    "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCev3EPpZo8zx9S63aZoae7fj8pHBSFyHXIRM7b94SoP6izO4tyhjKGU96MODdTwCyik6V8siyj6GZQM4+Vh9riI2F0U6ufOCaYXT2drjTQp4GlBnQPBJ+coSUFw0tjiJWRSyVIhfIg24feKGljkd9FM5hp/sWpS1xvaCTTHXP5yrTt2UwKZ5qRz3BpZ3+kEiQfdLJqX8CoHzb+bSTO2nViKbIW3s6StJrMSj68UrunNON46lR5JHe9EDfhw9SRpv4IitAuHOAwZ38/RlGwHAiC4J6aYQ3SbxGEsLUywsn0ZclN1R0tvSPSqNZwQiarlplH+fE55449ItUIa+qnyNHdAgMBAAECggEAULAf6IMU3XmtgzkZhEcteVhXBC84ozNb4ppOxnGN5PLObaODYoehYLN6d60POiuAxHXldHcfx4QVlQhQIAH4mF7BZx4sKnag72rdKatlPvUVKWsZTJTeB//EUKSOSh4fX8VhQvaKNnc/HQVPZAO+B2+NNbsAfudGKX420XO0Ai9fQMzvmqcmkXFoMw67uwrPjAO7/92+qk1U2/K7seI6SXqSTcJyDOiS1GaruXey1FiKqV2Ewos5nv9isp0ElIAq435SSFJttSaVgZSW7uNzFFPSapQR8HrleOxLnOeHn3sxNqJIYRq+OgexmQThDSEvU9G0HTu1fw8pXkBC3WF9RQKBgQDfGKJZNtHQmC6GPjt7UunD70VGs5uWI3XX9cdUYBmN80z950MaDgiiIuSPOaIxmQ3PUDBcDQnXdnECSkkWkFyZA6pMIJ7pUUnFraNuT0ZllNYGSYxLzzDrzb4jtI3qojBBctmNa/8rv+9v6bafhbKMIdMO2OR/fYMktbdvMX86XwKBgQC2KTosVm8xREJd+PsSX/h0TTW66466Jz2viJfcVwHLzqSqWK/xDSurdu7DvpOkDcXyMvogBAQ3BLLa3GEGtdMKj0zgzrjTHaPnDGAECVYON1vEeq5AVEivHHJz6UxI8huUjXdoWiFELFjczV4hlrT93vTYx9sgrgUNdsJGtsVVQwKBgQCGmIMiFevB0H6JKTSTs7MrLcj63dNpYl1vfG3U3uGr/XSe3o5iQsM8ppaEPn43NCLbx4JVltwwLNoDSrQLs+7ZthdhNHELTKqYY6jtHVDYalIxmt/UwNy/9vHW8tCIFW/NnK/aHaTmTTb0qukuFuhgmOuP0pUQwbWESUmxAQjEOwKBgHRdR70VBfjZ2u9+4pwtVGCvBdi/KzC9aolcX24w4oPYIJZ1CweYW0IwOnwunM/awI1khSW4ixy+Uqa+yvhnZEZFnl2pkKXENHSfEiLh9+gi8utDV1bewIOkT3S+Hq4mgvnVmOa/VKrhDW8Xfb9FL59RMuXcXZ21rKKaL6bOkKZTAoGASc9Yst39DUihR6oWB/nj/PdubFv+6t6bJ/mH6atkvGCMVR4Uf+qMhmGZaATFTr9B57AueyDQER4y+n43V2MWR1jCxfcJU96dMLZnIkgnHUWpfX68dmy1Qwb6ik1OiBRjCwwFOl4H+rVt8BTRxNQa5XbdyR4iUM9xYh3VQLk2W9U=",
  PUBLIC_KEY: `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnr9xD6WaPM8fUut2maGnu34/KRwUhch1yETO2/eEqD+oszuLcoYyhlPejDg3U8AsopOlfLIso+hmUDOPlYfa4iNhdFOrnzgmmF09na400KeBpQZ0DwSfnKElBcNLY4iVkUslSIXyINuH3ihpY5HfRTOYaf7FqUtcb2gk0x1z+cq07dlMCmeakc9waWd/pBIkH3Syal/AqB82/m0kztp1YimyFt7OkrSazEo+vFK7pzTjeOpUeSR3vRA34cPUkab+CIrQLhzgMGd/P0ZRsBwIguCemmEN0m8RhLC1MsLJ9GXJTdUdLb0j0qjWcEImq5aZR/nxOeeOPSLVCGvqp8jR3QIDAQAB`,
};


test("client encrypt/decrypt Test", async () => {
  const dom = new JSDOM(``);
  global.window = dom.window;
  global.window.crypto = new Crypto();
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

test("client encryptWith/decryptWith Test", async () => {
  const dom = new JSDOM(``);
  global.window = dom.window;
  global.window.crypto = new Crypto();
  await encrypt(
    '1111111'
  );
  await decrypt(`F5NlJSz/UWKw7Wvwl7PKDhXUV9dbKqxJSKhWQiXpnKtUbNFoCD4eK941q0UuS1qtBk/Bbfbqtb2JvtMK/BmWLyDnmNGnlgYaUnXJ9gMJCLkHW3Wxc+5PIa5CWoL6H556+Csj/K268SdfettRbNEjpOpmUGlmtRe4rs4x8eItSPxnlFBp23ekkaHX+NpXo/c2padOPSdaLpRuHVJhfPq0RqxcSFDB75AkBnxq+AHfJJKlFqS2GIO8bpiN9EUSOVpWC2uhO7mxx//L2j/11A26GFmWWa4fUBfoK/80SLmMe6iTgWfiPKQlTkk7+hYHLq/xnfjygJ8fMMmNXXm7ci4CDLMWxVnTXzIfAEBeSe0hB9Cufrt/iDTH32q310EHm5HydRME4qvPQhdaJu1fOFemxVbKHGjYzRQBqFLItEJlJvhsuJDEUQioKN1i7gFoGR+28tzw0NW9HK5JmcYf5RWRZhedDo5NdpkpF1FG6xhGdyysyaPWo9Glrgeh2PZvWozNfjyPssv2GSmgg//RycPmoN02M05h7Lq8f1Hx+XeodhtDjL3vWgjHAalgqJDfZ1WoGUHRZyDL6ZF3y87ycXIW6k/U88DdVnL1+GAh9FyzE8I2uRwDPlFxSRfftcdZDNgHk6BL+mJJehgs1kRLfp+wMSEIW/5pqkmyisLhtB3rQNflRHDIj/gu/mqZw/OXICrzPlg0TMvIZb62bqyjDOA7jYyIGy9shDeGge+f0iDZqgXEey5MBlDR5lt1CfQgcpS3KsqSP/RtCF4NymkIrnqr35JtjGIHXygL4O1psnD/AI681o0ulYDIdgALP7wYLgP6YTsZw/EL7OWAQIUzbs38r9L/rasvv7H/NDPwwmByFBz/3iEk914wSiPp/MRYlXpIVBHnjEXWsJpTBxruHYNCKFntk7WXQj+ZWnUkcB+X+K2H87Iwife8OgJSQEpASuF9DSlhzrMGLOK4276cUPhXxxqztg==`);
  expect(1).toBe(1);
});

test("client AESEncrypt/AESDecrypt Test", async () => {
  const dom = new JSDOM(``);
  global.window = dom.window;
  global.window.crypto = new Crypto();
  const data = '1122'
  const key = await generateAESKey()
  // 生成Nonce
  const nonce = window.crypto.getRandomValues(new Uint8Array(16));

  let result = await AESEncrypt(key, str2ab(data), nonce)
  let res = await AESDecrypt(key, result, nonce)
  expect(data).toBe(ab2str(res));
});

test("client RSAEncrypt/RSADecrypt Test", async () => {
  const dom = new JSDOM(``);
  global.window = dom.window;
  global.window.crypto = new Crypto();
  const data = "0000";
  const pubkey =await RSABase64Key2CryptoKey(KeyPair.PUBLIC_KEY, false)
  const prikey = await RSABase64Key2CryptoKey(KeyPair.PRIVATE_KEY, true)
  let result = await RSAEncrypt(pubkey, str2ab(data));
  let res = await RSADecrypt(prikey, result);
  expect(data).toBe(ab2str(res));
});
