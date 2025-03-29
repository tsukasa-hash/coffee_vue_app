module.exports = {
    root: true,
    // extends: ['standard', 'plugin:vue/essential', 'plugin:prettier/recommended'],
    extends: ['plugin:vue/essential', 'plugin:prettier/recommended',
      "eslint-config-prettier",],
    plugins: ['vue'],
    parser: "@typescript-eslint/parser",
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
      "@typescript-eslint/typedef": [
      "error",
      {
        variableDeclaration: true,
        memberVariableDeclaration: true,
        propertyDeclaration: true,
        variableDeclarationIgnoreFunction: true,
        arrayDestructuring: true,
        objectDestructuring: true,
        parameter: true,
        arrowParameter: true,
      },
    ],
    },
  }