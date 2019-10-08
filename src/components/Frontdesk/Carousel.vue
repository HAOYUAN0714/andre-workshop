<template>
	<div class="mobile-mt-4">
		<div class="bd-example">
			<div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
				<div class="carousel-inner">
					<div class="carousel-item header-carousel-item  active">
						<img src="https://i.postimg.cc/ZYd9QFKF/banner4.jpg"  class="d-block w-100 img-fluid" alt="">
						<div class="carousel-caption d-none d-md-block px-4"
							style=" background-color: rgba(0, 0, 0, 0.5)">
							<h3>穿上<span class="text-danger font-weight-bold">量身訂作</span>的鎧甲，正視眼前強大的敵人</h3>
							<p class="h5 mt-2" style="line-height:30px">本工坊專為使用者量身打造適合的裝備，讓使用者有著安全的防護的同時能夠避免活動上的限制，即使遇到強勢的敵人也能正面尋求反擊或全身而退的時機。</p>
						</div>
					</div>
					<div class="carousel-item header-carousel-item ">
						<img src="https://i.postimg.cc/DzSfXnSd/banner2.jpg" class="d-block w-100 img-fluid" alt="">
						<div class="carousel-caption d-none d-md-block px-4"
							style=" background-color: rgba(0, 0, 0, 0.5)">
							<h3>手握<span class="text-danger font-weight-bold">變化自如</span>的詭譎兵器，處決眼前所有目標</h3>
							<p class="h5 mt-2" style="line-height:30px">本工坊打造之兵器皆有自己獨特的一面，附加魔力的詛咒刀劍、能屈能伸的血腥鋸刃，針對不同目標選用不同武器，每次出手都能給予敵人慘痛的代價!</p>
						</div>
					</div>
					<div class="carousel-item header-carousel-item ">
						<img src="https://i.postimg.cc/J0GqXZH5/banner3.jpg" class="d-block w-100 img-fluid" alt="">
						<div class="carousel-caption d-none d-md-block px-4"
							style=" background-color: rgba(0, 0, 0, 0.5)">
							<h3>做好<span class="text-danger font-weight-bold">萬全準備</span>，挑戰永無止境的惡夢或危機四伏的禁地</h3>
							<p class="h5 mt-2" style="line-height:30px">無論你面對的是甚麼挑戰，都必須有足夠的準備，本工坊會依照使用者的狀態找出最適合的方案，讓你面對所有未知的困境也能迎刃而解。</p>
						</div>
					</div>
				</div>
				<a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="sr-only">Previous</span>
				</a>
				<a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="sr-only">Next</span>
				</a>
			</div>
		</div>        
	</div>
</template>


<script>
import $ from 'jquery';
export default {
    data(){
        return{
            banner1:'https://i.postimg.cc/wxfJKThg/banner1-sm.jpg',
        }
    },
    methods:{
        carouselSet(){
            $('.carousel').carousel({
                interval: 8000,
                pause:  'hover'
            })
        }
    },
    mounted(){
       const vm =this;
       vm.carouselSet() ;
    }
}
</script>

<style lang="css">
@media(max-width: 767px){
    .mobile-mt-4{
        margin-top: 1.5rem;
    }
}

</style>