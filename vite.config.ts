import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			imports: ['vue', 'vue-router', 'pinia', {}],
			dts: 'src/typings/auto-imports.d.ts',
			resolvers: [VantResolver()]
		}),
		Components({
			dts: 'src/typings/components.d.ts',
			extensions: ['vue'], // extensions: ['vue']
			deep: true,
			include: [/\.vue$/, /\.vue\?vue/],
			exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
			resolvers: [VantResolver()]
		})
	]
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
