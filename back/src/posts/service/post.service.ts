import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserService } from 'src/users/service/user.service';
import { PostRepository } from '../repository/post.repository';
import { IMyPost, IAllPost } from '../interface/myPost.interface';

@Injectable()
export class PostService {
  jwtOptions: JwtSignOptions = {
    secret: process.env.JWT_PRIVATE_KEY,
    expiresIn: process.env.JWT_EXPIRE_TIME,
  };
  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private postRepository: PostRepository,
  ) {}

  async verifyToken(token: string): Promise<any> {
    return this.jwt.verifyAsync(token, {
      secret: process.env.JWT_PRIVATE_KEY,
    });
  }

  async getUserId(
    email: string,
  ): Promise<{ id: string; fullName: string; email: string }> {
    return await this.userService.getUserId(email);
  }

  async newPost(token: string, tittle: string, message: string) {
    try {
      const { email } = await this.verifyToken(token);
      const { id } = await this.getUserId(email);
      await this.postRepository.newPost({ tittle, message, userId: id });
      return await this.jwt.signAsync({ email }, this.jwtOptions);
    } catch (error) {
      throw error;
    }
  }

  async myPosts(token: string): Promise<{ token: string; posts: IMyPost[] }> {
    try {
      const { email } = await this.verifyToken(token);
      const { id, fullName } = await this.getUserId(email);
      const posts = await this.postRepository.myPosts(id, fullName);
      const newToken = await this.jwt.signAsync({ email }, this.jwtOptions);
      return {
        token: newToken,
        posts,
      };
    } catch (error) {
      throw error;
    }
  }

  async allPost(token: string): Promise<{ token: string; posts: IAllPost[] }> {
    try {
      const { email } = await this.verifyToken(token);
      const posts = await this.postRepository.allPosts();
      const newToken = await this.jwt.signAsync({ email }, this.jwtOptions);
      return {
        token: newToken,
        posts,
      };
    } catch (error) {
      throw error;
    }
  }
}
