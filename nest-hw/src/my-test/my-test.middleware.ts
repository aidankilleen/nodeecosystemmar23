import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class MyTestMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    console.log("*****Test Middleware Activated");


    next();
  }
}
