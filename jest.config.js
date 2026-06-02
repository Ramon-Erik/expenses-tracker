module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",

  transformIgnorePatterns: [
    "node_modules/(?!(vuetify|@mdi|@vueuse|vue-demi)/)",
  ],

  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.(js|jsx|mjs)$": "babel-jest",
  },

  moduleFileExtensions: ["js", "ts", "json", "vue", "mjs"],

  collectCoverage: true,
  coverageProvider: "v8",
  collectCoverageFrom: [
    "src/**/*.{ts,vue}",
    "!src/main.ts",
    "!src/router/index.ts",
    "!src/types-fix.d.ts",
    "!src/shims-vue.d.ts",
    "!node_modules/**",
    "!src/**/index.ts",
    "!src/plugins/**",
    "!src/interfaces/**",
  ],

  coverageReporters: ["text", "lcov", "clover"],
};
