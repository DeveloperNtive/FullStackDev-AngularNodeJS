import { Injectable } from '@nestjs/common';
import { UserDao } from '../dao/user.dao';
import { RegisterUser } from '../interface/registerUser.interface';

@Injectable()
export class UserRepository {
  constructor(private userDao: UserDao) {}

  async getUserId(email: string): Promise<{id:string, fullName: string, email: string}> {
    return await this.userDao.getUserId(email);
  }

  async registerUser(user: RegisterUser): Promise<boolean> {
    return await this.userDao.registerUser(user);
  }

  loginUser(email: string): Promise<{ fullName: string; passwordDB: string }> {
    return this.userDao.loginUser(email);
  }
}
