<template>
	<div>
		<div class="container">
			<Carousel></Carousel>
			<Categories></Categories>
		</div>
		<ContactInfo></ContactInfo>
		<EventModal></EventModal>
	</div>
</template>

<script>
import Carousel from '../../../components/Frontdesk/Carousel';
import Categories from '../../../components/Frontdesk/Categories';
import ContactInfo from '../../../components/Frontdesk/ContactInfo';
import EventModal from '../../../components/Frontdesk/EventModal';
import $ from 'jquery';

export default {
	components:{
		Carousel,
		Categories,
		ContactInfo,
		EventModal
	},
}

</script>

