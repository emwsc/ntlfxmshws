module.exports = {
  automock: false,
  clearMocks: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
  roots: ["./src"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: ["\\\\node_modules\\\\"],
};
