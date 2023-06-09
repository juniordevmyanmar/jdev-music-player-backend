import { Log } from '../utils/log'
import { Sequelize } from 'sequelize'

import UserModel from '../models/user'

export class DBConnect {
  private connection: Sequelize
  private dbHost: string
  private dbName: string
  private dbUser: string
  private dbPass: string

  constructor(dbHost: string, dbName: string, dbUser: string, dbPass: string) {
    this.dbHost = dbHost
    this.dbName = dbName
    this.dbUser = dbUser
    this.dbPass = dbPass
    this.connection = new Sequelize(this.dbName, this.dbUser, this.dbPass, {
      host: this.dbHost,
      dialect: 'postgres',
    })
  }

  public getConnection(): Sequelize {
    return this.connection
  }

  public dbInit() {
    UserModel(this.connection).sync({ alter: true })
  }
}
