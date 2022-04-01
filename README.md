# AES+RSA 请求统一加解密工具

[![Build Status](https://app.travis-ci.com/wqs576222103/encrypt-utils.svg?token=T85MtSayTDJVsGq9odzs&branch=main)](https://app.travis-ci.com/wqs576222103/encrypt-utils)

# 添加依赖

```
yarn add encrypt-utils
```

# 使用

1、项目第一次初始化页面时调用 xxxx 方法生成前端的公私钥对：RSA 公钥（通过 body 加密后传给后端）、私钥（前端用于解密后端返回数据）

```
import { generateRSAKey, encrypt } from '../dist/RSAUtils.js'
const startTime = Date.now()
await generateRSAKey().then(res => {
    console.log(`密钥生成耗时: ${Date.now() - startTime}ms`)
    console.log(res.PRIVATE_KEY, res.PUBLIC_KEY)
})
```

2、请求时加密请求数据

```
// TODO
```

3、请求数据返回时解密请求数据

```
// TODO
```
