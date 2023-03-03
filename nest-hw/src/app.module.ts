import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberController } from './member/member.controller';
import { MemberService } from './member/member.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MyTestMiddleware } from './my-test/my-test.middleware';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY, 
      signOptions: { expiresIn: '1h'}
    })
  ],
  controllers: [AppController, MemberController, AuthController],
  providers: [AppService, MemberService, PrismaService, AuthService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {

    consumer
      .apply(MyTestMiddleware)
      .forRoutes('member');
  }
}
