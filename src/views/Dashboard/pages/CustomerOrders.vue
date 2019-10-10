<template>
  <div>
    <!-- <loading :active.sync="isLoading" ></loading>         -->
    <div class="row">
      <div
        v-for="item in products"
        :key="item.id"
        class="col-md-4 mb-4"
      >
        <div class="card border-0 shadow-sm">
          <div
            :style="{backgroundImage:`url(${item.imageUrl})`}"
            style="height: 350px; background-size: cover; background-position: center"
          />
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a
                href="#"
                class="text-dark"
              >
                {{ item.title }}
              </a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <del class="h6">原價 {{ item.origin_price | currency }} 元</del>
              <div class="h5">現在只要 {{ item.price | currency }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              class="btn btn-outline-secondary btn-sm"
              type="button"
              @click = "getProduct(item.id)"
            >
              <i
                v-if="status.loadingItem === item.id"
                class="fas fa-spinner fa-spin"
              />
              查看更多
            </button>
            <button
              class="btn btn-outline-danger btn-sm ml-auto"
              type="button"
              @click="addtoCart(item.id)"
            >
              <i
                v-if="status.loadingItem === item.id"
                class="fas fa-spinner fa-spin"
              />
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <Pagination
      :pagination-prop="pagination"
      @emit-update-page="getProducts"
    />
    <hr>
    <!-- 購物車清單 -->
    <div
      v-if="carts.length !== 0"
      class="row d-flex justify-content-center"
    >
      <div class="col-6">
        <table class="table" >
          <thead>
            <tr>
              <th width="80"/>
              <th>品名</th>
              <th width="80">數量</th>
              <th width="100">單價</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="cart in carts"
              :key="cart.id"
            >
              <td>
                <button
                  class="btn btn-outline-danger btn-sm"
                  @click="removeCart(cart.id)"
                >
                  <i class="fas fa-trash-alt"/>
                </button>
              </td>
              <td>{{ cart.product.title }}</td>
              <td>{{ cart.qty }} / {{ cart.product.unit }} </td>
              <td class="text-right">{{ cart.product.price | currency }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="font-weight-bold">
              <td
                class="text-right"
                colspan="3"
              >總計</td>
              <td class="text-right">{{ cartsData.total | currency }}</td>
            </tr>
            <tr
              v-if="cartsData.final_total !== cartsData.total"
              class="text-success font-weight-bold"
            >
              <td
                class="text-right"
                colspan="3"
              >
                折扣價
              </td>
              <td class="text-right">{{ cartsData.final_total | currency }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3">
          <input
            v-model="coupon_code"
            class="form-control"
            type="text"
            placeholder="請輸入優惠碼"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          >
          <div class="input-group-append">
            <button
              id="button-addon2"
              class="btn btn-outline-secondary"
              type="button"
              @click="addCouponCode"
            >
              套用優惠碼
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 訂單表單內容 -->
    <div class="my-5 row justify-content-center">
      <form
        class="col-md-6"
        @submit.prevent="createOrder"
      >
        <div class="form-group">
          <label for="useremail">Email <span class="text-danger">(必填)</span></label>
          <input
            v-validate="'required|email'"
            id="useremail"
            :class="{'is-invalid':errors.has('email')}"
            v-model="form.user.email"
            class="form-control"
            placeholder="請輸入 Email"
            type="email"
            name="email"
          >
          <span
            v-if="errors.has('email')"
            class="text-danger"
          >
            {{ errors.first('email') }}
          </span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名 <span class="text-danger">(必填)</span></label>
          <input
            v-validate="'required'"
            id="username"
            :class="{'is-invalid':errors.has('name')}"
            v-model="form.user.name"
            class="form-control"
            placeholder="輸入姓名"
            type="text"
            name="name"
          >
          <span
            v-if="errors.has('name')"
            class="text-danger"
          >
            請填寫您的真實姓名
          </span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話 <span class="text-danger">(必填)</span></label>
          <input
            v-validate="'required'"
            id="usertel"
            :class="{'is-invalid':errors.has('tel')}"
            v-model="form.user.tel"
            class="form-control"
            type="tel"
            name="tel"
            placeholder="請輸入電話"
          >
          <span
            v-if="errors.has('tel')"
            class="text-danger"
          >
            請留下連絡電話
          </span>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址 <span class="text-danger">(必填)</span></label>
          <input
            v-validate="'required'"
            id="useraddress"
            v-model="form.user.address"
            :class="{'is-invalid':errors.has('address')}"
            class="form-control"
            name="address"
            type="text"
            placeholder="請輸入地址"
          >
          <span
            v-if="errors.has('address')"
            class="text-danger"
          >
            貨物送達地址務必填寫
          </span>
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            id="comment"
            v-model="form.message"
            class="form-control"
            cols="30"
            rows="10"
            placeholder="如有特殊要求請在此留言，例如:可收件的時段"
          />
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
    <!-- 查看更多Modal -->
    <div
      id="productModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5
              id="productModalLabel"
              class="modal-title"
            >
              {{ product.title }}
            </h5>
            <button
              class="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img
              :src="product.imageUrl"
              class="img-fluid"
            >
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div
                v-if="!product.price"
                class="h5 ml-auto"
              >
                {{ product.origin_price | currency }}元
              </div>
              <del
                v-if="product.price"
                class="h6"
              >
                原價 {{ product.origin_price | currency }}元
              </del>
              <div
                v-if="product.price"
                class="h5"
              >
                現在只要 {{ product.price | currency }}元
              </div>
            </div>
            <select
              v-model="product.num"
              class="form-control mt-3"
            >
              <option
                v-for="num in 10"
                :value="num"
                :key="num"
              >
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div
              v-if="product.num>=1"
              class="text-muted text-nowrap mr-3"
            >
              小計
              <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              class="btn btn-primary"
              type="button"
              @click="addtoCart(product.id,product.num)"
            >
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import $ from 'jquery';
import Pagination from '../../../components/Pagination'; // 載入Pagination元件 頁碼

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      products: [], // 所有商品資訊
      product: {}, // 單一商品資訊
      carts: [], // 撈取購物車資料
      cartsData: {}, // 購物車金額總計資料
      isLoading: false,
      status: {
        loadingItem: '', // 用來存放點擊查看更多的商品id，是用來判斷是哪個商品的查看更多被點擊再賦予loading效果
      },
      coupon_code: '', // 從model撈取套用的優惠券碼
      form: { // 撈取要送出的表單資料
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      pagination: {},
    };
  },
  created() {
    this.getProducts();
    this.getCart();
  },
  methods: {
    getProducts(page = 1) {
      const apiPath = process.env.VUE_APP_APIPATH; // 表示從config/dev.env.js裡的APIPATH變數
      const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
      const vm = this;
      vm.$store.dispatch('updateLoading', true);
      const api = `${apiPath}/api/${customPath}/products?page=${page}`; // 取得產品資訊的Api
      this.$http.get(api).then((response) => {
        vm.products = response.data.products.sort((a, b) => (a.category < b.category ? 1 : -1));
        console.log('模擬訂單商品列表回應', vm.products);
        vm.$store.dispatch('updateLoading', false);
        vm.pagination = response.data.pagination;
      });
    },
    getProduct(id) { // 點擊查看更多 傳入參數單一商品id
      const apiPath = process.env.VUE_APP_APIPATH; // 表示從config/dev.env.js裡的APIPATH變數
      const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
      const vm = this;
      vm.status.loadingItem = id; // 撈取點擊的品id
      const api = `${apiPath}/api/${customPath}/product/${id}`; // 依照取得的id獲得單一產品資訊的Api
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
        $('#productModal').modal('show');
        console.log('單一商品資訊', vm.product);
        vm.status.loadingItem = ''; // 讀取到單一商品資料並打開modal後 將vm.status.loadingItem 清空，使其不被判斷為loading
      });
    },
    addtoCart(id, qty = 1) { // 點擊加入購物車含modal的部分 傳入參數單一商品id和選購數量並預設置至少為1
      const apiPath = process.env.VUE_APP_APIPATH; // 表示從config/dev.env.js裡的APIPATH變數
      const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
      const vm = this;
      vm.status.loadingItem = id; // 撈取點擊的品id
      const cart = {
        product_id: id, // 傳入參數單一商品id
        qty, // 選購數量
      };
      const api = `${apiPath}/api/${customPath}/cart`; // 依照取得的id獲得單一產品資訊的Api
      this.$http.post(api, { data: cart }).then((response) => {
        console.log('加入購物車回傳訊息', response);
        vm.status.loadingItem = ''; // 讀取到單一商品資料並打開modal後 將vm.status.loadingItem 清空，使其不被判斷為loading
        vm.getCart(); // 加入購物車後更新購物車內容
        $('#productModal').modal('hide'); // 加入購物車後關閉modal
      });
    },
    getCart() { // 更新取得購物車內容
      const apiPath = process.env.VUE_APP_APIPATH; // 表示從config/dev.env.js裡的APIPATH變數
      const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
      const vm = this;
      vm.$store.dispatch('updateLoading', true);
      const api = `${apiPath}/api/${customPath}/cart`; // 取得購物車資訊的Api
      this.$http.get(api).then((response) => {
        // console.log('已加入購物車的內容',response);
        vm.carts = response.data.data.carts;
        vm.cartsData = response.data.data;
        console.log('購物車的內容', vm.carts);
        vm.$store.dispatch('updateLoading', false);
      });
    },
    removeCart(id) { // 刪除購物車按鈕，帶入要刪除的商品id
      const apiPath = process.env.VUE_APP_APIPATH; // 表示從config/dev.env.js裡的APIPATH變數
      const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
      const vm = this;
      vm.$store.dispatch('updateLoading', true);
      const api = `${apiPath}/api/${customPath}/cart/${id}`; // 根據購物車商品id刪除購物車的Api
      this.$http.delete(api).then((response) => {
        console.log('刪除購物車訊息', response);
        vm.getCart(); // 刪除完後重新更新購物車
        vm.$store.dispatch('updateLoading', false);
      });
    },
    addCouponCode() {
      const apiPath = process.env.VUE_APP_APIPATH; // 表示從config/dev.env.js裡的APIPATH變數
      const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
      const vm = this;
      const coupon = { code: vm.coupon_code };
      vm.$store.dispatch('updateLoading', true);
      const api = `${apiPath}/api/${customPath}/coupon`; // 套用優惠券並重新計算總計價格Api
      this.$http.post(api, { data: coupon }).then((response) => {
        console.log('套用的優惠券訊息', response);
        vm.getCart(); // 套用優惠券後重新更新購物車
        vm.$store.dispatch('updateLoading', false);
      });
    },
    createOrder() {
      const apiPath = process.env.VUE_APP_APIPATH; // 表示從config/dev.env.js裡的APIPATH變數
      const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
      const vm = this;
      const api = `${apiPath}/api/${customPath}/order`; // 送出訂單Api ，建立訂單後會把所選的購物車資訊刪除, message 欄位為必填, user 物件為必要
      vm.$store.dispatch('updateLoading', true);
      const order = vm.form;
      this.$validator.validate().then((result) => { // vee-validate官方驗證判斷
        if (result) {
          this.$http.post(api, { data: order }).then((response) => {
            console.log('送出訂單回傳資料', response);
            vm.$store.dispatch('updateLoading', false);
            vm.$router.push(`/customer_check/${response.data.orderId}`); // 跳轉到結帳頁面路由
          });
        } else {
          alert('提交訂單失敗，欄位填寫不完整');
        }
      });
    },
  },
};
</script>
