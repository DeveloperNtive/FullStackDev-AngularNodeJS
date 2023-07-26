import { Injectable } from '@nestjs/common';
import { PostDao } from '../dao/post.dao';
import { NewPost } from '../interface/newPost.interface';
import { IAllPost, IMyPost } from '../interface/myPost.interface';

@Injectable()
export class PostRepository {
  constructor(private postDao: PostDao) {}
  async newPost(post: NewPost): Promise<any> {
    return await this.postDao.newPost(post);
  }
  async myPosts(id: string, autor: string): Promise<IMyPost[]> {
    return await this.postDao.myPosts(id, autor);
  }
  async allPosts(): Promise<IAllPost[]> {
    return await this.postDao.allPosts();
  }
}
