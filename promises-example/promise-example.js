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
