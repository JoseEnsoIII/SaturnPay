/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended"
  ],
  rules: {
     
    'vue/multi-word-component-names': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-unused-vars': 'off',
    'no-case-declarations': 'off',
    'no-unreachable': 'off'
  },
};
