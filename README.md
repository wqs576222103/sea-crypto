# AES+RSA 请求统一加解密工具

[![Build Status](https://app.travis-ci.com/wqs576222103/encrypt-utils.svg?token=T85MtSayTDJVsGq9odzs&branch=main)](https://app.travis-ci.com/wqs576222103/encrypt-utils)

# 项目常用命令
```
// 构建生成工具包
yarn build

// 使用vite启动
yarn start

// 容器预览
yarn preview

// 测试工具类
yarn test

// 发布工具
yarn release

```


# 二、工具类引入
# 添加依赖

```
yarn add @wyny/crypto
```

# 使用

```
    import { encrypt, decrypt } from '@wyny/crypto'
    ...
    let data = { "username": "a", "email": "b" }
    const encryptData = await encrypt(JSON.stringify(data))
    console.log('加密数据：', encryptData)
    const decryptData = await decrypt(encryptData)
    console.log('解密数据：', decryptData)
    ...
```
