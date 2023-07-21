module.exports = {
  extends: ['../.eslintrc.js', 'plugin:react-hooks/recommended', 'plugin:mobx/recommended'],
  plugins: ['react-hooks', 'mobx'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
