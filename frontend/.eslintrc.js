module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "prettier",
    "plugin:vue/essential",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "vue/multi-word-component-names": "off",
    "no-param-reassign": [2, { props: false }],
  },
};
