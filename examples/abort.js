const workerpool = require("..");

function add(a, b) {
  return a + b;
}

function main() {
  const pool = workerpool.pool(__dirname + "/workers/cleanupAbort.js", {
    // maximum time to wait for worker to cleanup it's resources
    // on termination before forcefully stopping the worker

    onCreateWorker: function (args) {
      console.log("New worker created");
    },
    onTerminateWorker: function () {
      console.log("worker terminated");
    },
    maxWorkers: 1,
  });

  console.log("Starting first task that will timeout after 100ms...");

  // First task demonstrates our improved timeout handling
  const task = pool
    .exec(add)
    .then((res) => {
      console.log("Timeout occurred:", res);
      console.log("The promise chain continues even after timeout");
      console.log("Worker cleanup is happening in the background");
    }).catch(() =>{
      console.log("sdasd")
    });


  pool.workers[0].worker.kill();


  return task;
};

main();
