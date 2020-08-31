/**
 * 判断数字数组是否连续
 * @param {*} numberArr
 */
export const checkNumberIsSerial = function(numberArr) {
  if(numberArr instanceof Array === false) throw '参数必须是数组';
  let arr = [...numberArr];
  if(arr.length === 1) return true;
  arr = arr.sort();
  let n1 = arr[0];
  let isSerial = true;
  n1 += 1;
  for(let i = 1; i < arr.length; i++) {
    n1 != arr[i] && (isSerial = false);
    n1 += 1;
  }
  return isSerial;
}
