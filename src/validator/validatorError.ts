import { Request, Response, NextFunction } from 'express'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  return res.status(422).json({ message: 'validation error', error: err })
}
