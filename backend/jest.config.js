module.exports = {
    testEnvironment: 'node',  // Tells Jest to use the Node.js environment (as opposed to jsdom)
    verbose: true,           // Make test output more verbose
    transform: {
      '^.+\\.js$': 'babel-jest',  // For ES6+ syntax (optional, only if you need Babel)
    },
  };
  