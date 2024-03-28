// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}
export function mancalaBoard(flag: i32, seq: i32[], size: i32): i32[] {
  flag = seq[0]/10;
  const countMap = new Map<i32, i32>();
  let data : i32 = 0;

  // 一号选手的棋洞为0-5号，计分洞为6号
  for (let i = 0; i < 6; i++) {
    countMap.set(i, 4);
  }
  countMap.set(6, 0);
  //一号选手的棋洞为7-12号，计分洞为13号
  for (let i = 7; i < 13; i++) {
    countMap.set(i, 4);
  }
  countMap.set(13, 0);
  let turn : i32 = flag;// turn = 1表示一号选手的轮次，turn = 2表示二号选手的轮次
  for (let i = 0; i < size; i++) {
    let tensDigit : i32 = Math.floor(seq[i] / 10) as i32;
    let onesDigit : i32 = Math.floor(seq[i] % 10) as i32;
    if (turn != tensDigit) { //检查轮次合法性
       data = illegalStep(tensDigit,countMap);
      break;
    }
    let chessBoardIndex = caculateIndex(turn, onesDigit);
    let num = countMap.get(chessBoardIndex);
    if (num == 0) { //检查拿棋的合法性
      data = illegalStep(tensDigit,countMap);
      break;
    }
    let op = allocateChess(turn, chessBoardIndex, countMap);
    if (op == 1) {
      if (i != size - 1) { //游戏应该结束但是还有操作，下一步操作不合法
        let lastPerson : i32 = Math.floor(seq[i + 1] / 10) as i32;
         data = illegalStep(lastPerson,countMap);
        break;
      }
      data = over(countMap);
    } else if (op == 2) {
      if (i == size - 1) {
        data = turn;
        break;
      }
    } else {
      turn = changeTurn(turn);
      if (i == size - 1) {
        data = turn;
        break;
      }
    }
  }

  let board: i32[] = [countMap.get(0),countMap.get(1),countMap.get(2),countMap.get(3),countMap.get(4),countMap.get(5),countMap.get(6),
    countMap.get(7),countMap.get(8),countMap.get(9),countMap.get(10),countMap.get(11),countMap.get(12),countMap.get(13),data];

  return board;
}

export function changeTurn(turn: i32): i32 { //转变轮次操作
  return turn == 1 ? 2 : 1;
}

export function cheat(index: i32): i32 {
  return 30000 + index;
}

export function over(countMap: Map<i32,i32>): i32 {
  let sum1 = countMap.get(0) + countMap.get(1) + countMap.get(2) + countMap.get(3) + countMap.get(4) + countMap.get(5) +countMap.get(6);
  let sum2 = countMap.get(7) + countMap.get(8) + countMap.get(9) + countMap.get(10) + countMap.get(11) + countMap.get(12) +countMap.get(13);
  return sum1 - sum2 + 200;
}

export function caculateIndex(turn: i32, onesDigit: i32): i32 {
  return 7 * (turn - 1) + onesDigit - 1;
}

export function allocateChess(turn: i32, index: i32, countMap: Map<i32, i32>): i32 {
  let num = countMap.get(index);
  countMap.set(index, 0);
  for (let i = 0; i < num; i++) {
    if (index == 5 && turn == 2) {
      index = index + 2;
    } else if ((index == 12 && turn == 1) || (index == 13)) {
      index = 0;
    } else {
      index = index + 1;
    }
    countMap.set(index, countMap.get(index) + 1);
  }
  // 判断游戏是否结束（return 1）
  let isPlayerOneEmpty = true;
  for (let i = 0; i < 6; i++) {
    if (countMap.get(i) > 0) {
      isPlayerOneEmpty = false;
      break;
    }
  }
  let isPlayerTwoEmpty = true;
  for (let i = 7; i < 13; i++) {
    if (countMap.get(i) > 0) {
      isPlayerTwoEmpty = false;
      break;
    }
  }
  if (isPlayerOneEmpty || isPlayerTwoEmpty) {
    return 1; //游戏结束
  }
  // 判断是否再次行动 （return 2）
  if ((turn == 1 && index == 6) || (turn == 2 && index == 13)) {
    return 2;//再次行动
  }
  // 判断是否取子
  if (turn == 1 && countMap.get(index) == 1 && (index >= 0 && index < 6) && countMap.get(12 - index) > 0) {
    countMap.set(6, countMap.get(6) + countMap.get(index) + countMap.get(12 - index));
    countMap.set(index, 0);
    countMap.set(12 - index, 0);
    return 0;
  }
  if (turn == 2 && countMap.get(index) == 1 && (index >= 7 && index < 13) && countMap.get(12 - index) > 0) {
    countMap.set(13, countMap.get(13) + countMap.get(index) + countMap.get(12 - index));
    countMap.set(index, 0);
    countMap.set(12 - index, 0);
    return 0;
  }
  return 0;
}

export function illegalStep(tensDigit : i32,countMap : Map<i32,i32>) : i32 {
  if (tensDigit == 1) {
    return 200 + 2 * countMap.get(6) - 48;
  } else {
    return  200 + 48 - countMap.get(13);
  }
}

