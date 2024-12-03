// a simple worker
var workerpool = require('../../');

function add(a, b) {
  return a + b;
}

// create a worker and register some functions
workerpool.worker({
  add: add,
});
