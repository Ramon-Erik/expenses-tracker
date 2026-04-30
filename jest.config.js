module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",

  transformIgnorePatterns: ["/node_modules/(?!(@vueuse|vue-demi)/)"],

  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,vue}",
    "!src/main.ts",
    "!src/router/index.ts",
    "!src/types-fix.d.ts",
    "!src/shims-vue.d.ts",
    "!node_modules/**",
    "!src/**/index.ts",
  ],

  coverageReporters: ["text", "lcov", "clover"],
};
