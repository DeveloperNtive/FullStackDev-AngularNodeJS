import { IsNotEmpty, IsEmail, Length } from 'class-validator';
export class RegisterUserDTO {
  @IsNotEmpty()
  fullName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @Length(6, 10)
  @IsNotEmpty()
  passWord: string;
}
