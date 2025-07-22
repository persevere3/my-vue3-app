// src/router/guards.ts
import type { Router } from 'vue-router'
import { useUserStore } from '@/store/user'

export function setupRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    const isPublic = to.meta.public

    if (isPublic) return next()

    if (!userStore.token) {
      return next({ path: '/login' })
    }

    // 權限檢查
    const roles = to.meta.roles as string[] | undefined
    if (roles && !roles.includes(userStore.role)) {
      return next('/404')
    }

    next()
  })

  router.afterEach((to) => {
    document.title = to.meta.title || '管理系統'
  })
}