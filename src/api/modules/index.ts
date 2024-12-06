import { get, pay_post, post } from '../request/instance'

export const fetchCreateOrder = (data: ICreateOrderData) => {
	return post<ICreateOrderResponse>('/snzx/evcs/pay/order/create', data)
}

export const fetchOrderSubmit = (data: ICreateOrderResponse) => {
	return pay_post<ICreateOrderResponse>('/apiweb/h5unionpay/unionorder', data, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

export const fetchQueryOrder = (trxid: string,reqsn:string) => {
	return get<IQueryOrderResponse>('/snzx/evcs/pay/order/query', { trxid:trxid,reqsn:reqsn })
}
