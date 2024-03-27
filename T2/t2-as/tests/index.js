import assert from "assert";
import { add } from "../build/debug.js";
import {mancalaResult} from "../build/release.js";
assert.strictEqual(mancalaResult(1,[11,12],2),30001);
assert.strictEqual(mancalaResult(1,[14],1),20001);
assert.strictEqual(mancalaResult(1,[13,14,22,23,11,24,15,21],8),20003);
console.log("ok");
