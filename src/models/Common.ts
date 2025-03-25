export interface ApiResult {
  isSuccess: boolean;
  statusCode: number;
  message: string;
}
export interface ApiResultWithData<T> extends ApiResult {
  data: T[];
}

export interface ApiResultWithAData<T> extends ApiResult {
  data: T;
}

export interface ApiResultWithPagination<T> extends ApiResultWithData<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}
export interface Filter {
  pageNumber: number;
  pageSize: number;
}

export interface Pagination<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  data: T[];
}
