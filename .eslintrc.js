module.exports = {
  root: true,  //此項是用來告訴eslint找當前配置檔案不能往父級查詢
  extends: 'plugin:vue/essential',
  rules: {
    "no-empty": 2, //不允許出現空的程式碼塊
    "no-extra-parens": 2, //不允許出現不必要的圓括號
    "no-extra-semi": 2, //不允許出現不必要的分號
    "no-irregular-whitespace": 2, //不允許出現不規則的空格
    "no-sparse-arrays": 2, //陣列中不允許出現空位置
    "no-extra-parens": 2, //不允許出現多餘的括號
    "no-var": 2, //使用let和const代替var
    "no-multi-spaces": 2, //不允許多餘空格
  },  
}