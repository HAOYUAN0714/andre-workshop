<template>
	<section class="container">
		<Processbar process = 'fillInfo'></Processbar>
		<div class="my-5 row justify-content-center">
			<div class="col-lg-6 col-md-8">
				<section class="accordion card-header-shadow border-0 mb-3" id="accordionExample" >
					<div  v-if="carts.length === 0" class="alert process-bg-danger text-center alert-rounded " role="alert">
							<router-link to="/products" class="text-white">購物車沒有商品，前往舔加</router-link>
					</div>
					<div class="card bg-secondary" v-if="carts.length > 0"  >
						<div class="card-header border bg-primary" id="headingOne">
							<h2 class="mb-0 ">
								<button class="btn btn-link text-white" 
									type="button" 
									data-toggle="collapse"
									data-target="#collapseOne"
									aria-expanded="true"
									aria-controls="collapseOne">
									顯示購物車細節
								</button>
							</h2>
						</div>
						<!-- 拿掉 .show 預設收起購物車 -->
						<div id="collapseOne" class="collapse " aria-labelledby="headingOne"
							data-parent="#accordionExample"
						>
							<div class="card-body bg-secondary">
								<table class="table table-responsive-md">
									<thead>
										<tr class="text-warning">
											<th class="align-middle " width="60" v-if="!isCoupon">刪除</th>
											<th class="align-middle mobile-d-none" width="100">商品圖片</th>
											<th class="d-md-none"></th>
											<th class="align-middle">商品名稱</th>
											<th class="align-middle" width="100">數量</th>
											<th class="align-middle" width="80">小計</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="cart in carts" :key='cart.id' class="text-white">
											<td class="align-middle" v-if="!isCoupon ">
												<button class="btn btn-outline-danger" type="button" name="cartIn"
													id="cartIn" data-title="remove" data-toggle="modal"
													data-target="#goodsCancel"
													@click.prevent="removeCart(cart.id)" 
													>
													<i class="fas fa-trash-alt " v-if="!status.loadingItem"></i>
													<i class="fas fa-spinner fa-spin" v-if="status.loadingItem"></i>
												</button>
											</td>
											<td class="align-middle mobile-d-none">
												<img class="img-fluid"
													:src="cart.product.imageUrl"
													alt=""
												>
											</td>
											<td class="d-md-none"></td>
											<td class="align-middle">{{cart.product.title}}</td>
											<td class="align-middle">{{cart.qty}}/{{cart.product.unit}}</td>
											<td class="align-middle text-right">{{cart.total | currency}}</td>
										</tr>
									</tbody>
									<tfoot>
										<!-- 商品總額未達 3000 ，且未使用過優惠券-->
										<tr class="text-white" v-if="cartsData.total<3000 & !isCoupon">
											<td colspan="4" class="text-right"  ><b>運費</b></td>
											<td class="text-right"><b>$ 60</b></td>
										</tr>
										<!-- 商品總額未達 3000，但有使用過優惠券，主要對應header購物車刪除功能 ，並讓colspan=3 -->
										<tr class="text-white" v-if="cartsData.total<3000 & isCoupon">
											<td colspan="3" class="text-right"  ><b>運費</b></td>
											<td class="text-right"><b>$ 60</b></td>
										</tr>                                        
										<tr class="text-white" v-if="cartsData.total>=3000">
											<td colspan="4" class="text-right" v-if="!isCoupon"><b>免運費</b></td>
											<td colspan="3" class="text-right" v-if="isCoupon"><b>免運費</b></td>
											<td class="text-right"><del><b>$ 60</b></del></td>
										</tr> 
										<tr class="text-danger" v-if="cartsData.total>=3000">
											<td colspan="4" class="text-right" v-if="!isCoupon"><b>折扣金額</b> </td>
											<td colspan="3" class="text-right" v-if="isCoupon"><b>折扣金額</b> </td>
											<td class="text-right" v-if="!isCoupon"><b>0</b></td>
											<td class="text-right" v-if="isCoupon"><b>{{cartsData.total - cartsData.final_total |currency}}</b></td>
										</tr> 
											<!-- 商品總額未達 3000 ，且未使用過優惠券-->                                                                               
										<tr class="text-danger" v-if="cartsData.total<3000 & !isCoupon">
											<td colspan="4" class="text-right" ><b>合計</b> </td>
											<td class="text-right"><b>{{cartsData.total + 60 |currency}}</b></td>
										</tr>
										<!-- 商品總額未達 3000，但有使用過優惠券，主要對應header購物車刪除功能 ，並讓colspan=3 -->
										<tr class="text-danger" v-if="cartsData.total<3000 & isCoupon ">
											<td colspan="3" class="text-right" ><b>合計</b> </td>
											<td class="text-right"><b>{{cartsData.total + 60 |currency}}</b></td>
										</tr>                                        
										<tr class="text-danger" v-if="cartsData.total>=3000">
											<td colspan="4" class="text-right" v-if="!isCoupon"><b>合計</b> </td>
											<td colspan="3" class="text-right" v-if="isCoupon"><b>合計</b> </td>
											<td class="text-right" v-if="!isCoupon"><b>{{cartsData.total |currency}}</b></td>
											<td class="text-right" v-if="isCoupon"><b>{{cartsData.final_total |currency}}</b></td>
										</tr>   
									</tfoot>
								</table>
							</div>
						</div>
						<!-- 狀態回饋 -->
						<div class="alert  bg-warning text-center alert-rounded text-white mt-3" role="alert" v-if="cartsData.total<3000">商品總額還差{{3000-cartsData.total |currency}}可享免運費、優惠券功能</div>
						<div class="alert  bg-dark text-center alert-rounded text-danger mt-3 font-weight-bold" role="alert" v-if="cartsData.total>=3000 & !isCoupon">提醒您，如有再新增商品請重新輸入代碼</div>
						<div class="alert  bg-success text-center alert-rounded text-white mt-3 font-weight-bold" role="alert" v-if="cartsData.total>=3000 & isCoupon">已取得折扣</div>
						<router-link to="/products" class="btn btn-danger mt-2" >繼續購物</router-link >
					</div>
				</section>  
				<div class="input-group mb-3 " v-if="cartsData.total>=3000 & !isCoupon" >
						<input type="text" class="form-control" placeholder="請輸入優惠碼" v-model='coupon_code' aria-label="Recipient's username" aria-describedby="button-addon2" >
						<div class="input-group-append">
								<button class="btn btn-outline-warning " type="button" id="button-addon2" @click='addCouponCode' >套用優惠碼</button>
						</div>
				</div>
				<!-- 表單 -->
				<form class="text-white" @submit.prevent='createOrder' v-if="carts.length > 0" >
					<div class="form-group">
					<label for="username"><span class="h5">收件人姓名</span> <span class="text-danger"><b>(必填)</b></span></label>
					<input 
						v-validate="'required'" 
						type="text" class="form-control" 
						name="name" id="username"
						v-model="form.user.name"  
						placeholder="輸入姓名"
						:class="{'is-invalid':errors.has('name')}"
					>
					<span class="text-danger" v-if="errors.has('name')">請填寫您的真實姓名</span>
					</div>

					<div class="form-group">
					<label for="useremail"><span class="h5">電子郵件</span> <span class="text-danger"><b>(必填)</b></span></label>
					<input type="email" v-validate="'required|email'" class="form-control" name="email" id="useremail"
							:class="{'is-invalid':errors.has('email')}"
							v-model="form.user.email"  placeholder="請輸入 Email" 
							>
					<span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
					</div>    

					<div class="form-group">
						<label for="usertel"><span class="h5">收件人電話</span> <span class="text-danger"><b>(必填)</b></span></label>
						<input type="tel" v-validate="'required'" class="form-control" name='tel' id="usertel" :class="{'is-invalid':errors.has('tel')}" v-model="form.user.tel" placeholder="請輸入電話">
						<span class="text-danger"
							v-if="errors.has('tel')"
						>請留下連絡電話
						</span>
					</div>

					<div class="form-group">
					<label for="useraddress"><span class="h5">收件人地址</span> <span class="text-danger"><b>(必填)</b></span></label>
					<input v-validate="'required'" type="text" 
						:class="{'is-invalid':errors.has('address')}" 
						class="form-control" 
						name="address" 
						id="useraddress" 
						v-model="form.user.address"
						placeholder="請輸入地址"
					>
					<span class="text-danger"  v-if="errors.has('address')">貨物送達地址務必填寫</span>
					</div>

					<div class="form-group">
					<label for="comment"><span class="h5">留言</span></label>
					<textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message" placeholder="如有特殊要求請在此留言，例如:可收件的時段、訂製尺寸、訂製要求等"></textarea>
					</div>
					<div class="text-right">
							<button class="btn btn-primary">送出訂單</button>
					</div>
				</form>
			</div>    
		</div> 
		<!-- 滿3000未套用優惠券優惠提醒 modal  -->
		<div class="modal mt-5" id="eventAlert" tabindex="-1" role="dialog" >
			<div class="modal-dialog " role="document">
				<div class="modal-content ">
					<div class="modal-header bg-danger ">
						<h5 class="modal-title text-white ">商品總額已滿3000，請使用優惠券</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body text-right">
						<button type="button" class="btn btn-outline-secondary mr-3" data-dismiss="modal">關閉</button>
						<button type="button" class="btn btn-primary" @click.prevent="toEvent">前往領取優惠券</button>
					</div>
				</div>
			</div>
		</div>    
		<!-- 因刪除商品導致未滿3000且已套用過優惠券提醒 modal  -->
		<div class="modal mt-5" id="warningAlert" tabindex="-1" role="dialog" >
			<div class="modal-dialog " role="document">
				<div class="modal-content ">
					<div class="modal-header bg-danger ">
						<h5 class="modal-title text-white ">目前商品總額不足3000，無法取得優惠</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body text-right">
						<button type="button" class="btn btn-outline-secondary mr-3" data-dismiss="modal">關閉</button>
						<button type="button" class="btn btn-primary" @click.prevent="toProducts">添加商品</button>
					</div>
				</div>
			</div>
		</div>             
	</section>
