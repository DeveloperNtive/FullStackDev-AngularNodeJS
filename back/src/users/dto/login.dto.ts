import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;
  @Length(6, 10)
  @IsNotEmpty()
  password: string;
}
