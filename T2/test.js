import assert from "assert";

// Choose proper "import" depending on your PL.
import { mancalaResult } from "./t2-as/build/release.js";
// import { mancala_result as mancalaResult } from "./t2_rust/pkg/t1_rust.js"
// [Write your own "import" for other PLs.]

assert.strictEqual(mancalaResult(1,[11,12],2),30001);
assert.strictEqual(mancalaResult(1,[14],1),20001);
assert.strictEqual(mancalaResult(1,[
    13, 16, 22, 21, 15, 25, 16, 12,
    16, 15, 22, 14, 21, 16, 15, 23,
    11, 15, 13, 14, 15, 16, 25, 22,
],24),0);

console.log("🎉 You have passed all the tests provided.");
