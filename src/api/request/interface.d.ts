import { AxiosResponseDataKeyEum } from '~/enum'

export interface IResponseData<T = any> {
	code: number
	data: T
	msg: string
}
