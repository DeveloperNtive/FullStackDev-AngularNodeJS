import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PostController } from './posts/controller/posts.controller';
import { UserController } from './users/controller/users.controller';
import { UserService } from './users/service/user.service';

import { UserRepository } from './users/repository/user.repository';
import { PostRepository } from './posts/repository/post.repository';

import { PostService } from './posts/service/post.service';

import { UserDao } from './users/dao/user.dao';
import { PostDao } from './posts/dao/post.dao';

import { UserModel } from './users/model/userModel.model';
import { PostModel } from './posts/model/post.model';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import { PostMiddleware } from './posts/middleware/post.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_STRING_CONNECTION),
    MongooseModule.forFeature([UserModel]),
    MongooseModule.forFeature([PostModel]),
  ],
  controllers: [UserController, PostController],
  providers: [
    UserService,
    PostService,
    JwtService,
    UserRepository,
    PostRepository,
    UserDao,
    PostDao,
  ],
})
export class AppModule  {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(PostMiddleware)
  //     .forRoutes(
  //       { path: 'post/newpost', method: RequestMethod.POST },
  //       { path: 'post/myposts', method: RequestMethod.GET },
  //       { path: 'post/allpost', method: RequestMethod.GET },
  //     );
  // }
}
