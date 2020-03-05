/* eslint-disable require-jsdoc */

const startTime = Date.now() - 1;

function offset() {
  return (Date.now() - startTime) / 1000;
}

const errorHandler = function(error) {
  console.log(offset, 'ERROR HANDLER: error:', error);
};

const resultHandler = function(result) {
  console.log(offset(), 'RESULT HANDLER: result:', result);
  return 'RESULT HANDLER: return: ' + result;
};

function wrapData(value) {
  const v = '<before>' + value + '<after>';
  console.log(offset(), 'WRAP DATA RUNNING: value:', value, ', returning:', v);
  return v;
};

function wrapPromise(value) {
  console.log(offset(), 'WRAP PROMISE CREATE RUNNING: value:', value);
  return new Promise(function(resolve, reject) {
    // We don't use reject as we can't fail.
    resolve(wrapData(value));
  });
}

function main() {
  console.log(offset(), 'MAIN STARTED');
  wrapPromise('test1').then(wrapPromise, errorHandler)
      .then(resultHandler, errorHandler);
  console.log(offset(), 'MAIN ENDED');
}

main();
