import { request } from '@/api/request.ts'
import type { ApiResponse, PaginationRequest, PaginationResponse } from '@/api/types.ts'

import type { User, UserDetail } from './types'

const urlMap = {
  get: `/users`,
  create: `/users`,
  update: `/users`,
  remove: (id: string) => `/users/${id}`,

  getUser: `/users`,
  getUserList: `/users`
} as const

export default {
  get: (): Promise<ApiResponse<User[]>> => request.get(urlMap.get),
  create: (data: UserDetail): Promise<ApiResponse<null>> => request.post(urlMap.create, data),
  update: (data: UserDetail): Promise<ApiResponse<null>> => request.put(urlMap.update, data),
  remove: (id: string) => request.delete(urlMap.remove(id)),
  
  getUser: (params: { plat?: string; site?: string; uid?: string; state?: string; pageIndex: number; pageSize: number }): Promise<PaginationResponse<User>> => request.get(urlMap.getUser, { params }),
  getUserList: (params: PaginationRequest): Promise<ApiResponse<User[]>> => request.get(urlMap.getUserList, params),
};