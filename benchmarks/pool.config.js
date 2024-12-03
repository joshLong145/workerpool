let MIN_WORKERS = parseInt(process.env["WP_BENCH_WORKERS"], 10) ?? 10;
let WORKER_TYPE = process.env["WP_BENCH_WORKER_TYPE"] ?? "thread";

const defaultConfig = {
  workerType: WORKER_TYPE,
  minWorkers: MIN_WORKERS,
};

module.exports = defaultConfig;
