module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest', sourceType: 'module', project: ['./tsconfig.json'], tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh'],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/prop-types': [0],
    'react/require-default-props': [0],
    'max-len': ['error', 120],
    'no-param-reassign': ['error', { props: false }],
    'react/react-in-jsx-scope': 'off',
  },
};
