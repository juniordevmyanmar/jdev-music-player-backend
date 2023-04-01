import express from 'express'
import * as core from 'express-serve-static-core'
import RequestValidator from '../validator/requestValidator'
import { CreateUserRequestRule } from '../validator/rules/register'
import { UserAlreadyExistsError } from '../errors/UserAlreadyExistError'

import BaseHandler from './base'
import HttpStatusCode from '../enum/httpstatus'
import UserDomain from '../domain/user'

export default class UserHandler extends BaseHandler {
  private app: express.Application
  private userDomain: UserDomain
  constructor(route: express.Application, userDomain: UserDomain) {
    super()
    this.app = route
    this.userDomain = userDomain
    this.instantiateRoute()
  }

  public getRouter(): core.Router {
    return this.app
  }

  private instantiateRoute(): void {
    this.app.post('/user', RequestValidator.validate(CreateUserRequestRule), this.createUser.bind(this))
  }

  private async createUser(
    req: core.Request<
      {},
      { data: { name: string; email?: string; password?: string; dateOfBirth?: string; address?: string } },
      any,
      Record<string, any>
    >,
    res: core.Response<any, Record<string, any>, number>,
  ) {
    const payload = req.body

    try {
      const { id } = await this.userDomain.createUser(
        payload.name,
        payload.email,
        payload.password,
        payload.dateOfBirth,
        payload.address,
      )
      res.status(HttpStatusCode.OK).json(this.resBody(id))
    } catch (err: any) {
      if (err instanceof UserAlreadyExistsError) {
        res.status(HttpStatusCode.BAD_REQUEST).json(this.badRequestError(err.message, err.errors()))
        return
      }
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(this.internalServerError('Failed to set User'))
    }
  }
}
