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


