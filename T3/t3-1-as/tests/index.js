import assert from "assert";
import { add } from "../build/debug.js";
import {mancalaBoard} from "../build/release.js";
assert.strictEqual(add(1, 2), 3);
assert.strictEqual(mancalaBoard(1,[13,14,22,23,11,24,15,21],8)[14],2);
assert.strictEqual(mancalaBoard(1,[14],1)[14],2);
console.log("ok");
