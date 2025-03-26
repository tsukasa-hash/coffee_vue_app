module.exports = {
    root: true,
    // extends: ['standard', 'plugin:vue/essential', 'plugin:prettier/recommended'],
    extends: ['plugin:vue/essential', 'plugin:prettier/recommended'],
    plugins: ['vue'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          // 行末のセミコロンはなし
          semi: '--no-semi',
          // 文字列の囲みをシングルクオートでなくて良い
          singleQuote: false,
          trailingComma: 'es5',
          // 行末はなんであってもよい
          endOfLine: 'auto'
        },
      ],
    },
  }