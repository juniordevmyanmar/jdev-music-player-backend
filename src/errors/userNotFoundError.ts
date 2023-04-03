export class UserNotFoundError extends Error {
  protected error: any
  constructor(message: string) {
    super(message)
    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
  }

  errors() {
    return this.error
  }
}
