import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../schema/post.schema';
import { Model } from 'mongoose';
import { NewPost } from '../interface/newPost.interface';
import { IAllPost, IMyPost } from '../interface/myPost.interface';
import { User } from 'src/users/schema/user.schema';
import * as moment from 'moment';

@Injectable()
export class PostDao {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async newPost(post: NewPost): Promise<any> {
    console.log(Date.now());
    const postModel = new this.postModel({
      ...post,
      date: Date.now(),
    });
    try {
      return await postModel.save();
    } catch (error) {
      return;
    }
  }
  async myPosts(id: string, autor: string): Promise<IMyPost[]> {
    try {
      const postModel = await this.postModel.find({ userId: id });
      const posts = postModel.map((post) => {
        const fecha = new Date(Number(post.date));
        return {
          tittle: post.tittle,
          message: post.message,
          date: moment(fecha).format('DD/MM/yyyy'),
          hour: moment(fecha).format('hh:mm A'),
          autor,
        };
      });
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async allPosts(): Promise<IAllPost[]> {
    try {
      const postModel = await this.postModel.find();
      const posts = await Promise.all(
        postModel.map(async (post) => {
          const fecha = new Date(Number(post.date));
          const user = await this.userModel.findById(post.userId);
          return {
            tittle: post.tittle,
            message: post.message,
            date: moment(fecha).format('D/MM/yyyy'),
            hour: moment(fecha).format('hh:mm A'),
            autor: user.fullName,
          };
        }),
      );
      return posts;
    } catch (error) {
      throw error;
    }
  }
}
