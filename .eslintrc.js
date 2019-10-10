module.exports = {
  // 此項是用來告訴eslint找當前配置檔案不能往父級查詢
  root: true,
  // extends:'plugin:vue/recommended', // 這是預設推薦模式規則
  // extends:['plugin:vue/essential', 'airbnb-base'], // 使用 airbnb 規則
  // 使用 airbnb 規則
  'extends': ['plugin:vue/essential','airbnb-base'],
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
    "import/extensions": [0, "never", { "web.js": "never", "json": "never" }],
    "import/no-extraneous-dependencies": [0, { "devDependencies": true }],
    "import/no-unresolved": [0, { "ignore": ["antd-mobile"] }],
  },

  
}