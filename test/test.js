"use strict";
const expect = require("chai").expect;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const add = require("../dist/index").add;

describe("RSA DEMO", () => {
  it("should return 2", () => {
    // 创建 JSDOM，获得 window 对象
    const { window } = new JSDOM(`<div id="dum-id" ></div>`);

    // 将被测函数需要用到的变量挂到全局
    global.localStorage = window.localStorage;
    global.document = window.document;

    
        const startTime = Date.now()
        await generateRSAKey().then(res => {
            
            console.log(`密钥生成耗时: ${Date.now() - startTime}ms`)
            console.log(res.PRIVATE_KEY, res.PUBLIC_KEY)
        })

  });
});
