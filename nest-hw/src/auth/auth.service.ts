import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { RegisterUserDto } from 'src/dtos/register-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { RegisteredUserDto } from 'src/dtos/registered-user.dto';
@Injectable()
export class AuthService {


    constructor(private prismaService: PrismaService) {
    }

    async register(registerUser:RegisterUserDto): Promise<User> {

        return this.prismaService.user.create({
            data: {
                name: registerUser.name, 
                email: registerUser.email, 
                company: registerUser.company, 
                hash: await bcrypt.hash(registerUser.password, 12)
            }
        })
    }

    async validateUser(loginUser:LoginUserDto): Promise<RegisteredUserDto> {

        let user = await this.prismaService.user.findUnique({
            where: {
                email: loginUser.email
            }
        });
        if (!user) {
            throw new UnauthorizedException(`email not on file`);
        }
        if (!await bcrypt.compare(loginUser.password, user.hash)) {
            throw new UnauthorizedException('incorrect password');
        }

        const { hash, ...registeredUser } = user;

        return registeredUser;
    }
    
}
