import express from 'express'
import * as core from 'express-serve-static-core'

import BaseHandler from './base'

export default class HealthCheckHandler extends BaseHandler {
  private app: express.Application
  constructor(route: express.Application) {
    super()
    this.app = route

    this.instantiateRoute()
  }

  public getRouter(): core.Router {
    return this.app
  }

  private instantiateRoute(): void {
    this.app.get('/health', this.healthCheck.bind(this))
  }

  private async healthCheck(
    req: core.Request<
      {},
      any,
      any,
      Record<string, any>
    >,
    res: core.Response<any, Record<string, any>, number>,
  ) {
    res.status(200).json(this.resBody({ message: 'success' }))
  }
}
