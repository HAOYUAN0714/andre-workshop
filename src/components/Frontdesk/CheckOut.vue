<template>
	<router-view></router-view>
</template>

<script>
export default {
	data(){
		return{
			form:{ //撈取要送出的表單資料
				user: {
					name: '',
					email:'' ,
					tel: '',
					address: ''
				},
				message:''
			},            
		}
	}
}
</script>