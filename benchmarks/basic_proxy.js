let workerpool = require("..");
const { Promise } = require("../src/Promise");
const config = require("./pool.config");

let ITERATIONS = process.env["WP_BENCH_ITERATIONS"] ?? 10;
let MIN_WORKERS = parseInt(process.env["WP_BENCH_WORKERS"], 10) ?? 10;

const pool = workerpool.pool("./workers/basic.js", config);

return pool.proxy().then((proxy) => {
  const promises = [];
  for (let i = 0; i < ITERATIONS; i++) {
    promises.push(proxy["add"](1, 2));
  }
  return Promise.all(promises).then(() => {
    return pool.terminate();
  });
});
