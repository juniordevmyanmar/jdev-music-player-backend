import { Sequelize } from 'sequelize'
import { Log } from '../utils/log'
import BaseDomain from './base'
import HttpStatusCode from '../enum/httpstatus'

export default class UserDomain extends BaseDomain {
  private user: any

  constructor(db: Sequelize | null, tblName: string, userModel: any) {
    super(db, tblName)
    this.user = userModel
  }

  public async createUser(
    userName?: string,
    email?: string,
    password?: string,
    dateOfBirth?: string,
    address?: string,
  ): Promise<{ id: string | null; code: number; message: string }> {
    var id = ''
    try {
      const user = await this.user.create({
        name: userName,
        email: email,
        password: password,
        dateOfBirth: dateOfBirth,
        address: address,
      })
      id = user.id
    } catch (e: any) {
      Log.error(`UserDomain::createUser ${e.stack}`)
      return {
        id: id,
        code: HttpStatusCode.UNPROCESSABLE_ENTITY,
        message: 'user associated to that email already exists',
      }
    }
    return { id: id, code: HttpStatusCode.OK, message: 'success' }
  }
}
