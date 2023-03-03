import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class MyJwtGuard implements CanActivate {

  constructor(private jwtService: JwtService) {
    
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    console.log("*****My Guard Activated");

    try {
      const req = context.switchToHttp().getRequest();

      const auth = req.headers['authorization'];
  
      const token = auth.split(' ')[1];
  
      console.log(token);

      // validate the token
      this.jwtService.verify(token);

      return true;

    } catch(ex) {
      console.log(ex);
    }
     return false;
  }
}
