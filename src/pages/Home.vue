<template>
	<div class="payment-wrapper">
		<h1 class="title">闪能智享</h1>
		<div class="input-container">
			<van-cell-group>
				<van-field
					v-model="params.amount"
					type="number"
					:formatter="formatter"
					format-trigger="onBlur"
					label="充值金额"
					placeholder="请输入充值金额"
					required />
				<van-field v-model="params.name" label="客户名称" required placeholder="请输入" />
				<van-field
					v-model="params.businessType"
					is-link
					readonly
					label="业务类型"
					placeholder="请选择"
					required
					@click="showPicker = true" />
				<van-popup v-model:show="showPicker" round position="bottom">
					<van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
				</van-popup>
				<van-field v-model="params.remark" label="备注" placeholder="请输入" />
			</van-cell-group>
		</div>
		<button class="pay-button" @click="handlePay">生成收款码</button>
		<div class="qr-code" v-if="qrCodeValue">
			<QrCodeVue :value="qrCodeValue" level="H" size="240" />
			<p class="desc">请使用支付宝或微信扫码支付</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import QrCodeVue from 'qrcode.vue'
	import Swal from 'sweetalert2'

	const createForm = () => ({
				amount: '',
				name: '',
				businessType: '充电卡',
				remark: ''
			})
			
	const showPicker = ref(false)
	const columns = ref([{ text: '充电卡', value: '充电卡' }])
	const params = ref(createForm())
	const qrCodeValue = ref('')



	const formatter = (value: string) => {
		// 格式化金额，最大值为 9999、最小值为 1、小数点后最多保留 2 位
		if (value === '') {
			return ''
		}

		// 限制最大值为9999，最小值为1
		if (Number(value) > 99999) {
			value = '99999'
		} else if (Number(value) < 0.01) {
			value = '0.01'
		}

		// 保留最多两位小数
		value = parseFloat(value).toFixed(2)

		// 格式化金额，例如千分位分隔符
		return value
	}

	const onConfirm = ({ selectedOptions }: { selectedOptions: Array<{ text: string }> }) => {
		console.log(selectedOptions[0].text)

		params.value.businessType = selectedOptions[0].text
		showPicker.value = false
	}

	const generateOrderNumber = () => {
		const now = new Date()
		const year = now.getFullYear()
		const month = String(now.getMonth() + 1).padStart(2, '0')
		const day = String(now.getDate()).padStart(2, '0')
		const hour = String(now.getHours()).padStart(2, '0')
		const minute = String(now.getMinutes()).padStart(2, '0')
		const second = String(now.getSeconds()).padStart(2, '0')
		const millisecond = String(now.getMilliseconds()).padStart(3, '0')
		const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
		
		return `${year}${month}${day}${hour}${minute}${second}${millisecond}${random}`
	}
	

	const handlePay = () => {
		if (!params.value.amount) {
			showToast('请输入充值金额')
			return
		}

		if (!params.value.name) {
			showToast('请输入客户名称')
			return
		}

		if (!params.value.businessType) {
			showToast('请选择业务类型')
			return
		}
		console.log(params.value)

		const baseUrl = window.location.origin
		qrCodeValue.value = `${baseUrl}/loading?reqsn=${generateOrderNumber()}&price=${Number(params.value.amount) * 100}&body=${
			params.value.businessType
		}&remark=${params.value.name}|${params.value.remark}`

		Swal.fire({
			title: "客户已支付完成",
			text: "请重新生成二维码",
			icon: "success"
		}).then(() =>{
			params.value = createForm()
			qrCodeValue.value = ''
		});
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
		padding: 12px;
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
			border-radius: 8px;
			box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
			padding: 6px;

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
				width: 240px;
				// padding: 10px 20px;
			}
		}
	}
</style>
