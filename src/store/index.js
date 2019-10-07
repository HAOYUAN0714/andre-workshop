import Vue from 'vue';
import Vuex from 'vuex';
import productsModules from './modules/products';
import cartsModules from './modules/carts';
// import axios from 'axios';
Vue.use(Vuex);



export default new Vuex.Store({
    state:{
        isLoading:false,
        messages: [], //訊息回饋
    },
    actions:{
        updateLoading(context,status){
            context.commit('LOADING',status);
        },
        // 訊息回饋
        updateMessage(context,{message, status}) {
            const timestamp = Math.floor(new Date() / 1000);
            const messages ={
                message,
                status,
                timestamp
            }
            context.commit('MESSAGESPUSH',messages);
            context.dispatch('removeMessageWithTiming',timestamp);
        },
        removeMessage(context,num) {
            context.commit('MESSAGEREMOVE',num)
        },
        removeMessageWithTiming(context,timestamp) {
            setTimeout(() => {
                context.commit('MESSAGETIMEING',timestamp)
            }, 5000);
        },        
    
    },
    mutations:{
        LOADING(state,status){
            state.isLoading = status;
        },
        // 訊息回饋
        MESSAGESPUSH(state,payload){
            state.messages.push(payload);
        },
        MESSAGEREMOVE(state,payload){
            state.messages.splice(payload, 1);
        },
        MESSAGETIMEING(state,payload){
            state.messages.forEach((item,i)=>{
                if(item.timestamp === payload){
                    state.messages.splice(i, 1);
                }
            });
        }

    },
    getters:{
        isLoading(state){
            return state.isLoading;
        },
        messages(state){
            return state.messages;
        }

    },
    modules:{
        productsModules, // 商品頁面，商品與頁碼顯示相關
        cartsModules, // 購物車相關
    }
})
   