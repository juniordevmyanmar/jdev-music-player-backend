import { IsNotEmpty, IsEmail } from 'class-validator'

export class LoginRequestRule {
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  password!: string
}
