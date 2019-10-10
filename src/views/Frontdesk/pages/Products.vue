<template>
  <div class="container">
    <div class=" mb-4">
      <div class="row">
        <!-- md以上選單 -->
        <div class="col-lg-3 col-md-4 mt-4 d-none d-md-block">
          <div class="list-group sticky-top rounded text-center">
            <a
              href="#"
              class="list-group-item list-group-item-action  disabled bg-secondary"
              tabindex="-1"
              aria-disabled="true"
            >
              <h4 class="text-white">
                <i class="fas fa-boxes mr-2"/>
                品項分類
              </h4>
            </a>
            <a
              :class="{ active: categoryName === 'all' }"
              class="
                list-group-item
                list-group-item-action
                list-group-item-primary
                border-left-0 border-right-0
              "
              href="#"
              @click.prevent="categoryName = 'all'"
            >
              所有商品
            </a>
            <template v-for="(item,index) in filterCategories">
              <a
                :class="{ active: categoryName === item }"
                :key="index"
                class="
                  list-group-item
                  list-group-item-action
                  list-group-item-primary
                  border-left-0 border-right-0
                "
                href="#"
                @click.prevent="categoryName = item"
              >
                {{ item }}
              </a>
            </template>
          </div>
        </div>
        <!-- md以下選單 -->
        <section class="bg-secondary p-3 d-md-none ">
          <div class="col d-flex  flex-wrap text-center">
            <div
              :class="{ 'mobile-products-category' : categoryName === 'all' }"
              class="col-6"
            >
              <a
                :class="{ 'active': categoryName === 'all' }"
                class="text-white"
                href="#"
                @click.prevent="categoryName = 'all'"
              >
                <div class="icon-container">
                  <img
                    class="icon"
                    src="https://i.postimg.cc/k4gb3v7F/box-icon-y.png"
                  >
                </div>
                <h6>所有商品</h6>
              </a>
            </div>
            <template v-for="(item,index) in filterCategories">
              <div
                :class="{ 'mobile-products-category' : categoryName === item }"
                :key="index"
                class="col-6"
              >
                <a
                  :class="{ 'active': categoryName === item }"
                  class="text-white"
                  href="#"
                  @click.prevent="categoryName = item"
                >
                  <div class="icon-container">
                    <img
                      v-if="item === '磐石堅盾'"
                      class="icon"
                      src="https://i.postimg.cc/wTsGJhDB/shield-icon-y.png"
                    >
                    <img
                      v-if="item === '硬核鎧甲'"
                      class="icon"
                      src="https://i.postimg.cc/c1VBYPsp/armor-icon-y.png"
                    >
                    <img
                      v-if="item === '獵手套裝'"
                      class="icon"
                      src="https://i.postimg.cc/rwqWNk7P/coat-y.png"
                    >
                    <img
                      v-if="item === '戰士鋒芒'"
                      class="icon"
                      src="https://i.postimg.cc/ydswVWGT/sword-icon-y.png"
                    >
                    <img
                      v-if="item === '機關兵器'"
                      class="icon"
                      src="https://i.postimg.cc/hPN4Kb1b/1284-shotgun-512-y.png"
                    >
                    <img
                      v-if="item === '救命稻草'"
                      class="icon"
                      src="https://i.postimg.cc/GhmdFgqj/medicine-icon-y.png"
                    >
                    <img
                      v-if="item === '全新設計'"
                      class="icon"
                      src="https://i.postimg.cc/4yn2dcQp/Very-Basic-Design-icon-y.png"
                    >
                  </div>
                  <h6>{{ item }}</h6>
                </a>
              </div>
            </template>
          </div>
        </section>
        <section class="col-lg-9 col-md-8">
          <div class="row">
            <div
              v-for="item in filterProducts"
              :key="item.id"
              class="col-lg-4 col-md-6 mt-4 px-2"
            >
              <div
                class="card border-0 shadow-sm"
                style="postion:relative"
              >
                <div
                  v-if="!item.is_enable"
                  class="ribbon ribbon-top-right"
                >
                  <span class="bg-danger text-white">熱銷</span>
                </div>
                <div class="scale-hidden">
                  <div
                    :style="{backgroundImage:`url(${item.imageUrl})`}"
                    class="d-flex justify-content-center align-items-center img-height bg-scale"
                    style=" background-size: cover; background-position: center ;cursor:pointer"
                  >
                    <a
                      class="w-100 h-100"
                      href="#"
                      @click.prevent="pushToDetail(item.id)"
                    />
                  </div>
                </div>
                <div class="card-body text-white bg-dark">
                  <h5 class="card-title text-center">
                    <a
                      class="text-warning productTitle text-shadow-red"
                      href="#"
                      style="text-decoration:none"
                      @click.prevent="pushToDetail(item.id)"
                    >
                      {{ item.title }}
                    </a>
                  </h5>
                  <div class="d-flex justify-content-around align-items-baseline ">
                    <!-- <del class="h6">{{ item.origin_price | currency }}</del> -->
                    <div
                      v-if="item.price > 0 "
                      class="h5 font-weight-bold text-danger"
                    >
                      {{ item.price | currency }}
                    </div>
                    <div
                      v-if="item.price == 0"
                      class="h5 font-weight-bold text-danger"
                    >
                      視訂製內容決定價格
                    </div>
                  </div>
                </div>
                <div class="card-footer d-flex bg-secondary justify-content-between">
                  <button
                    v-if="item.is_enable"
                    :disabled="isdisabled"
                    class="btn btn-primary btn-sm d-none d-md-block"
                    type="button"
                    @click = "pushToDetail(item.id)"
                  >
                    產品介紹
                  </button>
                  <button
                    v-if="item.is_enable"
                    :disabled="isdisabled"
                    class="btn btn-danger  max-md-w-100 btn-pad-sm"
                    type="button"
                    @click.prevent="addtoCart(item.id)"
                  >
                    <i
                      v-if="status.loadingItem"
                      class="fas fa-spinner fa-spin"
                    />
                    加入訂製
                  </button>
                  <button
                    v-if="!item.is_enable"
                    class="btn btn-danger btn-sm w-100 "
                    type="button"
                    disabled
                  >
                    原料不足，暫停供應
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div v-if=" categoryName === 'all' ">
      <Pagination
        :pagination-prop="pagination"
        @emit-update-page="getProducts"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Pagination from '../../../components/Pagination'; // 載入Pagination元件 頁碼
