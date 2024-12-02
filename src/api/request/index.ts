import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { AxiosInstance } from 'axios'
import { AxiosResponseCode } from '../../enums'
import type { IResponseData } from './interface'

export class HTTP {
	private readonly axiosInstance: AxiosInstance

	constructor(config: AxiosRequestConfig) {
		const { baseURL, ...rest } = config

		this.axiosInstance = axios.create({
			baseURL: config.baseURL,
			timeout: 1000 * 30,
			withCredentials: true,
			...rest
		})

		this.requestInterceptors()
		this.responseInterceptors()
	}

	public requestInterceptors() {
		this.axiosInstance.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				// 设置请求头
				config.headers['Content-Type'] = 'application/json'
				return config
			},
			error => {
				return Promise.reject(error)
			}
		)
	}

	public responseInterceptors() {
		this.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
			return new Promise((resolve, reject) => {
				const { data, status } = response
				if (status !== 200) {
					reject(data)
				}

				if (data.code !== AxiosResponseCode.success) {
					// TODO: 统一错误处理
					// handleError
					reject(data)
				}

				resolve(data)
			})
		})
	}

	public get instance() {
		return this.axiosInstance
	}

	public request<T>(config: AxiosRequestConfig<T>): Promise<IResponseData<T>> {
		return this.instance!.request(config)
	}

	public get = <T>(url: string, params: any = {}, config: AxiosRequestConfig = {}): Promise<IResponseData<T>> => {
		const option: AxiosRequestConfig = {
			url,
			method: 'GET',
			params,
			...config
		}
		return this.request(option)
	}

	public post = <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<IResponseData<T>> => {
		const option: AxiosRequestConfig = {
			url,
			method: 'POST',
			data,
			...config
		}
		return this.request(option)
	}

	public put = <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<IResponseData<T>> => {
		const option: AxiosRequestConfig = {
			url,
			method: 'PUT',
			data,
			...config
		}
		return this.request(option)
	}

	public remove = <T>(url: string, params: any = {}, config: AxiosRequestConfig = {}): Promise<IResponseData<T>> => {
		const option: AxiosRequestConfig = {
			url,
			method: 'DELETE',
			params,
			...config
		}
		return this.request(option)
	}
}
