<template>
  <div class="search-container">
    <form class="form-inline">
      <div class="input-group input-width-100">
        <input
          v-model="searchContent"
          class="form-control"
          type="search"
          placeholder="輸入商品關鍵字"
          aria-label="Search"
          @input.prevent="showMatch"
          @keydown.prevent="clickToMatch"
        >
        <div class="input-group-append">
          <button
            id="button-addon2"
            class="btn btn-outline-warning"
            type="button"
            @click.prevent="clickToMatch"
          >
            <i class="fas fa-search"/>
          </button>
        </div>
      </div>
    </form>
    <div
      v-show="searchContent"
      class="search-result"
    >
      <table class="table mb-1">
        <thead>
          <tr class="border-0">
            <th
              class="text-muted"
              colspan="2"
            >
              搜尋結果
            </th>
          </tr>
        </thead>
        <tbody v-if="searchContent">
          <tr
            v-for="result in searchMatch"
            :key="result.id"
            class="search-result-item border-0"
            @click.prevent="toMatchDetail(result.id)"
          >
            <td> <b>{{ result.title }}</b> </td>
            <td class="text-warning text-right">{{ result.price | currency }} </td>
          </tr>
        </tbody>
        <tbody v-if="searchMatch.length === 0">
          <tr class="border-0">
            <td
              class="text-danger"
              colspan="2"
            >
              沒有此商品
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import $ from 'jquery';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      searchMatch: [], // 從所有商品用match抓出的搜尋結果
      searchContent: '', // 搜尋input
    };
  },
  computed: {
    ...mapGetters('productsModules', ['allProducts']),
  },
  created() {
    // const vm = this;
    // vm.getAllProduct();
  },
  methods: {
    getMatch() {
      const vm = this;
      vm.searchMatch = vm.allProducts.filter((item) => item.title.match(vm.searchContent));
    },
    showMatch() { // 沒有輸入任何字，隱藏list
      const vm = this;
      if (vm.searchContent === '') {
        $('.search-result').hide();
      } else {
        $('.search-result').show();
        vm.getMatch();
      }
    },
    toMatchDetail(id) {
      const vm = this;
      if (vm.$route.path === `/product_detail/${id}`) { // 當已經在搜尋的商品的詳細頁面時，清空input並保持當前頁面
        vm.searchContent = '';
        return;
      }
      vm.$store.dispatch('updateLoading', true);// 不是在搜尋頁面在起讀取效果
      vm.$router.push(`/product_detail/${id}`);
      if (vm.$route.name === 'ProductDetail') { // 路由已變更為商品詳細路由
        window.location.reload(); // 當在其他商品詳細頁面切換到其他商品詳細時，因為vue在相同元件下資料雖然已變化卻不會渲覽，因此需重新整理，
      }
      vm.searchContent = '';
      vm.$store.dispatch('updateLoading', false);
    },
    clickToMatch() { // 輸入正確完整商品名稱再按搜尋
      const vm = this;
      const result = vm.allProducts.find((item) => item.title === vm.searchContent);
      if (result) { // 當確定搜尋到結果
        if (vm.$route.path === `/product_detail/${result.id}`) { // 當已經在搜尋的商品的詳細頁面時，清空input並保持當前頁面
          vm.searchContent = '';
          return;
        }
        vm.$store.dispatch('updateLoading', true);
        vm.$router.push(`/product_detail/${result.id}`);
        if (vm.$route.name === 'ProductDetail') { // 路由已變更為商品詳細路由
          window.location.reload(); // 當在其他商品詳細頁面切換到其他商品詳細時，因為vue在相同元件下資料雖然已變化卻不會渲覽，因此需重新整理，
        }
        vm.searchContent = '';
        vm.$store.dispatch('updateLoading', false);
      }
    },
  },
};
</script>
