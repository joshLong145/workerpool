const workerpool = require("..");

function add (a, b) {
  return a + b;
}
// create a worker pool
const pool = workerpool.pool(__dirname + "/workers/cleanupAbort.js", {
  // maximum time to wait for worker to cleanup it's resources
  // on termination before forcefully stopping the worker
  workerTerminateTimeout: 1000,
  onCreateWorker: function (args) {
    console.log("New worker created");
  },
  onTerminateWorker: function () {
    console.log("worker terminated");
  },
  maxWorkers: 1,
});

const main = async function() {
  const task = pool
    .exec("asyncTimeout", [], {})
    .timeout(100)
    .catch((err) => {
      console.log("timeout handled: ", err);
      console.log("pool status after abort operation:", pool.stats());
    });

  await task;

  const task2 = pool
    .exec("asyncAbortHandlerNeverResolves", [], {})
    .cancel()
    .catch((err) => {
      console.log("task canceled");
      console.log("cancel occured: ", err);

      console.log("final pool stats", pool.stats());
    });
  await task2.then(() => {
    console.log("done");
  });

  pool.exec(add, [1,2], {}).then(function(res) {
    console.trace(res);
  });
  // we dont need to terminate the pool, since all workers should be terminated by this point even though there is a handler.

  return pool.terminate();
};

main();
