module.exports = {
  env: {
    es2020: true,
    node: true
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    indent: ['error', 2],
    'space-before-function-paren': 0
  }
}
