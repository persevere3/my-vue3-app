import request from '../axios'
import type { ApiResponse } from '@/types/api.d.ts'
import type { User, UserDetail } from '@/types/user.ts'

export default {
  get: (): Promise<ApiResponse<User[]>> => request.get('/users'),
  create: (data: UserDetail): Promise<ApiResponse<null>> => request.post('/users', data),
  update: (data: UserDetail): Promise<ApiResponse<null>> => request.put('/users', data),
  remove: (id: string) => request.delete(`/users/${id}`),
};