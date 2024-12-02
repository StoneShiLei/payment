// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{ path: '/', component: () => import('../pages/Home.vue') }, // 首页
	{ path: '/loading', component: () => import('../pages/Loading.vue') }, // 首页
	{ path: '/result', component: () => import('../pages/Result.vue') } // 首页
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
