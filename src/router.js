import Vue from 'vue';
import VueRouter from 'vue-router';
// Dashboard
import Dashboard from '@/components/Dashboard/Dashboard' ;
import Login from '@/views/Dashboard/pages/Login' ; 
import Production from '@/views/Dashboard/pages/Production' ; //產品列表
import Order from '@/views/Dashboard/pages/Order' ; //訂單列表
import CustomerOrders from '@/views/Dashboard/pages/CustomerOrders'; //模擬訂單
import CustomerCheck from '@/views/Dashboard/pages/CustomerCheck'; // 結帳頁面
import Ticket from '@/views/Dashboard/pages/Ticket' ; // 優惠券
// Frontdesk
import Frontdesk from '@/components/Frontdesk/Frontdesk';
import Index from '@/views/Frontdesk/pages/Index';
import Products from '@/views/Frontdesk/pages/Products';
import About from '@/views/Frontdesk/pages/About';
import Event from '@/views/Frontdesk/pages/Event';
import ProductDetail from '@/views/Frontdesk/pages/ProductDetail';
import CheckOut from '@/components/Frontdesk/CheckOut';
import CheckOrder from '@/views/Frontdesk/pages/CheckOrder';
import FillInfo from '@/views/Frontdesk/pages/FillInfo';



Vue.use(VueRouter) 

export default new VueRouter({
    linkActiveClass: 'active', // 當點擊router-link顯示此路由頁面時， 啟用class:'active'
    routes:[
        {
            path:'*',     // 當連到不是我們自訂義的路由時
            redirect:'/index', // 重新指向路由回首頁，也是我們一開始開啟的畫面
        },
        {
            name:'Frontdesk',
            path:'/frontdesk',
            component:Frontdesk,
            children:[
                {
                    name:'Index',
                    path:'/index',
                    component:Index,                    
                },
                {
                    name:'Products',
                    path:'/products',
                    component:Products,
                    props: route => ({ category: route.query.category }), // 用props設定當前路由下要啟用的元件判斷參數
                },
                {
                    name:'About',
                    path:'/about',
                    component:About
                },
                {
                    name:'Event',
                    path:'/event',
                    component:Event
                },  
                {
                    path: '/product_detail/:productId',
                    name: 'ProductDetail',
                    component: ProductDetail,
                },     
                {
                    name:'CheckOut',
                    path:'/check_out',
                    component:CheckOut,
                    children:[
                        {
                            name:'FillInfo',
                            path:'fill_info',
                            component:FillInfo
                        },
                        {
                            name:'CheckOrder',
                            path:'checkOrder/:orderId',
                            component:CheckOrder,
                        },
       
                    ]
                }                         
            ]
        },
        {
            name:'Login',
            path:'/login',
            component: Login,
        },
        {
            name:'Dashboard', // 元件呈現的名稱
            path:'/admin', // 對應的虛擬路徑 
            component: Dashboard, //對應的元件
            children:[
                {
                    path:'production',
                    name:'Production',
                    component:Production,
                    meta: { requiresAuth: true }, // 此路由需要登入帳號驗證
                },
                {
                    path:'order',
                    name:'Order',
                    component:Order,
                    meta: { requiresAuth: true }, // 此路由需要登入帳號驗證
                },
                {
                    path:'ticket',
                    name:'Ticket',
                    component:Ticket,
                    meta: { requiresAuth: true }, // 此路由需要登入帳號驗證                    
                }

            ]
        },
        {   // 不須登入驗證的Dashboard 路由
            name:'Dashboard_withoutValid', // 元件呈現的名稱
            path:'/dashboard', // 對應的虛擬路徑 
            component: Dashboard, //對應的元件
            children:[
                {  // 此為模擬訂單路由，不需驗證登入
                    path:'/customer_orders',
                    name:'CustomerOrders',
                    component: CustomerOrders,
                },
                {  // 此為訂單送出結帳頁面
                    path:'/customer_check/:orderId',
                    name:'CustomerCheck',
                    component: CustomerCheck,
                    
                },                

            ]
        },
        
     
    ],
  
    
}) 



