import { Length, IsNotEmpty, MaxLength, IsEmail, IsDateString, IsOptional } from 'class-validator'
export class CreateUserRequestRule {
  @MaxLength(100)
  @IsNotEmpty()
  name!: string

  @IsEmail()
  email!: string

  @Length(8, 30)
  password!: string

  @IsOptional()
  @MaxLength(50)
  address!: string

  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'date must be in the format of yyyy-mm-dd',
    },
  )
  dateOfBirth!: string

  @IsOptional()
  @MaxLength(10)
  phone!: string
}
