module.exports = {
  extends: ["airbnb-base"],
  parser: "babel-eslint",
  env: {
    es6: true,
    browser: true,
    jquery: true,
    node: true
  },
  rules: {
    quotes: [2, "double", "avoid-escape"],
    "consistent-return": 1,
    "arrow-parens": ["error", "as-needed"],
    "prefer-const": 1,
    "no-use-before-define": [2, { functions: false }],
    "no-debugger": ["warn"],
    "no-console": ["warn"]
  }
};
