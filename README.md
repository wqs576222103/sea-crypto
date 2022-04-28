# AES+RSA 请求统一加解密工具

[![Build Status](https://app.travis-ci.com/wqs576222103/encrypt-utils.svg?token=T85MtSayTDJVsGq9odzs&branch=main)](https://app.travis-ci.com/wqs576222103/encrypt-utils)

# 项目常用命令

```
// 生成工具包
yarn build

// 本地vite启动
yarn start

// 容器上预览 预览地址 https://crypto-view.dev.172.16.11.85.nip.io/
yarn preview

// 运行测试用例
yarn test

// 发布工具到npm私服库上  http://172.16.11.82:4873/
yarn release

```

# 发布 npm 包后，项目如何使用

- 添加依赖

```
yarn add @wyny/crypto
```

- 基础使用

```js
    import { Crypto } from '@wyny/crypto'
    ...
    /**
    * clientPrivateKey 客户端私钥
    * serverPublicKey 服务端公钥
    */
     const crypto = new Crypto(clientPrivateKey, serverPublicKey);
    let data = { "username": "a", "email": "b" }
    const encryptData = await crypto.encrypt(JSON.stringify(data))
    console.log('加密数据：', encryptData)
    
    const responseData = 'xxxxxxxxxxxx' // 后端返回的数据
    const decryptData = await crypto.decrypt(responseData)
    console.log('解密数据：', decryptData)
    ...
```


- 也可以客户端自生成key,之后将生成的KeyPair.PUBLIC_KEY通过header等方式传给后端解密使用
```js
import { generateRSAKey, Crypto } from '@wyny/crypto'

    const KeyPair = await generateRSAKey()
    const crypto = new Crypto(KeyPair.PRIVATE_KEY, serverPublicKey);

    let data = { "username": "a", "email": "b" }
    const encryptData = await crypto.encrypt(JSON.stringify(data))
    console.log('加密数据：', encryptData)

    // 将生成的KeyPair.PUBLIC_KEY通过header等方式传给后端解密使用
    ....

    const responseData = 'xxxxxxxxxxxx' // 后端返回的数据
    const decryptData = await crypto.decrypt(responseData)
    console.log('解密数据：', decryptData)

```

# 常见问题

- 控制台报错 TypeError: Cannot read properties of undefined (reading 'importKey')

原因： Web API window.crypto 仅支持在本地（localhost、127.0.0.1、file）、远程（https 域名访问）
`````

- 控制台报错 error:Maximum call stack size exceeded

原因：加解密的数据量太大，加解密算法调用栈溢出。最好减少加解密数据量