import axios from 'axios';

export default{
    namespaced:true,
    state:{
        products:[],
        pagination:{},   
        allProducts:[],     
    },
    mutations:{
        PRODUCTS(state,payload){
            state.products = payload;
        },
        PAGINATION(state,payload){
            state.pagination = payload;
        },
        ALLPRODUCTS(state,payload){
            state.allProducts = payload.sort(function(a,b){
                return a.category < b.category ? 1 : -1 ;
            });
        }        
    },
    actions:{
        getProducts(context,page=1){
            const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
            const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
            context.commit('LOADING',true,{root: true});
            const api = `${apiPath}/api/${customPath}/products?page=${page}`; // 取得產品資訊的Api 
            axios.get(api).then((response)=>{
                if (response.data.success){
                    context.commit('PRODUCTS',response.data.products) ;
                    context.commit('LOADING',false,{root: true});
                    context.commit('PAGINATION',response.data.pagination) ;
                }

            }) 
        }, 
        getAllProduct(context){ // 取得所有商品用來 製作分類選單 與 fillter computed
            const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
            const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
            context.commit('LOADING',true,{root: true});
            const api = `${apiPath}/api/${customPath}/products/all`; // 取得產品資訊的Api 
            axios.get(api).then((response) => {
                if (response.data.success) {
                context.commit('ALLPRODUCTS',response.data.products);
                context.commit('LOADING',false,{root: true});
                }
            });            
        },        
    },
    getters:{
        products(state){
            return state.products;
        },
        pagination(state){
            return state.pagination;
        },
        allProducts(state){
            return state.allProducts;
        }        
    }
}