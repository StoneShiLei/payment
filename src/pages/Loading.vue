<template>
	<div class="flex-center">
		<loading></loading>

		<form :action="config.payURL" method="post">
			<!-- <button type="submit">立即支付</button> -->
		</form>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { fetchCreateOrder } from '../api/modules'
	import { useRoute } from 'vue-router'
	import { config } from '../api/request/config'
	import loading from '../components/loading.vue'

	const route = useRoute()
	console.log(route.query.price)
	const baseUrl = window.location.origin

	const paymentParams = ref<IPaymentParamsData>({
		price: (route.query.price as string) || '0',
		body: route.query.body as string,
		remark: route.query.remark as string,
		returl: baseUrl + '/result',
		reqsn: route.query.reqsn,
	})

	paymentParams.value.reqsn = generateOrderNumber()

	fetchCreateOrder(paymentParams.value).then(res => {
		const form = document.querySelector('form')
		if (form) {
			Object.keys(res.data).forEach(key => {
				const input = document.createElement('input')
				input.type = 'hidden'
				input.name = key
				input.value = res.data[key as keyof IPaymentParamsResponse] as string
				form.appendChild(input)
			})

			form.submit()
		}
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
