// 通用響應
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
  error: string | null
}

// 分頁參數
export interface PaginationRequest {
  pageIndex: number
  pageSize: number
}

// 分頁響應
export interface PaginationResponse<T> {
  pageIndex: number
  pageSize: number
  totalCount: number
  totalPages: number
  items: Array<T>
}