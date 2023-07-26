import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { RegisterUser } from '../interface/registerUser.interface';
import { LoginUser } from '../interface/loginUser.interface';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import 'dotenv/config';

@Injectable()
export class UserService {
  jwtOptions: JwtSignOptions = {
    secret: process.env.JWT_PRIVATE_KEY,
    expiresIn: process.env.JWT_EXPIRE_TIME,
  };

  constructor(
    private userRepository: UserRepository,
    private jwt: JwtService,
  ) {}

  async getUserId(email: string): Promise<{id:string, fullName: string, email: string}> {
    return await this.userRepository.getUserId(email);
  }

  async cryptPassword(passWord: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(passWord, salt);
    return hash;
  }

  async registerUser(user: RegisterUser): Promise<boolean> {
    const { fullName, email, passWord } = user;
    const hash = await this.cryptPassword(passWord);
    return this.userRepository.registerUser({
      fullName,
      email,
      passWord: hash,
    });
  }

  async loginUser(login: LoginUser): Promise<string> {
    const { email, password } = login;
    //Verificar que el usuario exista
    try {
      const existeUsuario = await this.userRepository.loginUser(email);
      //Verificar que las contraseñas coincidan
      const coincidenciaDeContraseña = await bcrypt.compare(
        password,
        String(existeUsuario),
      );

      if (!existeUsuario) {
        throw new Error(`User or Password incorrect!`);
      }
      if (!coincidenciaDeContraseña) {
        throw new Error(`User or Password incorrect!`);
      }
      //Enviar token de inicio de sesion
      return await this.jwt.signAsync({ email }, this.jwtOptions);
    } catch (error) {
      throw error;
    }
  }
}
