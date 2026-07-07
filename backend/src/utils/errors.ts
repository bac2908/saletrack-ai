export function badRequest(message: string) {
  const error = new Error(message) as Error & { statusCode: number };
  error.statusCode = 400;
  return error;
}

export function notFound(message: string) {
  const error = new Error(message) as Error & { statusCode: number };
  error.statusCode = 404;
  return error;
}
