import { Controller, Get } from '@nestjs/common';

@Controller('message')
export class MessagesController {
  @Get()
  helloUser() {
    return 'hello Message!';
  }
}
