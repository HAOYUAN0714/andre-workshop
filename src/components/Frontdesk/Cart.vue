<template>
	<div class="dropdown  test" style="z-index:1080" >
	<button class="btn btn-sm cart-bg-image" type="button" id="dropdownMenuButton" data-toggle="dropdown"
		aria-haspopup="true" aria-expanded="false"
		style="background-color: transparent;position: relative;"
		>
		<div class="badge badge-danger " style="position: absolute;top: -1px;right: -6px;border-radius:10px" v-if="carts.length > 0">{{carts.length}}</div>
	</button>
		<div class="dropdown-menu  dropdown-menu-right dropdown-menu-left cart-list-width" style=""
			aria-labelledby="dropdownMenuButton"
			>
			<div class="px-2 py-4" v-if="carts.length !== 0">
				<h5 class="text-right"> <b>已加入的製品</b></h5 >
				<table class="table">
					<thead>
						<tr>
							<th class="align-middle px-1">刪除</th>
							<th class="align-middle px-1">名稱</th>
							<th class="align-middle px-1">數量</th>
							<th class="align-middle px-1" width="80">小計</th>
						</tr>
					</thead>
						<tbody>
							<!-- @click.stop.prevent stopPropgation + preventDefault  複合使用 必免點擊刪除時dropdown關閉 -->
							<tr v-for="cart in carts" :key='cart.id'>
								<td class="align-middle px-1">
									<button class="btn btn-outline-danger btn-remove" type="button" name="cartIn"
										id="cartIn" data-title="cart.product.title" data-toggle="modal" data-target="#goodsCancel"
										@click.stop.prevent='removeCart(cart.id)'
										:disabled="isdisabled"
										>
										<i class="fas fa-trash-alt " v-if="!status.loadingItem"></i>
										<i class="fas fa-spinner fa-spin" v-if="status.loadingItem" ></i>
									</button>
								</td>
								<td class="align-middle px-1">{{cart.product.title}}</td>
								<td class="align-middle px-1">{{cart.qty}} / {{cart.product.unit}}</td>
								<td class="align-middle px-1 text-right">{{cart.total | currency}}</td>
							</tr>
						</tbody>
						<tfoot>
							<tr v-if="cartsData.total < 3000">
								<td colspan="3" class="align-middle text-right px-1"><b>運費</b></td>
								<td class="align-middle px-1 text-right"><b>$ 60 </b></td>
							</tr>
							<tr v-if="cartsData.total >= 3000">
								<td colspan="3" class="align-middle text-right px-1"><b>免運費</b></td>
								<td class="align-middle px-1 text-right"><del><b>$ 60 </b></del></td>
							</tr>                                                                       
							<tr v-if="cartsData.total < 3000" class="text-danger">
								<td colspan="3" class="align-middle text-right px-1"><b>商品總額</b> </td>
								<td class="align-middle px-1 text-right"><b> {{cartsData.total + 60 | currency}}</b></td>
							</tr>
							<tr v-if="cartsData.total >= 3000" class="text-danger">
								<td colspan="3" class="align-middle text-right px-1"><b>商品總額</b> </td>
								<td class="align-middle px-1 text-right"><b> {{cartsData.total | currency}}</b></td>
							</tr>                                    
						</tfoot>                                
				</table>
				<router-link class="btn btn-primary btn-block" to="/check_out/fill_info">結帳</router-link>
			</div>
			<div v-else><h5 class="text-center text-danger"> <b>購物車沒有商品!</b></h5 ></div>
		</div>
	</div>  
</template>

<script>
import $ from 'jquery';
import {mapActions,mapGetters} from 'vuex';

export default {
	computed:{
		...mapGetters('cartsModules',['carts','cartsData','status','isdisabled']),
	},
	methods:{
		...mapActions('cartsModules',['removeCart']),
						
	},
	created(){
		const vm = this;     
	}    
}
</script>

