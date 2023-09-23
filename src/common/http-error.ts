class HttpError extends Error {
  name: string
  statusCode?: number
  status?: number
  message: string
  error: string | null

  constructor(name: string, statusCode: number, message: string, error?: string) {
    super(message);

    this.name = name;
    this.statusCode = statusCode;
    this.message = message;
    this.error = error || null;
  }
}

export default HttpError;