/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

module.exports = {
  root: true,
  env: {
    node: true,
  },

  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    ecmaVersion: 12,
    sourceType: "module",
    extraFileExtensions: [ '.vue' ]
  },

  extends: [
    'vuetify',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/vue3-essential',
    'prettier',
    '@vue/eslint-config-typescript',
  ],


  plugins: [
    '@typescript-eslint',
    'vue'

  ],

  rules: {
    'vue/multi-word-component-names': 'off',
    'prefer-promise-reject-errors': 'off',

    quotes: ['warn', 'single', { avoidEscape: true }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-unused-vars': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: ["state", "config"]
      }
    ],
    "no-shadow": "off",
    "prefer-destructuring": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/no-absolute-path": "off",
    "import/no-extraneous-dependencies": "off",
  }
}
