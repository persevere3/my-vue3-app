import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

export interface IInterceptorOptions {
  enableAuth?: boolean
  enableLoading?: boolean
  enableErrorToast?: boolean
  enableRetry?: boolean
  retryTimes?: number
  excludeUrls?: string[]
}

const defaultOptions: Required<IInterceptorOptions> = {
  enableAuth: true,
  enableLoading: true,
  enableErrorToast: true,
  enableRetry: false,
  retryTimes: 3,
  excludeUrls: []
}

export const setupInterceptors = (
  request: AxiosInstance, 
  options?: IInterceptorOptions
) => {
  const opts = { ...defaultOptions, ...options }

  // 請求攔截器
  request.interceptors.request.use(    
    (config) => {
      // const { enableAuth, enableLoading, excludeUrls } = opts
      // const isExcluded = excludeUrls.some(url => config.url?.includes(url))

      // // 認證
      // if (enableAuth && !isExcluded) {
      //   addAuthToken(config)
      // }

      // // Loading
      // if (enableLoading && !isExcluded) {
      //   showLoading()
      // }

      return config
    },
    (error) => {
      // if (opts.enableLoading) hideLoading()
      return Promise.reject(error)
    }
  )

  // 響應攔截器
  request.interceptors.response.use(
    (response) => {
      // if (opts.enableLoading) hideLoading()
      const { data, status } = response

      // HTTP status 檢查
      if (status !== 200) {
        if (opts.enableErrorToast) {
          ElMessage.error(`HTTP 錯誤: ${status}`)
        }
        return Promise.reject(response)
      }

      // 後端自定義 code 處理
      const code = data.code ?? 0

      switch (code) {
        case 0:
        case 200:
          return data.data ?? data // 一般成功

        case 401:
        case 1001: // 假設是 token 過期
          if (opts.enableErrorToast) {
            ElMessage.error(`登入過期，請重新登入`)
          }
          // redirectToLogin() // 自定義方法導向登入頁
          return Promise.reject(data)

        case 403:
          if (opts.enableErrorToast) {
            ElMessage.error(`沒有權限訪問`)
          }
          return Promise.reject(data)

        case 500:
          if (opts.enableErrorToast) {
            ElMessage.error(`伺服器錯誤`)
          }
          return Promise.reject(data)

        default:
          if (opts.enableErrorToast) {
            ElMessage.error(data.message || '未知錯誤')
          }
          return Promise.reject(data)
      }
    },
    async (error) => {
      // if (opts.enableLoading) hideLoading()

      // // 重試機制
      // if (opts.enableRetry && shouldRetry(error)) {
      //   return retryRequest(request, error, opts.retryTimes)
      // }

      // // 錯誤提示
      // if (opts.enableErrorToast) {
      //   showErrorToast(error)
      // }

      // 處理錯誤狀態碼
      const status = error.response?.status
      if (opts.enableErrorToast) {
        switch (status) {
          case 400:
            if (opts.enableErrorToast) ElMessage.error(`請求參數錯誤`)
            break
          case 401:
            if (opts.enableErrorToast) ElMessage.error(`未授權，請登入`)
            // redirectToLogin()
            break
          case 403:
            if (opts.enableErrorToast) ElMessage.error(`禁止訪問`)
            break
          case 404:
            if (opts.enableErrorToast) ElMessage.error(`資源不存在`)
            break
          case 500:
            if (opts.enableErrorToast) ElMessage.error(`伺服器錯誤`)
            break
          case 503:
            if (opts.enableErrorToast) ElMessage.error(`服務不可用`)
            break
          default:
            if (opts.enableErrorToast) ElMessage.error(`未知錯誤`)
            break
        }
      }

      return Promise.reject(error)
    }
  )
}

// 工具函數
const addAuthToken = (config: any) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
}

const shouldRetry = (error: AxiosError): boolean => {
  return !!(
    error.code === 'NETWORK_ERROR' ||
    error.response?.status === 500 ||
    error.response?.status === 502 ||
    error.response?.status === 503
  )
}

const retryRequest = async (
  request: AxiosInstance,
  error: AxiosError,
  retryTimes: number
): Promise<any> => {
  if (retryTimes > 0) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return request(error.config!)
  }
  return Promise.reject(error)
}