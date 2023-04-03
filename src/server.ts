import express from 'express'
import bodyParser from 'body-parser'
import { createServer, Server } from 'http'
import cors from 'cors'
import UserDomain from './domain/user'
import UserModel from './models/user'

import { DBConnect } from './db/dbconnect'
import { Sequelize } from 'sequelize'
import UserHandler from './handlers/user'
import { errorHandler } from './validator/validatorError'
import HealthCheckHandler from './handlers/health'

class MusicPlayerAPIService {
  public static readonly PORT: number = 5000

  private port: string | number
  private expressApp: express.Application
  private server: Server
  private dbConnection: Sequelize

  constructor(dbConnection: Sequelize) {
    this.port = process.env.SERVER_PORT || MusicPlayerAPIService.PORT

    this.expressApp = express()
    this.expressApp.use(cors())
    this.expressApp.use(express.json())

    this.dbConnection = dbConnection

    this.setupRoutes()

    this.server = createServer(this.expressApp)
    this.listen()
  }

  get app(): express.Application {
    return this.expressApp
  }

  private setupRoutes(): void {
    const userDomain = new UserDomain(this.dbConnection, 'users', UserModel(this.dbConnection))

    new UserHandler(this.expressApp, userDomain)
    new HealthCheckHandler(this.expressApp)
  }

  private listen(): void {
    this.expressApp.use(bodyParser.urlencoded({ extended: false }))
    this.expressApp.use(bodyParser.json())
    this.expressApp.use(errorHandler)

    this.server.listen(this.port, () => {
      process.stdout.write(`Running server on port ${this.port}\n`)
    })
  }
}

async function musicPlayerApp() {
  const env = {
    dbName: process.env.DB_NAME || 'postgres',
    dbHost: process.env.DB_HOST || 'localhost',
    dbUser: process.env.DB_USER || 'postgres',
    dbPass: process.env.DB_PASS || 'mysecretpassword',
  }
  const pgConnect = new DBConnect(env.dbHost, env.dbName, env.dbUser, env.dbPass)

  try {
    // check if db is already connected
    // if db connection is successful, it will automatically create table.
    pgConnect.dbInit()
  } catch (err) {
    console.error(err)
  }

  const app = new MusicPlayerAPIService(pgConnect.getConnection()).app
  return app
}

const app = musicPlayerApp()

export default app
