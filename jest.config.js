module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: 'TS151001',
      },
    },
  },
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverage: true,
};
