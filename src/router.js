import Vue from 'vue';
import VueRouter from 'vue-router';
// Dashboard
import Dashboard from '@/components/Dashboard/Dashboard';
import Login from '@/views/Dashboard/pages/Login';
import Production from '@/views/Dashboard/pages/Production'; // 產品列表
import Order from '@/views/Dashboard/pages/Order'; // 訂單列表
import CustomerOrders from '@/views/Dashboard/pages/CustomerOrders'; // 模擬訂單
import CustomerCheck from '@/views/Dashboard/pages/CustomerCheck'; // 結帳頁面
import Ticket from '@/views/Dashboard/pages/Ticket'; // 優惠券
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

Vue.use(VueRouter);

export default new VueRouter({
  linkActiveClass: 'active', // 當點擊啟用 <router-link> 頁籤後， 在 <router-link> 加入class 'active' 如果沒有設定這段預設為 router-link-active ，這裡是用來切換被點擊的路由頁籤的文字顏色
  routes: [
    {
      path: '*', // 當連到不是我們自訂義的路由時
      redirect: '/index', // 重新指向路由回首頁
    },
    {
      name: 'Frontdesk',
      path: '/frontdesk',
      redirect: '/index',
      component: Frontdesk,
      children: [
        {
          name: 'Index',
          path: '/index',
          component: Index,
        },
        {
          name: 'Products',
          path: '/products',
          component: Products,
          // 用props設定products路由下 to屬性的query ?category的值
          props: (route) => ({ category: route.query.category }),
        },
        {
          name: 'About',
          path: '/about',
          component: About,
        },
        {
          name: 'Event',
          path: '/event',
          component: Event,
        },
        {
          path: '/product_detail/:productId',
          name: 'ProductDetail',
          component: ProductDetail,
        },
        {
          name: 'CheckOut',
          path: '/check_out',
          component: CheckOut,
          children: [
            {
              name: 'FillInfo',
              path: 'fill_info',
              component: FillInfo,
            },
            {
              name: 'CheckOrder',
              path: 'checkOrder/:orderId',
              component: CheckOrder,
            },
          ],
        },
      ],
    },
    {
      name: 'Login',
      path: '/login',
      component: Login,
    },
    {
      name: 'Dashboard', // 元件呈現的名稱
      path: '/admin', // 對應的虛擬路徑
      component: Dashboard, // 對應的元件
      meta: { requiresAuth: true },
      children: [
        {
          path: 'production',
          name: 'Production',
          component: Production,
          meta: { requiresAuth: true }, // 路由需要登入帳號驗證
        },
        {
          path: 'order',
          name: 'Order',
          component: Order,
          meta: { requiresAuth: true },
        },
        {
          path: 'ticket',
          name: 'Ticket',
          component: Ticket,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      name: 'Dashboard_withoutValid', // 元件呈現的名稱
      path: '/dashboard', // 對應的虛擬路徑
      component: Dashboard, // 對應的元件
      meta: { requiresAuth: true },
      children: [
        {
          path: '/customer_orders',
          name: 'CustomerOrders',
          component: CustomerOrders,
          meta: { requiresAuth: true },
        },
        {
          path: '/customer_check/:orderId',
          name: 'CustomerCheck',
          component: CustomerCheck,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});
