import { Injectable } from '@nestjs/common';
import { UserDao } from '../dao/user.dao';
import { RegisterUser } from '../interface/registerUser.interface';
import { ResponseUser } from '../interface/responseUser.interface';
import { ErrorCreation } from '../interface/ErrorCreation.interface';
import { LoginUser } from '../interface/loginUser.interface';

@Injectable()
export class UserRepository {
  constructor(private userDao: UserDao) {}

  async getUserId(email: string): Promise<{id:string, fullName: string, email: string}> {
    return await this.userDao.getUserId(email);
  }

  async registerUser(user: RegisterUser): Promise<boolean> {
    return await this.userDao.registerUser(user);
  }

  loginUser(login: string): Promise<string | ErrorCreation> {
    return this.userDao.loginUser(login);
  }
}
