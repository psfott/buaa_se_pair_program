import assert from "assert";
import { add } from "../build/debug.js";
import {mancalaResult} from "../build/release.js";
assert.strictEqual(mancalaResult(1,[11,12],2),30001);
assert.strictEqual(mancalaResult(1,[14],1),20001);

console.log("ok");
