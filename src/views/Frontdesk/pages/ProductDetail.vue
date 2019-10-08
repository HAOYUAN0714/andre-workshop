<template>
	<section class="container">
		<!-- <loading :active.sync="isLoading" ></loading> -->
		<nav aria-label="breadcrumb">
		<ol class="breadcrumb bg-dark" >
			<li class="breadcrumb-item"><router-link to="/products" class="text-white">所有商品</router-link></li>
			<li class="breadcrumb-item">
			<!-- <a href="#" class="text-white">Library</a> -->
			<router-link class="text-white" :to="{ path: '/products', query: { category: product.category } }">{{product.category}}</router-link>                
			</li>
			<li class="breadcrumb-item active" aria-current="page">{{product.title}}</li>
		</ol>
		</nav>      
		<div class="row my-4">
			<div class="col-md-6">
				<div class="bg-contain" :style="{backgroundImage:`url('${product.imageUrl}')`}"></div>
			</div>
			<div class="col-md-6 pl-md-5 mt-md-0 mt-4 text-md-left text-center text-white" >
				<h3 class="text-warning text-shadow-red" >{{product.title}}</h3>
				<del class="text-white" v-if='product.origin_price > 0'>{{product.origin_price | currency}}</del>
				<h4 class='text-danger font-weight-bold ' v-if='product.origin_price > 0'>{{product.price | currency}}</h4>
				<h4 class='text-danger font-weight-bold ' v-if='product.origin_price == 0'>視訂製內容決定價格</h4>                
				<h3 class="text-right" v-if="product.is_enable">總計</h3>
				<h4 class="text-right text-danger font-weight-bold" v-if="product.is_enable">{{product.price*product.num | currency}}</h4>
				<div v-if="product.is_enable">
					<label  for="num">數量</label>
					<select class="form-control " v-model="product.num" name="num">
						<option :value='num' v-for='num in 10' :key='num' >訂製 {{num}} {{product.unit}} </option>
					</select>  
					<button
					type="button"
					class="btn btn-primary w-100 mt-3"
					@click='addtoCart(product.id,product.num)'
					:disabled="isdisabled"
					>加入訂製</button>                                      
				</div>
				<div class="mt-2">
					<h4 class="text-warning">商品介紹</h4>
					<p>{{product.description}}</p>
					<h4 class="text-warning">補充說明</h4>
					<p>{{product.content}}</p>
				</div>
				<div v-if="!product.is_enable">
					<h3 class="text-danger" >本商品因製作原料不足，暫時停止出貨，如造成您的不便懇請見諒。</h3>
				</div>                
			</div>
		</div>  
	</section >
</template>

<script>
import {mapGetters} from 'vuex';

export default {
	data(){
		return{
			product:{}, // 以id取得的單一商品資訊
			productId:'', // 取得的商品id
		}
	},
	computed:{
		...mapGetters('cartsModules',['isdisabled','loadingItem'])
	},
	methods:{
		getProduct(){ // 點擊查看更多 傳入參數單一商品id
			const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
			const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
			const vm =this ;
			vm.$store.dispatch('updateLoading',true);
			const api = `${apiPath}/api/${customPath}/product/${vm.productId}`; // 依照取得的id獲得單一產品資訊的Api
			this.$http.get(api).then((response)=>{
				if(response.data.success){
					vm.product = response.data.product;
					vm.defaultNum(); // 預設 product.num 為 1 
					vm.$store.dispatch('updateLoading',false);
				}
			}) 
		},
		defaultNum(){ // 預設 product.num 為 1 
			const vm =this;
			vm.product.num = 1;
		},
		addtoCart(id,qty=1){
			this.$store.dispatch('cartsModules/addtoCart',{id,qty});
		},                
	},
	created(){
		const vm =this;
		vm.productId = vm.$route.params.productId; // ProductDetail 的自訂路由id
		vm.getProduct() ; // 取得當前商品id資訊
	}    
}
</script>


