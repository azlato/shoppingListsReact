module.exports = {
  env: { es2020: true, node: true },
  extends: [
    'airbnb',
  ],
  pluging: ['jest'],
  parserOptions: {
    ecmaVersion: 'latest', sourceType: 'module',
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'max-len': ['error', 120],
    'no-param-reassign': ['error', { props: false }],
  },
};
