import assert from "assert";
import { add } from "../build/debug.js";
import {mancalaBoard} from "../build/release.js";
assert.strictEqual(add(1, 2), 3);
assert.strictEqual(mancalaBoard(1,[13,14,22,23,11,24,15,21],8)[14],2);
assert.strictEqual(mancalaBoard(1,[14],1)[14],2);
assert.strictEqual(mancalaBoard(1,[13,16,26],3)[14],1);
assert.strictEqual(mancalaBoard(1,[
    13, 16, 22, 21, 15, 25, 16, 12,
    16, 15, 22, 14, 21, 16, 15, 23,
    11, 15, 13, 14, 15, 16, 25, 22,
],24)[14],0);
console.log("ok");
