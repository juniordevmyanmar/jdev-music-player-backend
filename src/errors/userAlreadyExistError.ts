export class UserAlreadyExistsError extends Error {
  protected error: any
  constructor(message: string, error: any) {
    super(message)
    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
    this.error = error
  }

  errors() {
    return this.error
  }
}
