import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../schema/post.schema';
import { Model } from 'mongoose';
import { NewPost } from '../interface/newPost.interface';
import { IAllPost, IMyPost } from '../interface/myPost.interface';
import { User } from 'src/users/schema/user.schema';
import { TimeFormatter } from '../service/timeFormatter.service';

@Injectable()
export class PostDao {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
    private timeFormatter: TimeFormatter,
  ) {}
  async newPost(post: NewPost): Promise<any> {
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
          date: this.timeFormatter.dateFormatter(fecha),
          hour: this.timeFormatter.hourFormatter(fecha),
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
            date: this.timeFormatter.dateFormatter(fecha),
            hour: this.timeFormatter.hourFormatter(fecha),
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
