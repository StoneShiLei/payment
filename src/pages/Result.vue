<template>
	<div>
		<!-- {{ route.query }}
		<br />
		{{ status || '--' }}
		<br />
		{{ message }}
		<br />
		{{ errMessage }}
		<br /> -->

		<div id="success-box" v-if="status === '0'" class="result-container">
			<div class="circle success-circle">
				<span class="icon">✓</span>
			</div>
			<div class="result-text">支付成功</div>
		</div>

		<div id="error-box" v-if="['1', '3'].includes(status)" class="result-container">
			<div class="circle error-circle">
				<span class="icon">✕</span>
			</div>
			<div class="result-text">支付失败</div>
		</div>


		<div class="flex-center" v-if="status === '2'">
			<svg viewBox="25 25 50 50">
				<circle r="20" cy="50" cx="50"></circle>
			</svg>
			<div style="margin-left: 6px">正在获取支付结果...</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { fetchPaymentResult } from '../api/modules'

	const route = useRoute()
	const status = ref('2')
	const message = ref('')
	const errMessage = ref('')

	const getResult = async () => {
		if (!route.query.trxid) return showToast('缺少trxid参数')

		try {
			const res = await fetchPaymentResult(route.query.trxid as string)
			status.value = res.data.trxstatus
			message.value = ['交易成功', '交易不存在', '交易处理中', '交易失败'][res.data.trxstatus as unknown as number]
			errMessage.value = res.data.errmsg
			message.value = JSON.stringify(res.data)

			if (res.data.trxstatus === '2') {
				// 等待2s
				await new Promise(resolve => setTimeout(resolve, 2000))
				// 重新获取结果
				getResult()
			}
		} catch (error: any) {
			errMessage.value = error || '213'
		}
	}

	getResult()
</script>

<style scoped lang="scss">
	$white: #fcfcfc;
	$gray: #cbcdd3;
	$dark: #777777;
	$error: #ef8d9c;
	$orange: #ffc39e;
	$success: #b0db7d;
	$secondary: #99dbb4;
	$font: sans-serif;

	.result-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.circle {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20px;
	}

	.success-circle {
		background-color: #52c41a;
	}

	.error-circle {
		background-color: #ff4d4f;
	}

	.icon {
		color: white;
		font-size: 40px;
		font-weight: bold;
	}

	.result-text {
		font-size: 20px;
		font-weight: bold;
	}

	.flex-center {
		height: 50vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	h1 {
		font-size: 0.9em;
		font-weight: 100;
		letter-spacing: 3px;
		padding-top: 5px;
		color: $white;
		padding-bottom: 5px;
		text-transform: uppercase;
	}

	#success-box {
		position: absolute;
		width: 100%;
		height: 100%;
		box-shadow: 5px 5px 20px rgba($gray, 10%);
		perspective: 40px;
	}

	#error-box {
		position: absolute;
		width: 100%;
		height: 100%;
		box-shadow: 5px 5px 20px rgba($gray, 10%);
	}

	.shadow {
		position: absolute;
		width: 21%;
		height: 3%;
		opacity: 0.5;
		background: $dark;
		left: 40%;
		top: 43%;
		border-radius: 50%;
		z-index: 1;
	}

	.message {
		position: absolute;
		width: 100%;
		text-align: center;
		height: 40%;
		top: 47%;
	}

	svg {
		width: 3.25em;
		transform-origin: center;
		animation: rotate4 2s linear infinite;
	}

	circle {
		fill: none;
		stroke: hsl(214, 97%, 59%);
		stroke-width: 2;
		stroke-dasharray: 1, 200;
		stroke-dashoffset: 0;
		stroke-linecap: round;
		animation: dash4 1.5s ease-in-out infinite;
	}

	@keyframes rotate4 {
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes dash4 {
		0% {
			stroke-dasharray: 1, 200;
			stroke-dashoffset: 0;
		}

		50% {
			stroke-dasharray: 90, 200;
			stroke-dashoffset: -35px;
		}

		100% {
			stroke-dashoffset: -125px;
		}
	}
</style>
