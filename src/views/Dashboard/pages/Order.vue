<template>
    <div>
        <table class="table mt-5">
            <thead>
                <th width='120'>購買時間</th>
                <th>E-mail</th>
                <th>購買品項</th>
                <th width='120'>應付金額</th>
                <th width='120'>是否付款</th>
            </thead>
            <tbody>
                <tr v-for="item in orders" :key="item.id">
                    <td>{{ item.create_at|timeStamp }}</td>
                    <td>{{ item.user.email }}</td>
                    <td>
                        <ul style="list-style-type:none;">
                            <li v-for="product in item.products" :key='product.id'>
                                {{product.product.title}} 數量: {{product.product.num}}{{product.product.unit}}
                            </li>
                        </ul>
                    </td>
                    <td class="text-right">{{ item.total | currency}}</td>
                    <td>
                        <span v-if="item.is_paid" class="text-success">已付款</span>
                        <span v-else>未付款</span>
                    </td>

                </tr>
            </tbody>
        </table>
        <Pagination  :paginationProp='pagination' @emit-update-page='getOrders'></Pagination> 
    </div>
</template>

<script>
import Pagination from '../../../components/Pagination' //載入Pagination元件 頁碼

export default {
    data:function(){
        return{
            orders:[],
            pagination:{}
        }
    },
    components:{
        Pagination
    },    
    methods:{
        getOrders(page =1 ){
            const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
            const customPath = process.env.VUE_APP_CUSTOMPATH; // 表示從config/dev.env.js裡的CUSTOMPATH變數
            const vm =this ;
            const api = `${apiPath}/api/${customPath}/orders?page=${page}`; // 取得產品資訊的Api + 取得依照頁碼顯示對應的產品資訊
            this.$http.get(api).then((response)=>{
                console.log('訂單回傳內容',response);
                vm.orders=response.data.orders;
                console.log('訂單回傳內容',response.data.orders);
                vm.pagination = response.data.pagination;
            }) 
        },
    },
    created(){
        this.getOrders();
    },
}
</script>