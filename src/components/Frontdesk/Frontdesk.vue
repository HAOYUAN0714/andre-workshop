<template >
  <div class="bg-dark">
    <Allert/>
    <Header/>
    <Navbar/>
    <router-view/>
    <Footer/>
    <Arrow/>
  </div>
</template>

<script>
import Allert from '../Dashboard/AlertMessage';
import Header from '../../views/Frontdesk/layout/Header';
import Navbar from './Navbar';
import Footer from '../../views/Frontdesk/layout/Footer';
import Arrow from './GoTop';

export default {
  components:{
    Header,
    Allert,	
    Navbar,
    Footer,
    Arrow
  },
}
</script>




