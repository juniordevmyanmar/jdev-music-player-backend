import { DataTypes, Model, Optional, Sequelize, UUIDV4 } from 'sequelize'
import bcrypt from 'bcrypt'

interface UserAttributes {
  id: string
  name: string
  email: string
  password: string
  phone: string
  dateOfBirth: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface UserInput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: string
  public name!: string
  public email!: string
  public password!: string
  public phone!: string
  public dateOfBirth!: string
  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

const UserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      sequelize: sequelize,
      modelName: 'User',
      paranoid: true,
    },
  )

  User.beforeCreate((user) => {
    return bcrypt
      .hash(user.password, 10)
      .then((hash) => {
        user.password = hash
      })
      .catch((err) => {
        throw new Error()
      })
  })

  return User
}

export default UserModel
