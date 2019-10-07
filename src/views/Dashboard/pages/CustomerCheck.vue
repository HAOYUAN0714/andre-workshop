<template>
    <div>
        <div class="my-5 row justify-content-center">
        <form class="col-md-6" @submit.prevent='payOrder'>
            <table class="table">
            <thead>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
            </thead>
            <tbody>
                <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                <td colspan="2" class="text-right">總計</td>
                <td class="text-right">{{ order.total }}</td>
                </tr>
            </tfoot>
            </table>

            <table class="table">
            <tbody>
                <tr>
                <th width="100">Email</th>
                <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                <th>付款狀態</th>
                <td>
                    <span v-if="!order.is_paid">尚未付款</span>
                    <span v-else class="text-success">付款完成</span>
                </td>
                </tr>
            </tbody>
            </table>
            <div class="text-right" v-if="order.is_paid === false">
            <button class="btn btn-danger">確認付款去</button>
            </div>
        </form>
        </div>        
    </div>
</template>

<script>
export default {
    data:function(){
        return{
            orderId:'', // 撈取訂單id
            order:{ // 撈取訂單內容
                user:{},  // email 等訂單資料是在 是在user之下
                products:[],  // 商品資料是在 是在products之下
            }, 
        }    
    },
    methods:{
        getOrder(){
            const vm =this ;
            const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
            const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
            vm.isLoading = true;
            const api = `${apiPath}/api/${customPath}/order/${vm.orderId}`; // 取得產品資訊的Api + 取得依照頁碼顯示對應的產品資訊
            this.$http.get(api).then((response)=>{
                vm.order = response.data.order;
                
                
                console.log('訂單回傳內容',vm.order);
                
                vm.isLoading = false;
            }) 
        },
        payOrder(){
            const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
            const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
            const vm =this ;
            vm.isLoading = true;
            const api = `${apiPath}/api/${customPath}/pay/${vm.orderId}`; // 以id對當前訂單進行結帳的Api 
            this.$http.post(api).then((response)=>{
                console.log('結帳後的回應',response);
                if(response.data.success){
                    alert('付款完成');
                    vm.getOrder(); //結帳完重新整理
                }
                
                vm.isLoading = false;
            })             
        }
    },
    created(){
        this.orderId = this.$route.params.orderId  // 讓訂單id = 此頁面自訂義路由 : 後的值
        console.log('orderId',this.orderId);
        this.getOrder(); // 取得結帳訂單內容
    }
}
</script>