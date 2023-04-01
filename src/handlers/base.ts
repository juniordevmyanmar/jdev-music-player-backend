import HttpStatusCode from '../enum/httpstatus'

export default class BaseHandler {
  protected resBody(payload: any) {
    return { data: payload }
  }

  protected resError(error: { error: string; message: string; code: HttpStatusCode }) {
    return error
  }

  protected badResErr(error: { error: Array<{ reason: string; metadata: any }>; message: string }) {
    return error
  }

  protected internalServerError(message: string) {
    return this.resError({ error: 'Internal Server Error', message, code: HttpStatusCode.INTERNAL_SERVER_ERROR })
  }

  protected unprocessableEntity(message: string) {
    return this.resError({ error: 'Unprocessable Entity', message, code: HttpStatusCode.UNPROCESSABLE_ENTITY })
  }

  protected badRequestError(message: string, error: any) {
    return this.badResErr({ message, error: error })
  }
}
