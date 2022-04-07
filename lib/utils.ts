/*
Convert  an ArrayBuffer into a string
from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
*/
export function ab2str(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf);
  return String.fromCharCode.apply(null, Array.from(bytes));
}
/*
  Convert a string into an ArrayBuffer
  from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
  */
export function str2ab(str: string) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
/** ArrayBuffer转base64 */
export function ab2base64Str(buf: ArrayBuffer) {
  const exportedAsString = ab2str(buf);
  return window.btoa(exportedAsString);
}
/** base64转ArrayBuffer */
export function base64Str2ab(str: string) {
  // base64 decode the string to get the binary data
  const binaryDerString = window.atob(str);
  // convert from a binary string to an ArrayBuffer
  return str2ab(binaryDerString);
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
