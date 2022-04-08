/*
Convert  an ArrayBuffer into a string
from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
*/
export function ab2str(uintArray: ArrayBuffer) {
  var encodedString = String.fromCharCode.apply(null, Array.from(new Uint8Array(uintArray))),
    decodedString = decodeURIComponent(encodedString);
  return decodedString;
}
/*
Convert a string into an ArrayBuffer
from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
*/
export function str2ab(string: string) {
  const str = encodeURIComponent(string),
    charList = str.split(""),
    uintArray = [];
  for (let i = 0; i < charList.length; i++) {
    uintArray.push(charList[i].charCodeAt(0));
  }
  return new Uint8Array(uintArray);
}
/** ArrayBuffer转base64 */
export function ab2base64Str(buffer: ArrayBuffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
/** base64转ArrayBuffer */
export function base64Str2ab(base64String: string) {
  const rawData = window.atob(base64String);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const number2ab = (n: number) => {
  // 大端模式转小端模式
  const buf = new BigUint64Array([BigInt(n)]).buffer;
  return buf;
};

export const ab2number = (buf: ArrayBuffer) => {
  const bufView = new BigUint64Array(buf);
  return Number(bufView[0]);
};

// 合并多个ArrayBuffer
export const abConcatenate = (...arrays: ArrayBuffer[]) => {
  let totalLen = 0;

  for (let arr of arrays) totalLen += arr.byteLength;

  let res = new Uint8Array(totalLen);

  let offset = 0;

  for (let arr of arrays) {
    let uint8Arr = new Uint8Array(arr);

    res.set(uint8Arr, offset);

    offset += arr.byteLength;
  }

  return res.buffer;
};
