import { pay_post, post } from '../request/instance'

export const fetchPaymentParams = (data: IPaymentParamsData) => {
	return post<IPaymentParamsResponse>('/snzx/evcs/pay/params', data)
}

export const fetchOrderSubmit = (data: IPaymentParamsResponse) => {
	return pay_post<IPaymentParamsResponse>('/apiweb/h5unionpay/unionorder', data, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}
