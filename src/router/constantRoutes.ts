import type { RouteRecordRaw } from 'vue-router'

export const constantRoutes: RouteRecordRaw[] = [
  {
        path:"/",
        name:"Home",
        component:()=>import("@/layouts/Default/index.vue")
  },
  {
      path: '/login',
      name: 'Login',
      component: () => import("@/views/Login/index.vue"),
      meta: { title: '登入', public: true },
  },
  {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import("@/views/NotFound/index.vue"),
      meta: { title: '找不到頁面', public: true },
  },
]