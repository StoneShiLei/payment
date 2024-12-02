import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue()]
	// 配置代理
	// server: {
	// 	proxy: {
	// 		'/pay': {
	// 			target: 'https://syb.allinpay.com',
	// 			changeOrigin: true,
	// 			rewrite: path => path.replace(/^\/pay/, '')
	// 		}
	// 	}
	// }
})