// import $ from 'jquery';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      categories: [], // 所有類別
      categoryName: 'all', // 當前顯示分類 ，預設顯示全部
      coupon_code: '', // 從model撈取套用的優惠券碼
    };
  },
  computed: {
    filterCategories() { // 取得所有類別
      const vm = this;
      const categoryArray = vm.allProducts.map((item) => item.category); // 得到只有分類名稱的陣列;
      return categoryArray.filter((item, index, array) => array.indexOf(item) === index); // 過濾重複類別
    },
    filterProducts() { // 過濾頁籤顯示
      const vm = this;
      if (vm.categoryName === 'all') {
        return vm.products;
      }
      return vm.allProducts.filter((item) => item.category === vm.categoryName);
    },
    ...mapGetters('productsModules', ['products', 'pagination', 'allProducts']),
    ...mapGetters('cartsModules', ['status', 'isdisabled']),
  },
  created() {
    const vm = this;
    vm.getProducts();
    // vm.getAllProduct();
    vm.categoryName = vm.$route.query.category || 'all'; // 一般點擊所有商品時 categoryName 初始值同常為 'all' ，但當由其他頁面載入分類商品時， categoryName會是點擊分類裡的query設定值，此值一開始由route的props指向而來
  },
  methods: {
    ...mapActions('productsModules', ['getProducts']),
    addtoCart(id, qty = 1) {
      this.$store.dispatch('cartsModules/addtoCart', { id, qty });
    },
    pushToDetail(productId) {
      const vm = this;
      vm.$router.push(`/product_Detail/${productId}`);
    },
  },
};
</script>
