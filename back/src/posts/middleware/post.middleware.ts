import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/service/user.service';

@Injectable()
export class PostMiddleware implements NestMiddleware {
  constructor(private jwt: JwtService, private userService: UserService) {}
  async verifyToken(token: string): Promise<any> {
    return await this.jwt.verifyAsync(token, {
      secret: process.env.JWT_PRIVATE_KEY,
    });
  }

  verifyExpTime(exp: number): boolean {
    return Date.now() >= exp * 1000;
  }

  async getUserId(
    email: string,
  ): Promise<{ id: string; fullName: string; email: string }> {
    return await this.userService.getUserId(email);
  }

  async use(req: any, res: any, next: (error?: any) => void) {
    try {
      const { email, exp } = await this.verifyToken(
        req.rawHeaders[1].split(' ')[1],
      );
      const user = await this.getUserId(email);
      if (!user) {
        //Verifica que el usuario este registrado
        next(new ForbiddenException('Usuario no valido'));
      }

      //Verifica con la expiracion del token si esta activo
      if (this.verifyExpTime(exp)) {
        next(new ForbiddenException('Token not valid o expired!'));
      }

      next();
    } catch (error) {
      const tokenError = error.toString().split(':')[0];
      if (tokenError == 'JsonWebTokenError') {
        next(new ForbiddenException('Token not valid o expired!'));
      }
    }
  }
}
