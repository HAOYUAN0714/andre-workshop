<template>
  <div id="app">
    <loading :active.sync="isLoading"
      :opacity=1
      :z-index=2000
      background-color="#000"
      color=#fff
    />
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isLoading']),
  },
  created() {
    const vm = this;
    vm.getCart();
    vm.getAllProduct();
  },
  methods: { // 許多元件套用相同方法或元件在同一頁面上重複出現時 把重複使用到的AJAX請求統一放到APP管理 mapGetters就放到各自要接收ajax資料的元件裡做同步更新
    ...mapActions('cartsModules', ['getCart']), // 購物車資料更新 ， 每個頁面都有購物車因此把購物車更新方法放在APP
    ...mapActions('productsModules', ['getAllProduct']), // 取得所有商品資訊 ， 首頁 search Navbar 都有用到 所以統一管理在APP
  },
};
</script>

<style lang='scss'>
@import './assets/all';

</style>
