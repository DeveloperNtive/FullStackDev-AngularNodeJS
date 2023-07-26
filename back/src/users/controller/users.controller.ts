import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { LoginUserDto } from '../dto/login.dto';
import { Error } from '../dto/error.interface';
import { RegisterUserDTO } from '../dto/register.dto';
import { ResponseUser } from '../interface/responseUser.interface';
import { ErrorCreation } from '../interface/ErrorCreation.interface';
import { LoginResponse } from '../interface/responseLogin.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signUp')
  @UsePipes(new ValidationPipe({ transform: true }))
  async registerUser(
    @Body() register: RegisterUserDTO,
    @Res() response,
  ): Promise<ResponseUser | ErrorCreation> {
    console.log(register);
    const { fullName, email, passWord } = register;
    const user = await this.userService.registerUser({
      fullName,
      email,
      passWord,
    });
    if (user) {
      return response.status(HttpStatus.CREATED).send({
        statusCode: HttpStatus.CREATED,
        userCreated: { fullName, email },
      });
    } else {
      return response.status(HttpStatus.BAD_REQUEST).send({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Email ${email} already exist!`,
      });
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async loginUser(
    @Body() login: LoginUserDto,
    @Res() response,
  ): Promise<LoginResponse | Error> {
    const { email, password } = login;
    try {
      const result = await this.userService.loginUser({ email, password });
      //Debe retornar una token
      if (result) {
        return response.status(HttpStatus.OK).send({
          statusCode: HttpStatus.OK.toString(),
          email,
          token: result,
        });
      } else {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .send('Usuario o contraseña no coninciden!');
      }
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('Usuario o contraseña no coninciden!');
    }
  }
}
