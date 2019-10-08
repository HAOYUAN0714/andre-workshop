<template >
	<div class="bg-dark">
		<Allert></Allert>
		<Header></Header>
		<Navbar></Navbar>
		<router-view></router-view>
		<Footer></Footer>
		<Arrow></Arrow>
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




