import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserService } from 'src/users/service/user.service';
import { PostRepository } from '../repository/post.repository';
import { IMyPost, IAllPost, Post } from '../interface/myPost.interface';
import moment from 'moment';

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
      const { fullName, email } = await this.verifyToken(token);
      const { id } = await this.getUserId(email);
      await this.postRepository.newPost({ tittle, message, userId: id });
      return await this.jwt.signAsync({ fullName, email }, this.jwtOptions);
    } catch (error) {
      throw error;
    }
  }

  async myPosts(
    token: string,
    pagination: number,
    date: string = moment(Date.now()).format('DD/MM/yyyy'),
  ): Promise<{ token: string; paginatedPosts: Post, totalPosts: number }> {
    try {
      const { fullName, email } = await this.verifyToken(token);
      const { id } = await this.getUserId(email);
      const posts = await this.postRepository.myPosts(id, fullName); //Traigo todos los post de un usuario
      const paginatedPosts = this.paginacion(pagination, date, posts);
      const newToken = await this.jwt.signAsync(
        { fullName, email },
        this.jwtOptions,
      );
      return {
        token: newToken,
        paginatedPosts,
        totalPosts: posts.length
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

  paginacion = (pagina: number, date: string, post: IMyPost[]) => {
    let itemsFiltered = this.filterNyDate(date, post)
    const itemsPerPage = 2;
    const totalItems = itemsFiltered.length;
    const start = (pagina - 1) * itemsPerPage;
    const totalPages = Math.ceil(totalItems / 2);
    const hasNextPage = pagina < totalPages;
    let end;

    if (itemsPerPage < totalItems) {
      end = itemsPerPage * pagina;
      if (end > totalItems) {
        end = totalItems;
      }
    }

    const itemsPaginados = itemsFiltered.slice(start, end);

    return {
      data: itemsPaginados,
      currentPage: pagina,
      totalPages,
      hasNextPage,
    };
  };

  filterNyDate = (date: string, post: IMyPost[]) => {
    return post.filter((post) => post.date == date);
  };
}
