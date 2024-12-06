interface ICreateOrderData {
	body: string
	price: string
	remark: string
	returl: string
	reqsn: string
}

interface ICreateOrderResponse {
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
	trxamt: number
	version: string
}

interface IQueryOrderResponse {
	errmsg: string
	trxid: string
	trxstatus: string
}
