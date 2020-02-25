// Create a module exporter.
const exporter=module.exports={};

// Add two functions to the module.
exporter.warn=function(message) {
  console.log('My Warning: ' + message);
};

exporter.error=function(message) {
  console.log('My Error: ' + message);
};
