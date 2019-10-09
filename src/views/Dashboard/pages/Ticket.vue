<template>
  <div>
    <!-- <loading :active.sync="isLoading" ></loading>         -->
    <div class="text-right">
      <button 
        class="btn btn-primary mt-4" 
        @click="openModal(true)" 
      >
        建立新優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="500">名稱</th>
        <th >折扣百分比</th>
        <th >到期日</th>
        <th >是否啟用</th>
        <th >編輯</th>
      </thead>
      <tbody>
        <tr 
          v-for="item in tickets" 
          :key="item.id"
        >
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ item.due_date | timeStamp }}</td>
          <td>
            <span 
              v-if="item.is_enabled" 
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
        </tr>
      </tbody>
    </table>
    <Pagination 
      :pagination-prop="pagination" 
      @emit-update-page="getTickets"
    />      

    <!-- 優惠券資訊Modal -->
    <div 
      id="ticketModal" 
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
              <span>優惠券資訊</span>
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
            <div class="form-row">
              <div class="col-sm">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input 
                    id="title"
                    v-model="newTicket.title"
                    class="form-control" 
                    type="text" 
                    placeholder="請輸入標題"
                  >
                </div>
                <div class="form-group ">
                  <label for="category">優惠碼</label>
                  <input 
                    id="category"
                    v-model="newTicket.code"
                    class="form-control" 
                    type="text" 
                    placeholder="請輸入優惠碼"
                  >
                </div>
                <div class="form-group ">
                  <label for="price">到期日</label>
                  <input 
                    id="unit"
                    v-model="newTicket.due_date"
                    class="form-control" 
                    type="unit" 
                    placeholder="請輸入到期日，timeStamp格式"
                  >
                </div>    
                <div class="form-group ">
                  <label for="price">折扣百分比</label>
                  <input 
                    id="unit"
                    v-model="newTicket.percent"
                    type="unit" 
                    class="form-control" 
                    placeholder="請輸入折扣百分比"
                  >
                </div>     
                <div class="form-group">
                  <div class="form-check">
                    <input 
                      id="is_enabled"
                      :true-value="1"
                      :false-value="0"                                
                      v-model="newTicket.is_enabled"
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
              type="button" 
              class="btn btn-outline-secondary" 
              data-dismiss="modal"
            >
              取消
            </button>
            <button 
              class="btn btn-primary" 
              type="button" 
              @click="updateTicket"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>        
    <!-- 刪除Modal -->
    <!-- <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                <span>刪除優惠券</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                是否刪除 <strong class="text-danger">{{ newTicket.title }}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger"
                >確認刪除</button>
            </div>
            </div>
        </div>
    </div> -->
  </div>
</template>

<script>
import Pagination from '../../../components/Pagination' //載入Pagination元件 頁碼
import $ from 'jquery'; // 載入jquery 錢字號 否則ESLint無法辨識 $

export default {
  components:{
    Pagination
  },  
  data:function(){
    return{
      // isLoading:false,
      pagination:{}, // 撈取伺服器回傳給我們的優惠券資料裡的分頁資料
      newTicket:{
        percent:{
          default:100,
          type:Number
        }
      }, // 撈取新建優惠券的資料，而到期日輸入timeStamp格式
      tickets:[], // 撈取所有優惠券的資料
      isNew:false, // 判斷是新增還是編輯的基準
    }
  },
  created(){
    this.getTickets();
  }, 
  methods:{
    getTickets(page = 1){ // 撈取伺服器回傳給我們的產品資料 ， 之後新增產品、編輯產品、刪除產品，都會用這段做頁面的更新 ，其中變數page用來取得頁碼，並給予預設值 1 讓其他用到 getProduct()方法的地方 即使沒有設定page參數，也能自動給page變數並等於1
      const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
      const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
      const vm =this ;
      const api = `${apiPath}/api/${customPath}/admin/coupons?page=${page}`; // 取得產品資訊的Api + 取得依照頁碼顯示對應的產品資訊
      vm.$store.dispatch('updateLoading',true);
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.$store.dispatch('updateLoading',false);
        vm.tickets = response.data.coupons;  
        vm.pagination = response.data.pagination;
      })
    },        
    openModal(isNew,item){
      if(isNew){ // 這是參數的isNew 並不是我們元件data return 的 this.isNew
        this.newTicket ={}; // 如果是點擊新增優惠券 this.newTicket 為空陣列 也就是modal 裡的input 都把它變成空值
        this.isNew = true ; // 新增優惠券所以 isNew 為 true
      }
      else{
        // Object.assign({},item) => 為ES6方法 將item 傳入一個空物件 以建立1個新物件指向別的參考，避免與item使用同1個參考
        this.newTicket =Object.assign({},item); // 如果是點擊編輯優惠券將此優惠券item的資料傳入此modal this.newTicket 當前點擊處的資料即item 也就是modal 裡的input 會是有填入資料的狀態
        this.isNew = false ; // 編輯優惠券所以 isNew 為 false
      }
      $('#ticketModal').modal('show');
    },
    updateTicket(){
      const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
      const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
      const vm =this ;
      let httpMethod = 'post' ;
      let api = `${apiPath}/api/${customPath}/admin/coupon` ; // 商品建立api
      if(!vm.isNew){ //如果isNew是false標示為編輯優惠券 ，需修改api為編輯優惠券用的api
        api = `${apiPath}/api/${customPath}/admin/coupon/${vm.newTicket.id}` ; // /api/:api_path/admin/product/:id 的id是 newTicket 裡的 id
        httpMethod = 'put' ; // 修改 http方法為 put
      }
      this.$http[httpMethod](api,{data:vm.newTicket}).then((response) => { // 將新增優惠券傳送到後端伺服器 ， 因驗證api的物件外層還有個data 所以用 {data:vm.newTicket} 包裹物件內容
        console.log(response.data);
        if(response.data.success){ // 如果新增優惠券成功
          console.log(response);
          $('#ticketModal').modal('hide'); // 關閉modal
          vm.getTickets() ;// 重新取得更新完的資料
          this.$bus.$emit('message:push',response.data.message,'success'); // 回傳成功訊息
        }
        else{
          console.log(response);
          $('#ticketModal').modal('hide'); // 關閉modal
          vm.getTickets() ;// 重新取得更新完的資料
          this.$bus.$emit('message:push',response.data.message,'danger'); // 回傳錯誤訊息
        }
      })
    }               
  },

}
</script>