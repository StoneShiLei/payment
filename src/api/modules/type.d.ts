interface IPaymentParamsData {
	body: string
	price: string
	remark: string
	returl: string
}

interface IPaymentParamsResponse {
	appid: string
	body: string
	charset: string
	cusid: string
	notify_url: string
	orgid: string
	randomstr: string
	remark: string
	reqsn: string
	returl: string
	sign: string
	signtype: string
	trxamt: string
	version: string
}
