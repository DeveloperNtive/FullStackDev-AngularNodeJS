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

  async getUserId(
    email: string,
  ): Promise<{ id: string; fullName: string; email: string }> {
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
    return await this.userRepository.registerUser({
      fullName,
      email,
      passWord: hash,
    });
  }

  async loginUser(
    login: LoginUser,
  ): Promise<{ fullName: string; token: string }> {
    //Extraigo lo que necesito del request
    const { email, password } = login;
    try {
      //Verificar que el usuario exista
      const { fullName, passwordDB } = await this.userRepository.loginUser(
        email,
      );

      //Verificar que las contraseñas coincidan
      const coincidenciaDeContraseña = await bcrypt.compare(
        password,
        passwordDB,
      );

      //Si el usuario no existe envia error
      if (!passwordDB) {
        throw new Error(`Invalid Email or Password`);
      }
      //Si las contraseñas no coinciden envia error
      if (!coincidenciaDeContraseña) {
        throw new Error(`Invalid Email or Password`);
      }
      //Crea el token
      const token = await this.jwt.signAsync({ fullName, email }, this.jwtOptions);
      return {
        fullName,
        token,
      };
    } catch (error) {
      throw error;
    }
  }
}
