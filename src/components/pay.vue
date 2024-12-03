<template>
	<div class="payment-wrapper">
		<h1 class="title"></h1>
		<div class="input-container">
			<input
				class="amount-input"
				id="amount"
				type="number"
				max="1000"
				min="1"
				placeholder=""
				v-model="amount"
				required />
			<label class="floating-label" for="amount">充值金额</label>
		</div>
		<button class="pay-button" @click="handlePay">生成收款码</button>
		<div class="qr-code" v-if="qrCodeValue">
			<QrCodeVue :value="qrCodeValue" level="H" />
			<p class="desc">请使用支付宝或微信扫码支付</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import QrCodeVue from 'qrcode.vue'
	import { useRouter } from 'vue-router'

	const router = useRouter()
	const amount = ref('')
	const qrCodeValue = ref('')

	const handlePay = () => {
		// qrCodeValue.value = amount.value // 生成收款码的逻辑
		// 二维码扫码跳转到百度搜索
		// qrCodeValue.value = `https://www.baidu.com/s?wd=${amount.value}`
		router.push({
			path: '/loading',
			query: {
				price: amount.value
			}
		})
	}
</script>

<style lang="scss">
	$primary-color: #ab0253;
	$hover-color: #ab0254db;
	$background-color: #f9f9f9;
	$text-color: #4a4a4a;
	$label-color: #555;
	$input-border-color: #ccc;
	$input-focus-color: $primary-color;

	.payment-wrapper {
		margin: 0 auto;
		padding: 20px;
		text-align: center;
		border-radius: 10px;
		transition: transform 0.3s;

		.title {
			font-size: 30px;
			color: $text-color;
			margin-bottom: 20px;
		}

		.input-container {
			position: relative;
			margin-bottom: 20px;

			.amount-input {
				width: 100%;
				padding: 12px 12px 12px 12px;
				border: 1px solid $input-border-color;
				border-radius: 5px;
				font-size: 16px;
				background: transparent;
				box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
				transition: border-color 0.3s;

				&:focus {
					border-color: $input-focus-color;
					outline: none;

					~ .floating-label {
						top: -10px;
						left: 10px;
						font-size: 12px;
						color: $input-focus-color;
					}
				}

				&:valid + .floating-label,
				&:focus + .floating-label {
					top: -8px;
					left: 8px;
					font-size: 12px;
					padding: 2px 6px;
					background: #fff;
					color: $input-focus-color;
				}
			}

			.floating-label {
				position: absolute;
				left: 12px;
				top: 12px;
				font-size: 16px;
				color: $label-color;
				transition: 0.2s ease all;
				pointer-events: none;
			}
		}

		.pay-button {
			padding: 12px 25px;
			background-color: $primary-color;
			color: white;
			border: none;
			border-radius: 5px;
			font-size: 18px;
			cursor: pointer;
			transition: background-color 0.3s, transform 0.2s;

			&:hover {
				background-color: $hover-color;
			}
		}

		.qr-code {
			margin-top: 20px;
		}

		.desc {
			font-size: 14px;
			color: $text-color;
			margin-top: 10px;
		}
	}

	@media (max-width: 600px) {
		.payment-wrapper {
			.title {
				font-size: 26px;
			}

			.amount-input {
				font-size: 14px;
			}

			.pay-button {
				font-size: 16px;
				padding: 10px 20px;
			}
		}
	}
</style>
