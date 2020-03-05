# Module Overview

Create a module and then extend the module adding new functions and over-riding an existing function.

### Base Module

An example creating, using and extending modules.

File: base-module.js
```javascript
// Create a module exporter.
const exporter=module.exports={};

// Add two functions to the module.
exporter.warn=function(message) {
  console.log('My Warning: ' + message);
};

exporter.error=function(message) {
  console.log('My Error: ' + message);
};
```

### Extending The Module

File: extended-module.js
```javascript
// Include the base-module.
const baseModule=module.require('./base-module');

// Extend baseModule with a new function.
baseModule.warnTwice=function(message) {
  baseModule.warn(message+' '+message);
};

const originalError=baseModule.error;
delete baseModule['error'];

baseModule.error=function(message) {
  const s = message.toUpperCase();
  originalError('(now in upper) '+s);
};

// Export modified module.
module.exports=baseModule;
```

### Test Script

File: module-use-example.js
```javascript
/**
 * Display message as a heading.
 * @param {string} message
 */
function heading(message) {
  console.log();
  console.log(message);
  console.log('-'.padEnd(message.length, '-'));
};

heading('Include the base-module');
const baseModule=module.require('./base-module');

heading('Call both functions in the base module');
baseModule.warn('Base module warning');
baseModule.error('Base module error');

heading('Include the extend-module');
const extendedModule=module.require('./extended-module');

heading('Call both func in the base module - note error func is over-ridden');
baseModule.warn('Base module warning');
baseModule.error('Base module error');

heading('Call all 3 functions in the extend-module');
extendedModule.warn('Extended module warning');
extendedModule.warnTwice('Extended module warn twice');
extendedModule.error('Extended module error');

heading('Call the new function in the base-module');
baseModule.warnTwice('Base module warn twice');

heading('Test: base-module == extend-module?');
console.log(baseModule == extendedModule);


```

#### Output

File: module-use-example.out
```bash

Include the base-module
-----------------------

Call both functions in the base module
--------------------------------------
My Warning: Base module warning
My Error: Base module error

Include the extend-module
-------------------------

Call both func in the base module - note error func is over-ridden
------------------------------------------------------------------
My Warning: Base module warning
My Error: (now in upper) BASE MODULE ERROR

Call all 3 functions in the extend-module
-----------------------------------------
My Warning: Extended module warning
My Warning: Extended module warn twice Extended module warn twice
My Error: (now in upper) EXTENDED MODULE ERROR

Call the new function in the base-module
----------------------------------------
My Warning: Base module warn twice Base module warn twice

Test: base-module == extend-module?
-----------------------------------
true
```

