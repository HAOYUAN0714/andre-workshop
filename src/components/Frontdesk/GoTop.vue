<template>
	<div>
		<i class="fas fa-chevron-circle-up   arrow" @click.prevent="goTop"></i>        
	</div>
</template>

<script>
import $ from 'jquery';

export default {
	methods:{
		goTop(){
			$('html,body').animate({ scrollTop: 0 }, 'slow');
		}
	}
}
</script>

