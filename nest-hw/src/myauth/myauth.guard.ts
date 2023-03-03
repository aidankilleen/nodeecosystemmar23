import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class MyauthGuard implements CanActivate {

  constructor(private authService: AuthService) {

  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    let req = context.switchToHttp().getRequest();

    console.log(req.headers['authorization']);
    console.log("****guard activated");
    return true;
  }
}
