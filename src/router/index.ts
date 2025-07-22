import { createRouter, createWebHistory } from 'vue-router'

import { constantRoutes } from '@/router/constantRoutes'
import { asyncRoutes } from '@/router/asyncRoutes.ts'
import { setupRouterGuards } from '@/router/guards.ts'

const router = createRouter({
  history: createWebHistory(),
  routes: [...constantRoutes, ...asyncRoutes],
})

setupRouterGuards(router)

export default router