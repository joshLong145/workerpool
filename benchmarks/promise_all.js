let workerpool = require("..");
const { Promise } = require("../src/Promise");
const config = require("./pool.config");

let ITERATIONS = parseInt(process.env["WP_BENCH_ITERATIONS"], 10) ?? 10;
let MIN_WORKERS = parseInt(process.env["WP_BENCH_WORKERS"], 10) ?? 10;

let pool = workerpool.pool("./workers/basic.js", config);

let tasks = [];
for (let i = 0; i < ITERATIONS; i++) {
  tasks.push(pool.exec("add", [1, 2]));
}

return Promise.all(tasks).then((results) => {
  console.log("all task settled, terminating pool");
  return pool.terminate();
});
