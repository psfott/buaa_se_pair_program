// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
    return a + b;
}

export function mancalaOperator(flag: i32, status: i32[]) : i32 {
    return Index2Hole(mancalaOperatorIndex(flag,status));
}

// 只考虑自己的情况
export function mancalaOperatorIndex(flag: i32, status: i32[]): i32 {
    //首先观察能否二次操作
    for (let i = calculateIndex(flag, 6); i >= calculateIndex(flag, 1); i--) {
        if (status[i] != 0) { //当前棋盘格有棋子，可以播撒。
            let nextStatus: i32[] = simulateOneStep(flag, i, status);
            if (nextStatus[14] == 2) { //再次行动优先
                return i;
            }
        }
    }
    for (let i = calculateIndex(flag, 6); i >= calculateIndex(flag, 1); i--) {
        if (status[i] != 0) { //当前棋盘格有棋子，可以播撒。
            let nextStatus: i32[] = simulateOneStep(flag, i, status);
            if (nextStatus[14] < 0) { //可以进行取子
                return i;
            }
        }
    }
    let grabMap: i32[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = calculateIndex(flag, 6); i >= calculateIndex(flag, 1); i--) {
        if (status[i] != 0) {//当前棋盘格有棋子，可以播撒。
            let nextStatus: i32[] = simulateOneStep(flag, i, status);
            let nextFlag = flag == 1 ? 2 : 1;
            grabMap[i] = -traverseOpponent(nextFlag,nextStatus);
        } else {
            grabMap[i] = -1;
        }
    }
    let minGrab = 48;
    let minIndex = -1;
    for (let i = calculateIndex(flag,6); i >= calculateIndex(flag,1); i--) {
        if (grabMap[i] == 0) {
            return i;
        } else if (grabMap[i] < minGrab && grabMap[i] > 0) {
            minGrab = grabMap[i];
            minIndex = i;
        }
    }
    return minIndex;
}


export function simulateOneStep(turn: i32, index: i32, status: i32[]): i32[] {
    const countMap = new Map<i32, i32>();//用Map模拟棋盘
    for (let i = 0; i < 14; i++) {
        countMap.set(i, status[i]);
    }
    let data: i32 = allocateChess(turn, index, countMap);
    let ans: i32[] = [countMap.get(0), countMap.get(1), countMap.get(2), countMap.get(3), countMap.get(4), countMap.get(5), countMap.get(6),
        countMap.get(7), countMap.get(8), countMap.get(9), countMap.get(10), countMap.get(11), countMap.get(12), countMap.get(13), data];
    return ans;
}//返回模拟一步之后的棋盘状态和一个数据位（标志是否再次行动或游戏结束等）

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
        let num: i32 = countMap.get(12 - index);
        countMap.set(12 - index, 0);
        return -num;
    }
    if (turn == 2 && countMap.get(index) == 1 && (index >= 7 && index < 13) && countMap.get(12 - index) > 0) {
        countMap.set(13, countMap.get(13) + countMap.get(index) + countMap.get(12 - index));
        countMap.set(index, 0);
        let num: i32 = countMap.get(12 - index);
        countMap.set(12 - index, 0);
        return -num;
    }
    return 0;
}

export function calculateIndex(turn: i32, onesDigit: i32): i32 {
    return 7 * (turn - 1) + onesDigit - 1;
}

export function Index2Hole(index : i32): i32 {
    let tenDigit: i32 = 0;
    let oneDigit: i32 = 0;
    if (index < 6) {
        tenDigit = 10;
        oneDigit = index + 1;
    } else {
        tenDigit = 20;
        oneDigit = index - 6;
    }
    return tenDigit + oneDigit;
}


export function traverseOpponent(flag: i32, status: i32[]): i32 {
    let maxGrab = 0;
    for (let i = calculateIndex(flag, 6); i >= calculateIndex(flag, 1); i--) {
        if (status[i] != 0) {
            let nextStatus = simulateOneStep(flag, i, status);
            if (nextStatus[14] < 0) {
                if (nextStatus[14] < maxGrab) {
                    maxGrab = nextStatus[14];
                }
            } else if (nextStatus[14] == 2) {
                let subMaxGrab = traverseOpponent(flag, nextStatus);
                if (subMaxGrab < maxGrab) {
                    maxGrab = subMaxGrab;
                }
            }
        }
    }
    return maxGrab;
}
