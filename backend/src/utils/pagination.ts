export interface PaginationQuery {
  limit?: unknown;
  page?: unknown;
  search?: unknown;
}

export interface PaginationParams {
  limit: number;
  page: number;
  search: string;
  skip: number;
}

export interface PaginatedResult<T> {
  items: T[];
  pagination: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
}

function toPositiveInt(value: unknown, fallback: number) {
  const numberValue = Number(value);
  return Number.isInteger(numberValue) && numberValue > 0 ? numberValue : fallback;
}

export function getPaginationParams(query: PaginationQuery): PaginationParams {
  const page = toPositiveInt(query.page, 1);
  const limit = Math.min(toPositiveInt(query.limit, 10), 100);
  const search = typeof query.search === 'string' ? query.search.trim() : '';

  return {
    limit,
    page,
    search,
    skip: (page - 1) * limit,
  };
}

export function createPaginatedResult<T>(
  items: T[],
  total: number,
  params: Pick<PaginationParams, 'limit' | 'page'>,
): PaginatedResult<T> {
  const totalPages = Math.max(Math.ceil(total / params.limit), 1);

  return {
    items,
    pagination: {
      hasNextPage: params.page < totalPages,
      hasPreviousPage: params.page > 1,
      limit: params.limit,
      page: params.page,
      total,
      totalPages,
    },
  };
}
