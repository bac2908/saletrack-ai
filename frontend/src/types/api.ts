export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ListParams {
  limit?: number;
  page?: number;
  search?: string;
}

export interface PaginationMeta {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  items: T[];
  pagination: PaginationMeta;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: unknown;
}
