<template>
  <div>
    <!-- <loading :active.sync="isLoading" ></loading>         -->
    <div class="text-right">
      <button
        class="btn btn-primary mt-4"
        @click="openModal(true)"
      >
        建立新產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="80">編輯</th>
        <th width="80">刪除</th>
      </thead>
      <tbody>
        <tr
          v-for="item in products"
          :key="item.id"
        >
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | currency }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
          <td>
            <span
              v-if="item.is_enable"
              class="text-success"
            >
              啟用
            </span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false,item)"
            >
              編輯
            </button>
          </td>
          <td>
            <button
              class="btn btn-danger btn-sm"
              @click="delModal(item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :pagination-prop="pagination"
      @emit-update-page="getProduct"
    />
    <!-- 原始分頁內容
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !pagination.has_pre}"> 如果沒有上1頁，就不能點擊
          <a class="page-link" href="#" aria-label="Previous"
          @click.prevent='getProduct(pagination.current_page -1)'
          > 到上1頁功能即 目前頁碼+1
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"  v-for="page in pagination.total_pages"
        :key="page" :class="{'active':pagination.current_page === page}"
        > 顯示頁面為目前頁面時，加上.active
          <a class="page-link" href="#" @click.prevent='getProduct(page)'
          >{{page}}</a></li> 點擊指定頁面，顯示此頁面資料
        <li class="page-item" :class="{'disabled': !pagination.has_next}"> 如果沒有下1頁，就不能點擊
          <a class="page-link" href="#" aria-label="Next"
          @click.prevent='getProduct(pagination.current_page +1)'
          >  到下1頁功能即 目前頁碼+1
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav> -->
    <!-- 產品資訊Modal -->
    <div
      id="productModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-lg"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              <span>新增產品</span>
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
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    id="image"
                    v-model="tempProduct.imageUrl"
                    class="form-control"
                    type="text"
                    placeholder="請輸入圖片連結"
                  >
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i
                      v-if="status.fileUploading"
                      class="fas fa-sync fa-spin"
                    />
                  </label>
                  <input
                    id="customFile"
                    ref="files"
                    class="form-control"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    @change="uploadFile"
                  >
                </div>
                <img
                  :src="tempProduct.imageUrl"
                  class="img-fluid"
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                >
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    id="title"
                    v-model="tempProduct.title"
                    class="form-control"
                    type="text"
                    placeholder="請輸入標題"
                  >
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      id="category"
                      v-model="tempProduct.category"
                      class="form-control"
                      type="text"
                      placeholder="請輸入分類"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      id="unit"
                      v-model="tempProduct.unit"
                      class="form-control"
                      type="unit"
                      placeholder="請輸入單位"
                    >
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      class="form-control"
                      type="number"
                      placeholder="請輸入原價"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      id="price"
                      v-model="tempProduct.price"
                      class="form-control"
                      type="number"
                      placeholder="請輸入售價"
                    >
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    id="description"
                    v-model="tempProduct.description"
                    class="form-control"
                    type="text"
                    placeholder="請輸入產品描述"
                  />
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    id="content"
                    v-model="tempProduct.content"
                    class="form-control"
                    type="text"
                    placeholder="請輸入產品說明內容"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <!-- is_enable = 1 代表啟用 0 代表不啟用 ，設定 :true-value="1"
                    代表當此 checkbox 的 value為true is_enable要等於 1 :false-value="0"
                    代表當此 checkbox 的 value為false is_enable要等於 0
                    -->
                    <input
                      id="is_enabled"
                      :true-value="1"
                      :false-value="0"
                      v-model="tempProduct.is_enable"
                      class="form-check-input"
                      type="checkbox"
                    >
                    <label
                      class="form-check-label"
                      for="is_enabled"
                    >
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-outline-secondary"
              type="button"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              class="btn btn-primary"
              type="button"
              @click="updateProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除Modal -->
    <div
      id="delProductModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-outline-secondary"
              type="button"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              class="btn btn-danger"
              type="button"
              @click="delProduct()"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import $ from 'jquery'; // 載入jquery 錢字號 否則ESLint無法辨識 $
import Pagination from '../../../components/Pagination'; // 載入Pagination元件 頁碼

