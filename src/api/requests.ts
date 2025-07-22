import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios'
import { setupInterceptors, type InterceptorOptions } from './interceptors.ts'

// 工廠函數參數型別
interface ICreateRequestOptions {
  config?: CreateAxiosDefaults
  useInterceptors?: boolean
  interceptorOptions?: InterceptorOptions
}

// 不同環境的基礎配置
const basicConfigs: Record<string, CreateAxiosDefaults>  = {
  development: {
    baseURL: 'http://localhost:3000/api',
    timeout: 10000
  },
  production: {
    baseURL: 'https://api.example.com',
    timeout: 5000
  }
}

// 創建 request 的工廠函數
export const createRequest = ({
    config,
    useInterceptors = true,
    interceptorOptions,
  }: ICreateRequestOptions = {}): AxiosInstance => {
  
  // 基礎配置
  const env = import.meta.env.MODE || 'development'

  const baseConfig: CreateAxiosDefaults = {
    ...basicConfigs[env],
    headers: {
      'Content-Type': 'application/json'
    },
    ...config
  }

  const request = axios.create(baseConfig)

  // 條件性應用攔截器
  if (useInterceptors) {
    setupInterceptors(request, interceptorOptions)
  }

  return request
}

// 預定義的 request 實例
export const request = createRequest()

// 無攔截器的 request
export const rawRequest = createRequest({ useInterceptors: false })

// 上傳專用 request
export const uploadRequest = createRequest({
  config: {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 30000 // 上傳超時時間更長
  },
  interceptorOptions: {
    enableLoading: false, // 上傳不顯示全局 loading
    enableErrorToast: true
  }
})