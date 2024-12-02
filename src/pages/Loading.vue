<template>
	<div class="flex-center">
		<loading></loading>
	</div>
</template>

<script setup lang="ts">
	import { useRoute } from 'vue-router'
	import loading from '../components/loading.vue'
	import { fetchOrderSubmit, fetchPaymentParams } from '../api/modules'
	import { ref } from 'vue'
	const route = useRoute()
	console.log(route.query.price)
	const paymentParams = ref<IPaymentParamsData>({
		price: (route.query.price as string) || '0',
		body: '订单标题',
		remark: '备注信息|备注信息',
		returl: '/'
	})

	fetchPaymentParams(paymentParams.value).then(res => {
		console.log(res, '支付参数')
		fetchOrderSubmit(res.data)
			.then(res => {
				console.log(res, '订单提交')
			})
			.catch(err => {
				console.log(err, 'err')
			})
	})
</script>

<style scoped lang="scss">
	.flex-center {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		z-index: 2;

		&::after {
			content: '';
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			z-index: -1;
		}
	}
</style>
