import {
  Headers,
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { PostService } from '../service/post.service';
import { NewPostDTO } from '../dto/newPost.dto';
import { IHeaders } from '../interface/headers.interface';
import { IResponsePost } from '../interface/newPost.interface';
import {
  IErrorResponseMyPost,
  IResponseMyPost,
} from '../interface/myPost.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  //Creacion de posts
  @Post('newpost')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPost(
    @Headers() headers: IHeaders,
    @Body() post: NewPostDTO,
    @Res() response,
  ): Promise<IResponsePost | IResponsePost> {
    const { authorization } = headers;
    const { tittle, message } = post;
    const token = authorization.split(' ')[1];
    try {
      const newToken = await this.postService.newPost(token, tittle, message);
      return response.status(HttpStatus.CREATED).send({
        statusCode: HttpStatus.CREATED.toString(),
        token: newToken,
        post: {
          tittle,
          message,
        },
      });
    } catch (error) {
      if (error.name == 'JsonWebTokenError') {
        return response.status(HttpStatus.FORBIDDEN).send({
          statusCode: HttpStatus.FORBIDDEN.toString(),
          message: 'Token not valid!',
        });
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
        message: 'Something went wrong. Please try later!',
      });
    }
  }
  //Obtener mis posts
  @Get('myposts')
  @UsePipes(new ValidationPipe({ transform: true }))
  async myPosts(
    @Headers() headers: IHeaders,
    @Res() response,
  ): Promise<IResponseMyPost | IErrorResponseMyPost> {
    const { authorization } = headers;
    const token = authorization.split(' ')[1];
    try {
      const posts = await this.postService.myPosts(token);
      return response.status(HttpStatus.ACCEPTED).send({
        statusCode: HttpStatus.ACCEPTED.toString(),
        token: posts.token,
        posts: posts.posts,
      });
    } catch (error) {
      console.log(error)
      if (error.name == 'JsonWebTokenError') {
        return response.status(HttpStatus.FORBIDDEN).send({
          statusCode: HttpStatus.FORBIDDEN.toString(),
          message: 'Token not valid!',
        });
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
        message: 'Something went wrong. Please try later!',
      });
    }
  }
  //Obtener todos los post
  @Get('allpost')
  @UsePipes(new ValidationPipe({ transform: true }))
  async allPosts(
    @Headers() headers: IHeaders,
    @Res() response,
  ): Promise<IResponseMyPost | IErrorResponseMyPost> {
    const token = headers.authorization.split(' ')[1];
    try {
      const posts = await this.postService.allPost(token);
      return response.status(HttpStatus.ACCEPTED).send({
        statusCode: HttpStatus.ACCEPTED.toString(),
        token: posts.token,
        posts: posts.posts,
      });
    } catch (error) {
      if (error.name == 'JsonWebTokenError') {
        return response.status(HttpStatus.FORBIDDEN).send({
          statusCode: HttpStatus.FORBIDDEN.toString(),
          message: 'Token not valid!',
        });
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
        message: 'Something went wrong. Please try later!',
      });
    }
  }
  //Filtros
  //ByDate
  //ByTittleWord
}
