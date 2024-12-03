let workerpool = require("..");
const { Promise } = require("../src/Promise");
const config = require("./pool.config");

let ITERATIONS = parseInt(process.env["WP_BENCH_ITERATIONS"], 10) ?? 10;
let MIN_WORKERS = parseInt(process.env["WP_BENCH_WORKERS"], 10) ?? 10;

const pool = workerpool.pool("./workers/basic.js", config);

function invokeThroughProxy() {
  return pool.proxy().then((proxy) => {
    return proxy["add"](1, 2);
  });
}

const promises = [];
for (let i = 0; i < ITERATIONS; i++) {
  promises.push(invokeThroughProxy());
}

return Promise.all(promises).then(() => {
  console.log("done");
  return pool.terminate();
});
