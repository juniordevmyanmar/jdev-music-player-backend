import { Sequelize, UniqueConstraintError, ValidationErrorItem } from 'sequelize'
import { Log } from '../utils/log'
import BaseDomain from './base'
import { ValidationReason } from '../types/validationErrorType'
import { UserAlreadyExistsError } from '../errors/UserAlreadyExistError'

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
  ): Promise<{ id: string | null }> {
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

      if (e instanceof UniqueConstraintError) {
        if (e.errors.length > 0) {
          let rawErrors: Array<ValidationReason> = []
          rawErrors = e.errors.map((error: ValidationErrorItem) => ({
            fieldName: error?.path,
            message: {
              key: error.path,
              value: error.path + ' already exist',
            },
          }))
          throw new UserAlreadyExistsError('failed to create user', rawErrors)
        }
        throw e
      }
    }
    return { id: id }
  }
}
