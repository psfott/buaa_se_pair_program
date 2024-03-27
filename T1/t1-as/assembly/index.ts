// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}


export function bocchiShutUp(flag: i32, seq: i32[], size: i32): i32 {
  // 定义一个 Map 对象用于统计十位数为 1 或 2 的数字的出现频次
  const countMap = new Map<i32, i32>();

  // 根据 flag 统计十位数为 1 或 2 的数字的出现频次
  for (let i = 0; i < size; i++) {
    const tensDigit = Math.floor(seq[i] / 10);
    if (flag === 1 && tensDigit === 1) {
      const count = countMap.has(seq[i]) ? countMap.get(seq[i]) + 1 : 1;
      countMap.set(seq[i], count);
    } else if (flag === 2 && tensDigit === 2) {
      const count = countMap.has(seq[i]) ? countMap.get(seq[i]) + 1 : 1;
      countMap.set(seq[i], count);
    }
  }

  // 找到出现频次最大的数字
  let maxCount = 0;
  let ghostNumber = 0;
  const keys = countMap.keys();
  for (let i = 0; i < keys.length; i++) {
    const num = keys[i];
    const count = countMap.get(num);
    if (count > maxCount) {
      maxCount = count;
      ghostNumber = num;
    } else if (count === maxCount) {
      ghostNumber = 10; // 存在多个“👻幽灵”
    }
  }

  return ghostNumber; // 返回“👻幽灵”或 10
}



