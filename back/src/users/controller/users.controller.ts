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
import { RegisterUserDTO } from '../dto/register.dto';
import { LoginResponse } from '../interface/responseLogin.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async loginUser(
    @Body() login: LoginUserDto,
    @Res() response,
  ): Promise<LoginResponse | string> {
    //Recibo el request y lo desestructuro
    const { email, password } = login;
    try {
      //Consulto el usuario por email y contraseña
      const result = await this.userService.loginUser({ email, password });
      //Debe retornar una token
      return response.status(HttpStatus.OK).send({
        token: result.token,
        name: result.fullName,
      });
    } catch (error) {
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .send('Invalid Email or Password');
    }
  }

  @Post('signUp')
  @UsePipes(new ValidationPipe({ transform: true }))
  async registerUser(
    @Body() register: RegisterUserDTO,
    @Res() response,
  ): Promise<string> {
    const { fullName, email, passWord } = register;
    try {
      await this.userService.registerUser({
        fullName,
        email,
        passWord,
      });
      return response.status(HttpStatus.CREATED).send();
    } catch (error) {
      if (error.code === 11000) {
        return response
          .status(HttpStatus.CONFLICT)
          .send(`Email ${email} already exist!`);
      }
      if (error.code === undefined) {
        return response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send();
      }
    }
  }
}
