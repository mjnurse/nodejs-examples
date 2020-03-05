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