export default { // 建立取得產品資訊的方法，並用created() 鉤子 啟用這個方法來獲取資料
  components: {
    Pagination,
  },
  data() {
    return {
      products: [], // 撈取伺服器回傳給我們的產品資料
      pagination: {}, // 撈取伺服器回傳給我們的產品資料裡的分頁資料
      tempProduct: {}, // 用來撈 我們在產品新增、編輯、刪除 的modal的所有項目的input的值，
      // 重點在於當我們點擊商品的新增、編輯、刪除 ，再接著點到另1個商品的
      // 新增、編輯、刪除 時都要改變tempProduct的值
      isNew: false, // 用來設定判斷 如果是點擊新增產品 isNew會是true ，如果點擊編輯 那當然點擊的商品是已存在的舊產品  isNew 就會是 false
      isLoading: false, // <loading :active.sync="isLoading" ></loading> 的變數，預設false為不啟用此功能
      status: {
        fileUploading: false,
      },
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    // 撈取伺服器回傳給我們的產品資料 ， 之後新增產品、編輯產品、刪除產品，都會用這段做頁面的更新 ，
    // 其中變數page用來取得頁碼，並給予預設值 1 讓其他用到 getProduct()方法的地方
    // 即使沒有設定page參數，也能自動給page變數並等於1
    getProduct(page = 1) {
      const apiPath = process.env.VUE_APP_APIPATH; // 表示從config/dev.env.js裡的APIPATH變數
      const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
      const vm = this;
      const api = `${apiPath}/api/${customPath}/products?page=${page}`; // 取得產品資訊的Api + 取得依照頁碼顯示對應的產品資訊
      vm.$store.dispatch('updateLoading', true);
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.$store.dispatch('updateLoading', false);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    delProduct() {
      const apiPath = process.env.VUE_APP_APIPATH; // 表示從config/dev.env.js裡的APIPATH變數
      const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
      const vm = this;
      const api = `${apiPath}/api/${customPath}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          $('#delProductModal').modal('hide'); // 關閉modal
          vm.getProduct();// 重新取得更新完的資料
          this.$bus.$emit('message:push', response.data.message, 'success'); // 回傳成功訊息
        } else {
          $('#delProductModal').modal('hide'); // 關閉modal
          vm.getProduct();// 重新取得更新完的資料
          this.$bus.$emit('message:push', response.data.message, 'danger'); // 回傳錯誤訊息
        }
      });
    },
    uploadFile() {
      console.log(this); // 可以觀察到VueComponent的方法，其中 $refs.files.files[0] 就是上傳目標
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData(); // 上傳的行為必須使用 formData 物件方法 來執行。
      formData.append('file-to-upload', uploadedFile); // 使用append 增加上傳欄位 ，append('input的name', 要上傳的目標)
      const apiPath = process.env.VUE_APP_APIPATH; // 表示從config/dev.env.js裡的APIPATH變數
      const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
      const url = `${apiPath}/api/${customPath}/admin/upload`;
      vm.status.fileUploading = true;
      vm.$http.post(url, formData, { // 使用POST方法傳送檔案到url，傳送檔案為formData
        header: {
          'Content-Type': 'multipart/form-data', // 定義檔案的格式為form-data
        },
      }).then((response) => {
        console.log('上傳檔案回傳結果', response.data); // 圖片上傳成功後 伺服器會回傳圖片網址 imageUrl
        vm.status.fileUploading = false;
        if (response.data.success) {
          // vm.tempProduct.imageUrl = response.data.imageUrl;
          // 使用註解方法賦值，下面console 會發現 vm.tempProduct 並沒有 set() get() 方法可以使用，
          // 這表示這份資料並沒有雙向綁定
          // console.log(vm.tempProduct);
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl); // 使用Vue.set方法達到雙向綁定 ，vm.$set(物件,物件的屬型/key,要設定的值)
          this.$bus.$emit('message:push', response.data.message, 'success'); // 回傳成功訊息
        } else {
          this.$bus.$emit('message:push', response.data.message, 'danger'); // 回傳錯誤訊息
        }
      });
    },
    openModal(isNew, item) {
      if (isNew) { // 這是參數的isNew 並不是我們元件data return 的 this.isNew
        this.tempProduct = {}; // 如果是點擊新增產品 this.tempProduct 為空陣列 也就是modal 裡的input 都把它變成空值
        this.isNew = true; // 新增產品所以 isNew 為 true
      } else {
        // Object.assign({},item) => 為ES6方法 將item 傳入一個空物件 以建立1個新物件指向別的參考，避免與item使用同1個參考
        // 如果是點擊編輯產品將此產品item的資料傳入此modal this.tempProduct
        // 當前點擊處的資料即item 也就是modal 裡的input 會是有填入資料的狀態
        // this.tempProduct = Object.assign({},item);
        this.tempProduct = { ...item };
        this.isNew = false; // 編輯產品所以 isNew 為 false
      }
      $('#productModal').modal('show');
    },
    delModal(item) { // 點擊刪除時，將此商品資料item傳入tempProduct，並打開delModal
      const vm = this;
      // vm.tempProduct = Object.assign({},item);
      vm.tempProduct = { ...item };
      $('#delProductModal').modal('show');
    },
    updateProduct() {
      const apiPath = process.env.VUE_APP_APIPATH; // 表示從config/dev.env.js裡的APIPATH變數
      const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
      const vm = this;
      let httpMethod = 'post';
      let api = `${apiPath}/api/${customPath}/admin/product`; // 商品建立api
      if (!vm.isNew) { // 如果isNew是false標示為編輯產品 ，需修改api為編輯產品用的api
        api = `${apiPath}/api/${customPath}/admin/product/${vm.tempProduct.id}`; // /api/:api_path/admin/product/:id 的id是 tempProduct 裡的 id
        httpMethod = 'put'; // 修改 http方法為 put
      }
      // 將新增產品傳送到後端伺服器 ， 因驗證api的物件外層還有個data 所以用 {data:vm.tempProduct} 包裹物件內容
      this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        console.log(response.data);
        if (response.data.success) { // 如果新增產品成功
          $('#productModal').modal('hide'); // 關閉modal
          vm.getProduct();// 重新取得更新完的資料
          this.$bus.$emit('message:push', response.data.message, 'success'); // 回傳成功訊息
        } else {
          $('#productModal').modal('hide'); // 關閉modal
          vm.getProduct(); // 重新取得更新完的資料
          this.$bus.$emit('message:push', response.data.message, 'danger'); // 回傳錯誤訊息
        }
      });
    },
  },
};
</script>
