import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/dtos/register-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
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
                hash: `hashed password ${registerUser.password}`
            }
        })
    }
    
}
