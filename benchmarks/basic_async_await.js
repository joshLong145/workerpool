let workerpool = require("..");
const { Promise } = require("../src/Promise");
const config = require("./pool.config");

let ITERATIONS = parseInt(process.env["WP_BENCH_ITERATIONS"], 10) ?? 10;
let MIN_WORKERS = parseInt(process.env["WP_BENCH_WORKERS"], 10) ?? 10;

return (async () => {
  let pool = workerpool.pool("./workers/basic.js", config);

  for (let i = 0; i < ITERATIONS; i++) {
    await pool.exec("add", [1, 2]);
  }

  await pool.terminate();
  console.log("done");
})();
