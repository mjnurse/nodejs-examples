/* eslint-disable require-jsdoc */

function resolveAfterNSeconds(n) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve('resolved');
    }, n*1000);
  });
}

async function asyncCallSequential() {
  console.log('Start 3 in sequence:');
  for (let i=1; i<=3; i++) {
    console.log('Sequential Start:', i,
        'Time', Date.now() - startTime, 'ms');
    const result =
      await resolveAfterNSeconds(2);
    console.log('Sequential', i, result,
        'Time', Date.now() - startTime, 'ms');
  }
}

async function asyncCallConcurrent() {
  console.log('Start 3 in parallel:');
  console.log('Parallel Start', 1,
      'Time', Date.now() - startTime, 'ms');
  const result1 = resolveAfterNSeconds(2);
  console.log('Parallel Start', 2,
      'Time', Date.now() - startTime, 'ms');
  const result2 = resolveAfterNSeconds(2);
  console.log('Parallel Start', 3,
      'Time', Date.now() - startTime, 'ms');
  const result3 = resolveAfterNSeconds(2);
  console.log('Parallel', 1, await result1,
      'Time', Date.now() - startTime, 'ms');
  console.log('Parallel', 2, await result2,
      'Time', Date.now() - startTime, 'ms');
  console.log('Parallel', 3, await result3,
      'Time', Date.now() - startTime, 'ms');
}

startTime = Date.now();
asyncCallSequential();
asyncCallConcurrent();
