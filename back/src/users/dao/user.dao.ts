import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import { RegisterUser } from '../interface/registerUser.interface';

@Injectable()
export class UserDao {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserId(
    Uemail: string,
  ): Promise<{ id: string; fullName: string; email: string }> {
    try {
      const user = await this.userModel.find({ email: Uemail });
      const { _id, fullName, email } = user[0];
      return {
        id: _id.toString(),
        fullName,
        email,
      };
    } catch (error) {
      return;
    }
  }

  async registerUser(user: RegisterUser): Promise<boolean> {
    const createdUser = new this.userModel(user);
    try {
      await createdUser.save();
      return true;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(
    email: string,
  ): Promise<{ fullName: string; passwordDB: string }> {
    const userFound = await this.userModel.find({ email }).exec();
    if (userFound.length > 0) {
      return {
        fullName: userFound[0].fullName,
        passwordDB: userFound[0].passWord,
      };
    }
    return;
  }
}
