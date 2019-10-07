import Vue from 'vue';

Vue.prototype.$bus = new Vue();  // 新增1個方法bus到Vue的prototype 

// 錯誤提示訊息
// vm.$bus.$emit('message:push','訊息內容','bootstrap顏色')
// 'message:push'不動
// 帶入要顯示的訊息
// 對應bootsrap的顏色 如 danger、success
