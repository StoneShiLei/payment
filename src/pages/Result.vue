<template>
	<div>
		{{ route.query }}
		<br />
		{{ status || '--' }}
		<br />
		{{ message }}
		<br />
		{{ errMessage }}
		<br />
		<div id="success-box" v-if="status === '0'">
			<div class="dot"></div>
			<div class="dot two"></div>
			<div class="face">
				<div class="eye"></div>
				<div class="eye right"></div>
				<div class="mouth happy"></div>
			</div>
			<div class="shadow scale"></div>
			<div class="message">
				<h1 class="alert">Success!</h1>
				<p>{{ message }}</p>
			</div>
		</div>

		<div id="error-box" v-if="['1', '3'].includes(status)">
			<div class="dot"></div>
			<div class="dot two"></div>
			<div class="face2">
				<div class="eye"></div>
				<div class="eye right"></div>
				<div class="mouth sad"></div>
			</div>
			<div class="shadow move"></div>
			<div class="message">
				<h1 class="alert">Error!</h1>
				<p>{{ message }}</p>
				<p>{{ errMessage }}</p>
			</div>
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
			// status.value = res.data.trxstatus
			// message.value = ['交易成功', '交易不存在', '交易处理中', '交易失败'][res.data.trxstatus as unknown as number]
			// errMessage.value = res.data.errmsg
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

	.green {
		color: darken($secondary, 20%);
	}

	.red {
		color: darken($error, 10%);
	}

	.alert {
		font-weight: 700;
		letter-spacing: 5px;
	}

	p {
		margin-top: -5px;
		font-size: 0.5em;
		font-weight: 100;
		color: darken($dark, 10%);
		letter-spacing: 1px;
	}

	button,
	.dot {
		cursor: pointer;
	}

	#success-box {
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom right, $success 40%, $secondary 100%);
		box-shadow: 5px 5px 20px rgba($gray, 10%);
		perspective: 40px;
	}

	#error-box {
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom left, $error 40%, $orange 100%);
		box-shadow: 5px 5px 20px rgba($gray, 10%);
	}

	.dot {
		width: 8px;
		height: 8px;
		background: $white;
		border-radius: 50%;
		position: absolute;
		top: 4%;
		right: 6%;
		&:hover {
			background: darken($white, 20%);
		}
	}

	.two {
		right: 12%;
		opacity: 0.5;
	}

	.face {
		position: absolute;
		width: 22%;
		height: 15%;
		background: $white;
		border-radius: 50%;
		border: 1px solid $dark;
		top: 26%;
		left: 39%;
		z-index: 2;
		animation: bounce 1s ease-in infinite;
	}

	.face2 {
		position: absolute;
		width: 22%;
		height: 22%;
		background: $white;
		border-radius: 50%;
		border: 1px solid $dark;
		top: 21%;
		left: 37.5%;
		z-index: 2;
		animation: roll 3s ease-in-out infinite;
	}

	.eye {
		position: absolute;
		width: 5px;
		height: 5px;
		background: $dark;
		border-radius: 50%;
		top: 40%;
		left: 20%;
	}

	.right {
		left: 68%;
	}

	.mouth {
		position: absolute;
		top: 43%;
		left: 41%;
		width: 7px;
		height: 7px;
		border-radius: 50%;
	}

	.happy {
		border: 2px solid;
		border-color: transparent $dark $dark transparent;
		transform: rotate(45deg);
	}

	.sad {
		top: 49%;
		border: 2px solid;
		border-color: $dark transparent transparent $dark;
		transform: rotate(45deg);
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

	.scale {
		animation: scale 1s ease-in infinite;
	}
	.move {
		animation: move 3s ease-in-out infinite;
	}

	.message {
		position: absolute;
		width: 100%;
		text-align: center;
		height: 40%;
		top: 47%;
	}

	.button-box {
		position: absolute;
		background: $white;
		width: 50%;
		height: 15%;
		border-radius: 20px;
		top: 73%;
		left: 25%;
		outline: 0;
		border: none;
		box-shadow: 2px 2px 10px rgba($dark, 0.5);
		transition: all 0.5s ease-in-out;
		&:hover {
			background: darken($white, 5%);
			transform: scale(1.05);
			transition: all 0.3s ease-in-out;
		}
	}

	@keyframes bounce {
		50% {
			transform: translateY(-10px);
		}
	}

	@keyframes scale {
		50% {
			transform: scale(0.9);
		}
	}

	@keyframes roll {
		0% {
			transform: rotate(0deg);
			left: 25%;
		}
		50% {
			left: 60%;
			transform: rotate(168deg);
		}
		100% {
			transform: rotate(0deg);
			left: 25%;
		}
	}

	@keyframes move {
		0% {
			left: 25%;
		}
		50% {
			left: 60%;
		}
		100% {
			left: 25%;
		}
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
