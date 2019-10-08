import axios from 'axios';

export default{
	namespaced:true,
	state:{
		carts:[],
		cartsData:{},
		status:{
			loadingItem:''
		},
		isdisabled:false, // 點擊刪除 disabled按鈕 避免重複點擊
	},
	actions:{
		getCart(context){ // 更新取得購物車內容
			const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
			const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
			context.commit('LOADING',true,{root: true});
			const api = `${apiPath}/api/${customPath}/cart`; // 取得購物車資訊的Api 
			axios.get(api).then((response)=>{
				if(response.data.success){
					// console.log('已加入購物車的內容',response);
					context.commit('CARTS',response.data.data.carts);
					context.commit('CARTSDATA',response.data.data);
					context.commit('LOADING',false,{root: true});
				}
			})             
		}, 
		removeCart(context,id){ // 刪除購物車按鈕，帶入要刪除的商品id
			context.commit('ISDISABLED',true);
			const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
			const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
			context.commit('LOADINGITEM',id);
			const api = `${apiPath}/api/${customPath}/cart/${id}`; // 根據購物車商品id刪除購物車的Api 
			axios.delete(api).then((response)=>{
				if(response.data.success){
					context.commit('LOADINGITEM','');
					context.dispatch('getCart');
					// vm.$bus.$emit('checkUpdateCart'); //刪除完後重新更新結帳頁面的購物車
					context.commit('ISDISABLED',false);
					context.dispatch('updateMessage',{
						message:response.data.message+ '商品',
						status:'danger', 
						},
						{root: true});
				}
			})           
		}, 
		addtoCart(context,{id,qty = 1}){ // 點擊加入購物車含modal的部分 傳入參數單一商品id和選購數量並預設置至少為1
			const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
			const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
			context.commit('LOADINGITEM',id);
			context.commit('ISDISABLED',true);
			const cart = {
				product_id:id, //傳入參數單一商品id
				qty, // 選購數量
			}
			const api = `${apiPath}/api/${customPath}/cart`; // 依照取得的id獲得單一產品資訊的Api
			axios.post(api,{data:cart}).then((response)=>{
				if(response.data.success){
					// vm.$bus.$emit('updateCart');  // 此bus 觸發來自 header元件裡的 vm.$bus.$on('updateCart') ，當點擊加入購物車觸發header的getCart 事件，重新更新購物車
					context.commit('LOADINGITEM','');
					context.dispatch('getCart');
					context.dispatch('updateMessage',{
							message:'已加入訂製',
							status:'success', 
						},
						{root: true});
					context.commit('ISDISABLED',false);
				}
				else{
					context.dispatch('updateMessage',{
						message:response.data.message,
						status:'danger', 
					},
					{root: true});                    
					context.commit('ISDISABLED',false);
				}
			}) 
		},        
	},
	mutations:{
		CARTS(state,payload){
			state.carts = payload;
		},
		CARTSDATA(state,payload){
			state.cartsData = payload;
		},
		LOADINGITEM(state,payload){
			state.status.loadingItem = payload;
		},
		ISDISABLED(state,status){
			state.isdisabled = status;
		},
	},
	getters:{
		carts(state){
			return state.carts; 
		},
		cartsData(state){
			return state.cartsData; 
		},
		status(state){
			return state.status;
		},
		loadingItem(state){
			return state.status.loadingItem;
		},
		isdisabled(state){
			return state.isdisabled;
		},                        
	},
}