module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Resolve o @/ do seu projeto
  },
  testMatch: ['**/tests/unit/**/*.spec.(js|ts)'],
  moduleFileExtensions: ['json', 'js', 'ts', 'vue'],
};
