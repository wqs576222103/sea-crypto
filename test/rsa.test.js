import { encrypt, decrypt } from "../lib/index.ts";
import { Crypto } from "@peculiar/webcrypto";
const { JSDOM } = require("jsdom");

test("adds 1 + 2 to equal 3", async () => {
  const dom = new JSDOM(``);
  global.window = dom.window;
  global.window.crypto = new Crypto();
  const data = "1111111";
  const encryptText = await encrypt(data);
  const decryptText = await decrypt(encryptText)
  console.log(encryptText)
  expect(decryptText).toBe(data);
});
