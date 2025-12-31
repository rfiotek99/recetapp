export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends APIResponse<T> {
  page: number
  limit: number
  total: number
  hasMore: boolean
}
