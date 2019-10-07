<template>
  <div>
    <Navbar/>
    <Alert/>
    <div class="container-fluid">
      <div class="row">
        <Sidebar ></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <!-- Dashboard主要內容 -->
          <router-view></router-view>
          
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'    // 載入Navbar元件
import Sidebar from './Sidebar'  // 載入Sidebar元件
import Alert from './AlertMessage' //載入AlertMessage元件 提示訊息


export default {

  components:{
    Navbar,   // 使用載入的Navbar元件
    Sidebar,  // 使用載入的Sidebar元件
    Alert,
    
  },


}
</script>

<style lang="scss">

</style>