<template>
  <div class="container">
    <Processbar
      v-if="!order.is_paid"
      process = "checkOrder"
    />
    <Processbar
      v-if="order.is_paid"
      process="pay"
    />
    <div class="my-5 row justify-content-center">
      <div class="col-lg-6 col-md-8">
        <!-- 訂單商品內容 -->
        <section
          id="accordionExample"
          class="accordion card-header-shadow border-0 mb-3"
        >
          <div class="card" >
            <div
              id="headingOne"
              class="card-header border bg-primary"
            >
              <h2 class="mb-0 ">
                <button
                  class="btn btn-link text-white"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  顯示購物車細節
                  <i class="fas fa-hand-point-left text-warning ml-1 fa-lg"/>
                </button>
              </h2>
            </div>
            <!-- 加入 .show 預設展開購物車 -->
            <div
              id="collapseOne"
              class="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div class="card-body bg-secondary">
                <table class="table table-responsive-md">
                  <thead>
                    <tr class="text-warning">
                      <th
                        class="align-middle"
                        width="100"
                      >
                        商品圖片
                      </th>
                      <th class="align-middle">商品名稱</th>
                      <th
                        class="align-middle"
                        width="80"
                      >
                        數量
                      </th>
                      <th
                        class="align-middle"
                        width="80"
                      >
                        小計
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="product in products"
                      :key="product.id"
                      class="text-white"
                    >
                      <td class="align-middle">
                        <img
                          :src="product.product.imageUrl"
                          class="img-fluid"
                          alt=""
                        >
                      </td>
                      <td class="align-middle">{{ product.product.title }}</td>
                      <td class="align-middle">{{ product.qty }}/{{ product.product.unit }}</td>
                      <td class="align-middle text-right">{{ product.final_total | currency }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr
                      v-if="order.total<3000"
                      class="text-white"
                    >
                      <td
                        colspan="3"
                        class="text-right"
                      >
                        <b>運費</b>
                      </td>
                      <td class="text-right"><b>$ 60</b></td>
                    </tr>
                    <tr
                      v-if="order.total>=3000"
                      class="text-white"
                    >
                      <td
                        colspan="3"
                        class="text-right"
                      >
                        <b>免運費</b>
                      </td>
                      <td class="text-right"><del><b>$ 60</b></del></td>
                    </tr>
                    <tr
                      v-if="order.total<3000"
                      class="text-danger"
                    >
                      <td
                        colspan="3"
                        class="text-right"
                      >
                        <b>應付金額</b>
                      </td>
                      <td class="text-right"><b>{{ order.total + 60 |currency }}</b></td>
                    </tr>
                    <tr
                      v-if="order.total>=3000"
                      class="text-danger"
                    >
                      <td
                        colspan="3"
                        class="text-right"
                      >
                        <b>應付金額</b>
                      </td>
                      <td class="text-right"><b>{{ order.total |currency }}</b></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div class="bg-secondary ">
              <h3 class="text-warning text-center mt-2">確認基本資料</h3>
              <table class="table ">
                <tbody class="text-white">
                  <tr>
                    <th>姓名</th>
                    <td>{{ user.name }}</td>
                  </tr>
                  <tr>
                    <th>電子郵件</th>
                    <td>{{ user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ user.address }}</td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td
                      v-if="!order.is_paid"
                      class="text-danger"
                    >
                      <b>未付款</b>
                    </td>
                    <td
                      v-if="order.is_paid"
                      class="text-success"
                    >
                      <b>已付款</b>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                v-if="!order.is_paid"
                class="text-right mb-2 mx-3"
              >
                <button
                  class="btn btn-danger w-100-mobile"
                  @click="payOrder()"
                >
                  確認付款
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Processbar from '../../../components/Frontdesk/Processbar';

export default {
  components: {
    Processbar,
  },
  data() {
    return {
      orderId: '',
      order: {},
      products: [], // 已送出的訂單商品資料
      user: {}, // 基本資料
      isLoading: false,
    };
  },
  created() {
    const vm = this;
    vm.orderId = vm.$route.params.orderId; // 從當前路由的自訂參數取得的訂單id
    vm.getOrder();
  },
  methods: {
    getOrder() {
      const vm = this;
      const apiPath = process.env.VUE_APP_APIPATH; // 表示從config/dev.env.js裡的APIPATH變數
      const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
      vm.isLoading = true;
      const api = `${apiPath}/api/${customPath}/order/${vm.orderId}`; // 取得產品資訊的Api + 取得依照頁碼顯示對應的產品資訊
      this.$http.get(api).then((response) => {
        vm.order = response.data.order;
        vm.products = response.data.order.products;
        vm.user = response.data.order.user;
        vm.isLoading = false;
      });
    },
    payOrder() {
      const apiPath = process.env.VUE_APP_APIPATH; // 表示從config/dev.env.js裡的APIPATH變數
      const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
      const vm = this;
      vm.isLoading = true;
      const api = `${apiPath}/api/${customPath}/pay/${vm.orderId}`; // 以id對當前訂單進行結帳的Api
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.getOrder(); // 結帳完重新整理
          vm.$bus.$emit('message:push', response.data.message, 'success');
        }
        vm.isLoading = false;
      });
    },
  },
};
</script>

<style lang="css">
@media(max-width: 767px){
  .w-100-mobile{
    width: 100%;
  }
}
</style>
