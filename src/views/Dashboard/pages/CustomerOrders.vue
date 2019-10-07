<template>
    <div>
        <!-- <loading :active.sync="isLoading" ></loading>         -->
        <div class="row">
            <div class="col-md-4 mb-4" v-for='item in products' :key='item.id'>
                <div class="card border-0 shadow-sm">
                    <div style="height: 350px; background-size: cover; background-position: center "
                    :style="{backgroundImage:`url(${item.imageUrl})`}"
                    >
                    </div>
                    <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                    <h5 class="card-title">
                        <a href="#" class="text-dark">{{item.title}}</a>
                    </h5>
                    <p class="card-text">{{item.content}}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <!-- <div class="h5">2,800 元</div> -->
                        <del class="h6">原價 {{item.origin_price | currency}} 元</del>
                        <div class="h5">現在只要 {{item.price | currency}} 元</div>
                    </div>
                    </div>
                    <div class="card-footer d-flex">
                    <button type="button" class="btn btn-outline-secondary btn-sm" @click = 'getProduct(item.id)'> 
                        <i class="fas fa-spinner fa-spin" v-if='status.loadingItem === item.id'></i>
                        查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
                    @click='addtoCart(item.id)'
                    >
                        <i class="fas fa-spinner fa-spin" v-if='status.loadingItem === item.id'></i>
                        加到購物車
                    </button>
                    </div>
                </div>
            </div>            
        </div> 
        <Pagination  :paginationProp='pagination' @emit-update-page='getProducts'></Pagination>
        <hr>
        <!-- 購物車清單 -->
        <div class="row d-flex justify-content-center"  v-if="carts.length !== 0">
            <div class="col-6">
                <table class="table" >
                    <thead>
                        <tr>
                            <th width="80"></th>
                            <th>品名</th>
                            <th width="80">數量</th>
                            <th width="100">單價</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cart in carts" :key='cart.id'>
                            <td><button class="btn btn-outline-danger btn-sm" @click='removeCart(cart.id)'><i class="fas fa-trash-alt "></i></button></td>
                            <td>{{cart.product.title}}</td>
                            <td>{{cart.qty}} / {{cart.product.unit}} </td>
                            <td class="text-right">{{cart.product.price | currency}}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr class="font-weight-bold">
                            <td colspan="3" class="text-right">總計</td>
                            <td class="text-right">{{cartsData.total | currency}}</td>
                        </tr>
                        <tr class="text-success font-weight-bold" v-if="cartsData.final_total !== cartsData.total">
                            <td colspan="3" class="text-right">折扣價</td>
                            <td class="text-right">{{cartsData.final_total | currency}}</td>
                        </tr>
                    </tfoot>
                </table>  
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model='coupon_code' aria-label="Recipient's username" aria-describedby="button-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary " type="button" id="button-addon2" @click='addCouponCode'>套用優惠碼</button>
                    </div>
                </div>                              
            </div>
            
        </div>
        <!-- 訂單表單內容 -->
        <div class="my-5 row justify-content-center">
        <form class="col-md-6" @submit.prevent='createOrder'>
            <div class="form-group">
            <label for="useremail">Email <span class="text-danger">(必填)</span></label>
            <input type="email" v-validate="'required|email'" class="form-control" name="email" id="useremail"
                :class="{'is-invalid':errors.has('email')}"
                v-model="form.user.email"  placeholder="請輸入 Email" 
                >
               
            <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>    
            
            
            </div>
        
            <div class="form-group">
            <label for="username">收件人姓名 <span class="text-danger">(必填)</span></label>
            <input v-validate="'required'" type="text" class="form-control" name="name" id="username"
                v-model="form.user.name"  placeholder="輸入姓名"
                :class="{'is-invalid':errors.has('name')}"
                >
            <span class="text-danger" v-if="errors.has('name')">請填寫您的真實姓名</span>
            </div>
        
            <div class="form-group">
            <label for="usertel">收件人電話 <span class="text-danger">(必填)</span></label>
            <input type="tel" v-validate="'required'" class="form-control" name='tel' id="usertel" :class="{'is-invalid':errors.has('tel')}" v-model="form.user.tel" placeholder="請輸入電話">
            <span class="text-danger"  v-if="errors.has('tel')">請留下連絡電話</span>
            </div>
        
            <div class="form-group">
            <label for="useraddress">收件人地址 <span class="text-danger">(必填)</span></label>
            <input v-validate="'required'" type="text" :class="{'is-invalid':errors.has('address')}" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                placeholder="請輸入地址">
            <span class="text-danger"  v-if="errors.has('address')">貨物送達地址務必填寫</span>
            </div>
        
            <div class="form-group">
            <label for="comment">留言</label>
            <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message" placeholder="如有特殊要求請在此留言，例如:可收件的時段"></textarea>
            </div>
            <div class="text-right">
            <button class="btn btn-danger">送出訂單</button>
            </div>
        </form>
        </div>        

        <!-- 查看更多Modal -->
        <div
        class="modal fade"
        id="productModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="productModalLabel">{{ product.title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img :src="product.imageUrl" class="img-fluid" alt />
                    <blockquote class="blockquote mt-3">
                    <p class="mb-0">{{ product.content }}</p>
                    <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                    </blockquote>
                    <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h5 ml-auto" v-if="!product.price">{{ product.origin_price | currency }}元</div>
                    <del class="h6" v-if="product.price">原價 {{ product.origin_price | currency }}元</del>
                    <div class="h5" v-if="product.price">現在只要 {{ product.price | currency }}元</div>
                    </div>
                    <select class="form-control mt-3" v-model="product.num">
                    <option :value='num' v-for='num in 10' :key='num' >選購 {{num}} {{product.unit}} </option>
                    </select>
                </div>
                <div class="modal-footer">
                    <div class="text-muted text-nowrap mr-3" v-if="product.num>=1">
                    小計
                    <strong>{{ product.num * product.price }}</strong> 元
                    </div>
                    <button
                    type="button"
                    class="btn btn-primary"
                    @click='addtoCart(product.id,product.num)'
                    >加到購物車</button>
                </div>
                </div>
            </div>
        </div>              
    </div>
