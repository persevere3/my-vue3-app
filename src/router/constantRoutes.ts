import type { RouteRecordRaw } from 'vue-router'

export const constantRoutes: RouteRecordRaw[] = [
  {
        path:"/",
        name:"Home",
        component:()=>import("@/layouts/Default")
  },
  {
      path: '/login',
      name: 'Login',
      component: () => import("@/views/Login"),
      meta: { title: '登入', public: true },
  },
  {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import("@/views/NotFound"),
      meta: { title: '找不到頁面', public: true },
  },
]