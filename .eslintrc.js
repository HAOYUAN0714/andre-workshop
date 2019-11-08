module.exports = {
  // 此項是用來告訴eslint找當前配置檔案不能往父級查詢，開啟自訂功能
  root: true,
  // extends:'plugin:vue/recommended', // 這是預設推薦模式規則
  'extends': ['plugin:vue/essential','airbnb-base'], // 使用 airbnb 規則
  env:{
    es6: true,
    node: true,
    browser: true,
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-console': 0,
    'no-debugger': 0,
    'no-alert': 0,
    'no-param-reassign':0, // 允許對函式參數重新賦值，主要針對 vuex store mutation 進行修正
    // 消除相對路徑偵測bug
    "import/extensions": [0, "never", { "web.js": "never", "json": "never" }],
    "import/no-extraneous-dependencies": [0, { "devDependencies": true }],
    "import/no-unresolved": [0, { "ignore": ["antd-mobile"] }],
    // crlf 抱錯
    "linebreak-style": ["off", "windows"]
  },


}