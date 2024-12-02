import { config } from './config'
import { HTTP } from './index'

export const { get, post, put, remove } = new HTTP({ baseURL: config.baseURL })
export const { post: pay_post } = new HTTP({ baseURL: config.payBaseURL })