</template>


<script>
import Pagination from '../../../components/Pagination' //載入Pagination元件 頁碼
import $ from 'jquery';

export default {
    data:function(){
        return{
            products:[], //所有商品資訊
            product:{},  //單一商品資訊
            carts:[], //撈取購物車資料
            cartsData:{}, // 購物車金額總計資料
            isLoading:false,
            status:{
                loadingItem:'' //用來存放點擊查看更多的商品id，是用來判斷是哪個商品的查看更多被點擊再賦予loading效果
            },
            coupon_code:'' , //從model撈取套用的優惠券碼
            form:{  //撈取要送出的表單資料
                user: {
                    name: '',
                    email:'' ,
                    tel: '',
                    address: ''
                },
                message:''
            },
            pagination:{}
        }
    },
    components:{
        Pagination
    },    
    methods:{
        getProducts(page = 1){
            const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
            const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
            const vm =this ;
            vm.$store.dispatch('updateLoading',true);
            const api = `${apiPath}/api/${customPath}/products?page=${page}`; // 取得產品資訊的Api 
            this.$http.get(api).then((response)=>{
                vm.products = response.data.products.sort(function(a,b){
                    return a.category<b.category ? 1 : -1;
                })
                console.log('模擬訂單商品列表回應',vm.products);
                vm.$store.dispatch('updateLoading',false);
                vm.pagination = response.data.pagination;
            }) 
        },
        getProduct(id){ // 點擊查看更多 傳入參數單一商品id
            const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
            const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
            const vm =this ;
            vm.status.loadingItem = id; // 撈取點擊的品id
            const api = `${apiPath}/api/${customPath}/product/${id}`;  // 依照取得的id獲得單一產品資訊的Api
            this.$http.get(api).then((response)=>{
                vm.product = response.data.product;
                $('#productModal').modal('show');
                console.log('單一商品資訊',vm.product);
                vm.status.loadingItem = ''; // 讀取到單一商品資料並打開modal後 將vm.status.loadingItem 清空，使其不被判斷為loading
            }) 
        },
        addtoCart(id,qty = 1){ // 點擊加入購物車含modal的部分 傳入參數單一商品id和選購數量並預設置至少為1
            const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
            const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
            const vm =this ;
            vm.status.loadingItem = id; // 撈取點擊的品id
            const cart = {
                product_id:id, //傳入參數單一商品id
                qty, // 選購數量
            }
            const api = `${apiPath}/api/${customPath}/cart`;  // 依照取得的id獲得單一產品資訊的Api
            this.$http.post(api,{data:cart}).then((response)=>{
                console.log('加入購物車回傳訊息',response);
                vm.status.loadingItem = ''; // 讀取到單一商品資料並打開modal後 將vm.status.loadingItem 清空，使其不被判斷為loading
                vm.getCart(); // 加入購物車後更新購物車內容
                $('#productModal').modal('hide');  // 加入購物車後關閉modal
            }) 
        },
        getCart(){ // 更新取得購物車內容
            const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
            const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
            const vm =this ;
            vm.$store.dispatch('updateLoading',true);
            const api = `${apiPath}/api/${customPath}/cart`; // 取得購物車資訊的Api 
            this.$http.get(api).then((response)=>{
                // console.log('已加入購物車的內容',response);
                vm.carts = response.data.data.carts;
                vm.cartsData = response.data.data ;
                console.log('購物車的內容',vm.carts);
                vm.$store.dispatch('updateLoading',false);
            })             
        },
        removeCart(id){ // 刪除購物車按鈕，帶入要刪除的商品id
            const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
            const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
            const vm =this ;
            vm.$store.dispatch('updateLoading',true);
            const api = `${apiPath}/api/${customPath}/cart/${id}`; // 根據購物車商品id刪除購物車的Api 
            this.$http.delete(api).then((response)=>{
                console.log('刪除購物車訊息',response);
                vm.getCart(); //刪除完後重新更新購物車
                vm.$store.dispatch('updateLoading',false);
            })           
        },
        addCouponCode(){
            const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
            const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
            const vm =this ;
            const coupon = {code:vm.coupon_code};
            vm.$store.dispatch('updateLoading',true);
            const api = `${apiPath}/api/${customPath}/coupon`; // 套用優惠券並重新計算總計價格Api 
            this.$http.post(api,{data:coupon}).then((response)=>{
                console.log('套用的優惠券訊息',response);
                vm.getCart(); //套用優惠券後重新更新購物車
                vm.$store.dispatch('updateLoading',false);
            })              
        },
        createOrder(){
            const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
            const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
            const vm =this ;
            const api = `${apiPath}/api/${customPath}/order`; // 送出訂單Api ，建立訂單後會把所選的購物車資訊刪除, message 欄位為必填, user 物件為必要
            vm.$store.dispatch('updateLoading',true);
            const order = vm.form
            this.$validator.validate().then((result) => { // vee-validate官方驗證判斷
                if (result) {
                    this.$http.post(api,{data:order}).then((response)=>{
                        console.log('送出訂單回傳資料',response);
                        vm.$store.dispatch('updateLoading',false);
                        vm.$router.push(`/customer_check/${response.data.orderId}`) //跳轉到結帳頁面路由
                    })  
                }
                else{
                    alert('提交訂單失敗，欄位填寫不完整');
                }
            }); 
   
            
          
        }       
    },
    created(){
        this.getProducts();
        this.getCart();
        
    },
}
</script>