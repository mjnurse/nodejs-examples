# Promise Examples

## Single Promise

File: promise-example.js
```javascript
const request = require('request');

let userDetails;

// eslint-disable-next-line require-jsdoc
function initialize() {
  // Setting URL and headers for request
  const options = {
    url: 'https://api.github.com/users/mjnurse',
    headers: {
      'User-Agent': 'request',
    },
  };
  // Create and return new promise
  return new Promise(function(resolve, reject) {
    // Do async job
    request.get(options, function(error, response, body) {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
}

// eslint-disable-next-line require-jsdoc
function main() {
  console.log('MAIN STARTED');
  const initializedPromise = initialize();
  initializedPromise.then(
      // Define the resolve function.
      function(result) {
        console.log('IN RESOLVE FUNCTION');
        userDetails = result;
        console.log('Initialized user details');
        // Use user details from here
        console.log('userDetails = ', userDetails);
      },
      // Define the reject function.
      function(error) {
        console.log('IN REJECT FUNCTION');
        console.log('Error = ', error);
      },
  );
  console.log('userDetails = ', userDetails);
  console.log('MAIN ENDED');
}

main();
```

#### Output

File: promise-example.out
```bash
> nodejs promise-example.js

MAIN STARTED
MAIN ENDED
IN SUCCESS FUNCTION
Initialized user details:
{
  login: 'mjnurse',
  id: 22958213,
  node_id: 'MDQ6VXNlcjIyOTU4MjEz',
  avatar_url: 'https://avatars2.githubusercontent.com/u/22958213?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/mjnurse',
  html_url: 'https://github.com/mjnurse',
  followers_url: 'https://api.github.com/users/mjnurse/followers',
  following_url: 'https://api.github.com/users/mjnurse/following{/other_user}',
  gists_url: 'https://api.github.com/users/mjnurse/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/mjnurse/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/mjnurse/subscriptions',
  organizations_url: 'https://api.github.com/users/mjnurse/orgs',
  repos_url: 'https://api.github.com/users/mjnurse/repos',
  events_url: 'https://api.github.com/users/mjnurse/events{/privacy}',
  received_events_url: 'https://api.github.com/users/mjnurse/received_events',
  type: 'User',
  site_admin: false,
  name: null,
  company: null,
  blog: '',
  location: null,
  email: null,
  hireable: null,
  bio: null,
  public_repos: 3,
  public_gists: 0,
  followers: 0,
  following: 0,
  created_at: '2016-10-20T11:55:11Z',
  updated_at: '2020-01-08T17:16:46Z'
}

>
```

## Promise Chaining

File: promise-chain-example.js
```javascript
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
```

#### Output

File: promise-chain-example.out
```bash
> nodejs promise-chain-example.js 

0.001 MAIN STARTED
0.012 WRAP PROMISE CREATE RUNNING: value: test1
0.012 WRAP DATA RUNNING: value: test1 , returning: <before>test1<after>
0.013 MAIN ENDED
0.014 WRAP PROMISE CREATE RUNNING: value: <before>test1<after>
0.015 WRAP DATA RUNNING: value: <before>test1<after> , returning: <before><before>test1<after><after>
0.015 RESULT HANDLER: result: <before><before>test1<after><after>
```

## Promise.all

File: promise.all-example.js
```javascript
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
```

#### Output

File: promise.all-example.out
```bash
> nodejs promise.all-example.js 

Promise 3 running: resolve = [Function] reject = [Function]
Promise 2 running: resolve = [Function] reject = [Function]
message = 
Promise 1 running: resolve = [Function] reject = [Function]
results =  [ 'one ', 'one three two ', 'one three ' ] message = one three two 
results =  [ 'one three ', 'one three two ', 'one ' ] message = one three two 
```
