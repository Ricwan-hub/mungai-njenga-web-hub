module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // if you have a setup file
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // To handle path aliases like @/
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy' // To mock CSS imports
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.app.json'
    }
  }
};
