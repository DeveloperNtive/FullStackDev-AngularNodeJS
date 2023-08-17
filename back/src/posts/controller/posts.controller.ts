import {
  ValidationPipe,
  Controller,
  HttpStatus,
  UsePipes,
  Headers,
  Body,
  Post,
  Get,
  Res,
  Param,
  Req,
  Query,
} from '@nestjs/common';
import { PostService } from '../service/post.service';
import { NewPostDTO } from '../dto/newPost.dto';
import { IHeaders } from '../interface/headers.interface';
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
  ): Promise<string> {
    const { authorization } = headers;
    const { tittle, message } = post;
    const token = authorization.split(' ')[1];
    try {
      const newToken = await this.postService.newPost(token, tittle, message);
      return response.status(HttpStatus.CREATED).send(JSON.stringify(newToken));
    } catch (error) {
      if (error.name == 'JsonWebTokenError') {
        return response
          .status(HttpStatus.FORBIDDEN)
          .send({ error: 'Token not valid!' });
      }
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'Something went wrong. Please try later!' });
    }
  }

  //Obtener mis posts
  @Get('myposts/:p')
  @UsePipes(new ValidationPipe({ transform: true }))
  async myPosts(
    @Headers() headers: IHeaders,
    @Res() response,
    @Param() params,
    @Query() query,
  ): Promise<IResponseMyPost | IErrorResponseMyPost> {
    const { date } = query;
    const { p } = params;
    const { authorization } = headers;
    const token = authorization.split(' ')[1];
    console.log({ pagina: p, fecha: date, token });
    try {
      //Validar que todo lo que venga por req sea valido
      //date:
      //Debe ser string,
      //Debe tener un tamaño de 10
      if (typeof date !== 'string' || date.length !== 10) {
        throw 'Date not valid!';
      }
      //Pagina:
      //Debe ser numero
      if (Number.isNaN(Number(p))) {
        throw 'Please send a valid pagination';
      }
      //Token debe ser valido
      let posts = await this.postService.myPosts(token, p, date);
      if (params.p > posts.paginatedPosts.totalPages) {
        posts = await this.postService.myPosts(
          token,
          posts.paginatedPosts.totalPages,
          date,
        );
      }
      //Paginacion
      return response.status(HttpStatus.OK).send({
        token: posts.token,
        posts: posts.paginatedPosts,
        totalPosts: posts.totalPosts
      });
    } catch (error) {
      if (error.name == 'JsonWebTokenError') {
        return response
          .status(HttpStatus.FORBIDDEN)
          .send({ error: 'Token not valid!' });
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: error,
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
