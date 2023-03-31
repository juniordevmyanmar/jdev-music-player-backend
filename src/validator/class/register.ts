import { Length, IsNotEmpty, MaxLength, IsEmail, IsDateString } from 'class-validator'
export class CreateUserRequest {
  @MaxLength(100)
  @IsNotEmpty()
  name!: string

  @IsEmail()
  email!: string

  @Length(8, 30)
  password!: string

  @MaxLength(50)
  address!: string

  @IsDateString(
    {},
    {
      message: 'date must be in the format of yyyy-mm-dd',
    },
  )
  dateOfBirth!: string
}
