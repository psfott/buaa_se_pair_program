import assert from "assert";
import { add } from "../build/debug.js";
import {mancalaResult} from "../build/release.js";
assert.strictEqual(mancalaResult(1,[11,12],2),30001);
assert.strictEqual(mancalaResult(1,[14],1),20001);
assert.strictEqual(mancalaResult(1,[13,14,22,23,11,24,15,21],8),20003);
assert.strictEqual(mancalaResult(1,[13,16,26,12,16,11,25,14,26,24,16,13,16,11,26,25,15,25,16,14,26,24,13,21],24),15022)
console.log("ok");
