import Vue from 'vue';
import Vuex from 'vuex';
import store from './store';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VeeValidate from 'vee-validate'; // 表單驗證套件，http://vee-validate.logaretm.com/v2/guide/rules.html#after ，官方文件規則
import zhTW from 'vee-validate/dist/locale/zh_TW' ; // 載入vee-validate  繁體中文語系
import VueI18n from 'vue-i18n'; // 載入vue-i18n
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueAxios from 'vue-axios' 
import 'bootstrap';
import './bus' ;
import currencyFilter from './fillters/currency';
import timeStampFilter from './fillters/unixFormat';

Vue.use(VueAxios, axios)
Vue.use(Vuex);
Vue.use(VueI18n); // 使用i18n
const i18n = new VueI18n({ //建立新 VueI18n 
  locale: 'zhTW',
  silentFallbackWarn: true
});
Vue.use(VeeValidate, { // 啟用validate並結合 i18n功能
  i18n,
  dictionary: {
    zhTW , //套用vee-validate字典
    // silentTranslationWarn: process.env.NODE_ENV === 'production'
  }
});


Vue.config.productionTip = false

Vue.component('Loading',Loading); // 用 Vue.component 全域載入loding功能，這樣所有元件都能使用

Vue.filter('currency',currencyFilter); // 用全域方式註冊千分位filter
Vue.filter('timeStamp',timeStampFilter); // 用全域方式註冊UNIX時間碼轉換filter

axios.defaults.withCredentials = true; // 將後端的session 存入使用者的cookie
/* eslint-disable no-new */

new Vue({
  router,
  store,
  i18n, //使用 i18n功能
  render: h => h(App)
}).$mount('#app')


router.beforeEach((to, from, next) => { // router.beforeEach((to, from, next)，此方法在切換路由時會啟用
    if(to.meta.requiresAuth){ // to 代表要連去的路由，當to.meta.requiresAuth 是 true 表示當目前要連上的路由需要進行驗證
      const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
      const api = `${apiPath}/api/user/check` ; // 使用檢查用戶是否仍持續登入api
      // API 伺服器路徑
      // 申請的 API path
      axios.post(api).then((response) => { // 特別注意這裡的函式不是在vue下執行，而是直接使用router的方法 所以不能用 this.$http.post ，而是直接用 axios.post
        if(response.data.success){ // 當在登入狀態時，放行 next()
          next();
        }
        else{ // 當不是在登入狀態時，連到login路由
          next({
            path:'/login'
          })
        }
      }) 
    }
    else{ // 當to.meta.requiresAuth 不是 true 表示要連上此路由不需要進行驗證，可以直接放行
      next();
    }
  }
)