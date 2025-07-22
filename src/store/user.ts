import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { fetchUserRoutes } from '@/api/routes'
// import { transformBackendRoutes } from '@/router/backendRoutes'
// import router from '@/router'

export const useUserStore = defineStore('user', () => {
  // 👉 State
  const token = ref('')
  const userInfo = ref<any>(null)
  const routesLoaded = ref(false)

  // 👉 Actions
  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    routesLoaded.value = false
    localStorage.removeItem('token')
  }

  async function loadRoutes() {
    if (routesLoaded.value) return

    // const backendRoutes = await fetchUserRoutes()
    // const vueRoutes = transformBackendRoutes(backendRoutes)

    // vueRoutes.forEach(route => {
    //   router.addRoute(route)
    // })

    routesLoaded.value = true
  }

  return {
    // state
    token,
    userInfo,
    routesLoaded,

    // actions
    setToken,
    logout,
    loadRoutes,
  }
})