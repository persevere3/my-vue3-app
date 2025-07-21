import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 可根據環境變數切換不同 baseURL
const baseURL = import.meta.env.VITE_API_BASE || '/api'

// 建立 Axios 實例
const service = axios.create({
  baseURL,
  timeout: 10000,
})

// 請求攔截器（可加 token 或自定 headers）
service.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// 回應攔截器（統一錯誤處理）
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 可根據 API 格式統一解包
    return response.data
  },
  (error) => {
    console.error('API error:', error)
    return Promise.reject(error)
  }
)

export default service