import axios from 'axios';

export default {
  namespaced: true,
  state: {
    products: [],
    pagination: {},
    allProducts: [],
  },
  mutations: {
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
    ALLPRODUCTS(state, payload) {
      state.allProducts = payload.sort((a, b) => (a.category < b.category ? 1 : -1));
    },
  },
  actions: {
    // 預設目前頁數為第1頁 ，每次切換頁面 page 都會改變，並以此 page 切換 api 請求的 query 參數 page 的值
    getProducts(context, page = 1) {
      const apiPath = process.env.VUE_APP_APIPATH; // 表示從config/dev.env.js裡的APIPATH變數
      const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
      context.commit('LOADING', true, { root: true }); // { root: true } 因 loading 是主要 index.js 檔案的內容，即全域，而目前此模組使用 namespcae: true 把 getter 、 mutaion 、 action 從全域變成區域，加入 root:true 能告訴模組此內容是來自全域的內容
      const api = `${apiPath}/api/${customPath}/products?page=${page}`; // 取得產品資訊的Api
      axios.get(api).then((response) => {
        if (response.data.success) {
          context.commit('PRODUCTS', response.data.products);
          context.commit('LOADING', false, { root: true }); // root: true 表示調用的方法來自 index.js(主模組)
          context.commit('PAGINATION', response.data.pagination);
        }
      });
    },
    getAllProduct(context) { // 取得所有商品用來 製作分類選單 與 fillter computed
      const apiPath = process.env.VUE_APP_APIPATH; // 表示從config/dev.env.js裡的APIPATH變數
      const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
      context.commit('LOADING', true, { root: true });
      const api = `${apiPath}/api/${customPath}/products/all`; // 取得產品資訊的Api
      axios.get(api).then((response) => {
        if (response.data.success) {
          context.commit('ALLPRODUCTS', response.data.products);
          context.commit('LOADING', false, { root: true });
        }
      });
    },
  },
  getters: {
    products(state) {
      return state.products;
    },
    pagination(state) {
      return state.pagination;
    },
    allProducts(state) {
      return state.allProducts;
    },
  },
};
