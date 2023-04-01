import { Request, Response, NextFunction } from 'express'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'

type ValidationReason = {
  [key: string]: any
}
export default class RequestValidator {
  static validate = <T extends object>(classInstance: ClassConstructor<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const convertedObject = plainToInstance(classInstance, req.body)
      await validate(convertedObject).then((errors) => {
        if (errors.length > 0) {
          let rawErrors: Array<ValidationReason> = []
          rawErrors = errors.map((error: ValidationError) => ({
            fieldName: error?.property,
            message: Object.entries(error.constraints || []).map((e) => ({
              key: e[0],
              value: e[1],
            })),
          }))

          next(rawErrors)
        }
      })
      next()
    }
  }
}
