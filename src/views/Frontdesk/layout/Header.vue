<template>
  <div>
    <div class="container d-none d-md-block">
      <div class=" p-3 d-flex justify-content-end align-items-center">
        <!-- 搜尋 -->
        <Search class="mr-3" />
        <!-- 購物車鈕 -->
        <Cart/>           
      </div>  
    </div>      
  </div>
</template>

<script>
import Search from '../../../components/Frontdesk/Search';
import Cart from '../../../components/Frontdesk/Cart';

export default {
  components:{
    Search,
    Cart,
  },
}
</script>