</template>

<script>
import Processbar from '../../../components/Frontdesk/Processbar';
import $ from 'jquery';
import {mapActions,mapGetters} from 'vuex';


export default {
    components:{
        Processbar
    },
    data(){
        return{
            form:{ //撈取要送出的表單資料
                user: {
                    name: '',
                    email:'' ,
                    tel: '',
                    address: ''
                },
                message:''
            }, 
            coupon_code:'' , //優惠券碼    
            isCoupon : false, // 判斷是否已套用優惠券，顯示原始或折扣後金額，隱藏刪除紐
        }
    },
    computed:{
        ...mapGetters('cartsModules',['carts','cartsData','status','isdisabled']),
    },
    methods:{
        ...mapActions('cartsModules',['getCart','removeCart']),
        createOrder(){
            const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
            const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
            const vm =this ;
            const api = `${apiPath}/api/${customPath}/order`; // 送出訂單Api ，建立訂單後會把所選的購物車資訊刪除, message 欄位為必填, user 物件為必要
            if( !vm.isCoupon & vm.$store.state.cartsModules.cartsData.total >=3000 ){ //如果商品總額達3000 卻沒使用優惠券，就提醒客戶並中斷表單傳送
                $('#eventAlert').modal('show');
                   return
            }
            else if( vm.isCoupon & vm.$store.state.cartsModules.cartsData.total < 3000){ //如果以使用優惠券，卻因點選刪除商品導致商品總額低於 3000 ，就提醒客戶並中斷表單傳送
                $('#warningAlert').modal('show');
                return
            } 
            vm.$store.dispatch('updateLoading',true); // 在vuex管理下如果把updateLoading這段放在 if else 前面會造成無限循環錯誤，原因不明，但在cli2.0和3.0 時的專案沒有這種問題，可能是loading被預設為不能一直是開啟。
            const order = vm.form            
            this.$validator.validate().then((result) => { // vee-validate官方驗證判斷
                if (result) {
                    this.$http.post(api,{data:order}).then((response)=>{
                        vm.$store.dispatch('cartsModules/getCart');
                        vm.$store.dispatch('updateLoading',false);
                        vm.$router.push(`/check_out/checkOrder/${response.data.orderId}`) //跳轉到確認訂單頁面路由
                    })  
                }
                else{
                    // alert('提交訂單失敗，欄位填寫不完整');
                    vm.$store.dispatch('updateMessage',{
                        message:'提交訂單失敗，欄位填寫不完整',
                        status:'danger', 
                        });
                    vm.$store.dispatch('updateLoading',false);    
                }
            }); 
        },
        addCouponCode(){
            const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
            const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
            const vm =this ;
            const coupon = {code:vm.coupon_code};
            vm.$store.dispatch('updateLoading',true);
            const api = `${apiPath}/api/${customPath}/coupon`; // 套用優惠券並重新計算總計價格Api 
            this.$http.post(api,{data:coupon}).then((response)=>{
                if(response.data.success){
                    vm.getCart(); //套用優惠券後重新更新購物車
                    vm.$store.dispatch('cartsModules/getCart');
                    vm.isCoupon = true; 
                    vm.$store.dispatch('updateLoading',false);
                    vm.$store.dispatch('updateMessage',{
                        message:'已取得折扣',
                        status:'success', 
                        });                    
                }
                else{
                    vm.$bus.$emit('message:push',response.data.message ,'danger');
                    vm.$$store.dispatch('updateMessage',{
                        message:response.data.message,
                        status:'danger', 
                    });                    
                }

            })              
        },
        toEvent(){ // 點擊前往活動詳情時，將modal 關閉 否則跳轉的畫面會是modal顯示時的disabled畫面
            const vm =this;
            $('#eventAlert').modal('hide');
            vm.$router.push('/event');
        } ,
        toProducts(){ 
            const vm =this;
            $('#warningAlert').modal('hide');
            vm.$router.push('/products');
        },                                   
    },
    created(){
        const vm =this;
        vm.getCart();
    },    

}
</script>

<style lang="css">
@media(max-width: 767px){
    .mobile-d-none{
        display: none;
    }
}


    
</style>