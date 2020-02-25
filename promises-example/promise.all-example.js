let MESSAGE = '';

// Note the promises below cannot fail so we dont use the reject function.
const prom1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Promise 1 running: resolve =', resolve, 'reject =', reject);
    MESSAGE += 'one ';
    resolve(MESSAGE);
  }, 2000);
});

const prom3 = new Promise((resolve, reject) => {
  console.log('Promise 3 running: resolve =', resolve, 'reject =', reject);
  setTimeout(() => {
    MESSAGE += 'three ';
    resolve(MESSAGE);
  }, 2000);
});

const prom2 = new Promise((resolve, reject) => {
  console.log('Promise 2 running: resolve =', resolve, 'reject =', reject);
  setTimeout(() => {
    MESSAGE += 'two ';
    resolve(MESSAGE);
  }, 2000);
});
const printErr = (results) => {
  console.log('error = ', results, 'message =', MESSAGE);
};

const printRes = (results) => {
  console.log('results = ', results, 'message =', MESSAGE);
};

// eslint-disable-next-line require-jsdoc
function main() {
  // NOTE: See the order of promises above. Final message will be according to
  //       this and not the order in the Promise.all below.  I'm not sure this
  //       (i.e the order they are created) should be relied on?  Should assume
  //       it's undefined.  The order of the results WILL depend on the order
  //       in the Promise.all as this is the order the results are combined.
  // NOTE: Promise.all is a new Promise.
  Promise.all([prom1, prom2, prom3]).then(printRes, printErr);
  const promAll = Promise.all([prom3, prom2, prom1]);
  promAll.then(printRes, printErr);

  // NOTE: The message value that follows should be empty as main will finish
  //       before the Promises return.
  console.log('message =', MESSAGE);
}

main();
