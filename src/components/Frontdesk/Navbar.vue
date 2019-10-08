<template>
  <div >
    <section>  
      <nav class="navbar navbar-expand-md navbar-dark bg-secondary d-none d-md-block">
        <div class="container">
          <router-link class="logo-font" to="/index"> <img src="https://i.postimg.cc/5t0Jrxrk/logo-sm-transparent.png" width="48px" height="48px" alt=""> <b>安德烈工坊</b> </router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul class="navbar-nav ">
            <li class="nav-item mr-3 text-lg-left text-center">
              <router-link class="nav-link" to="/index">首頁</router-link>
            </li>
            <li class="nav-item mr-3">
              <router-link class="nav-link text-lg-left text-center" to="/about">關於工紡</router-link>
            </li>
            <li class="nav-item mr-3">
              <router-link class="nav-link text-lg-left text-center" to="/products">名匠精品</router-link>
            </li>                 

            <li class="nav-item mr-3">
              <router-link class="nav-link text-lg-left text-center" to="/event">最新活動</router-link>
            </li>
          </ul>
        </div>
      </div>  
      </nav>   
    </section>
  <!-- 手機選單 -->
    <section class="bg-secondary  pt-2 d-md-none container">  
      <div class="d-flex justify-content-between align-items-center ">
        <router-link class=" logo-font-mobile " to="/index"> <img src="https://i.postimg.cc/5t0Jrxrk/logo-sm-transparent.png" width="48px" height="48px" alt=""> <b >安德烈工坊</b> </router-link>
        <Cart></Cart>
      </div>
      <div class="row text-center border-top mt-2 pt-2 mobile-navbar"   >
        <div class="col-4"><router-link class="font-icon" to="/about" :class="{'active': activeItem === 'about' }" @click.prevent=" activeItem = 'about' "><i class="fas fa-home "></i> <h6>關於工紡</h6></router-link></div>
        <div class="col-4"><router-link class="font-icon" to="/products" :class="{'active': activeItem === 'products' }" @click.prevent=" activeItem = 'products' "><i class="fas fa-gem "></i><h6>名匠精品</h6> </router-link></div>
        <div class="col-4"><router-link class="font-icon" to="/event" :class="{'active': activeItem === 'event' }" @click.prevent=" activeItem = 'event' "><i class="fas fa-glass-cheers"></i><h6>最新活動</h6></router-link></div>
      </div >
      <Search class="mt-2 " ></Search>
    </section>
  </div>
</template>

<script>
import Search from './Search';
import Cart from './Cart';
import {mapActions} from 'vuex';

export default {
    data(){
      return{
        activeItem:'',
      }
    },
    components:{
      Search,
      Cart
    },
}
</script>

