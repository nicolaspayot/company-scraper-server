module.exports = {
  extends: ['eslint:recommended', 'plugin:node/recommended', 'plugin:prettier/recommended', 'plugin:jest/recommended'],
  plugins: ['jest'],
  env: {
    node: true,
    'jest/globals': true,
  },
};
