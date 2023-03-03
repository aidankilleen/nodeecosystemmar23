import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from 'src/dtos/register-user.dto';
import { RegisteredUserDto } from 'src/dtos/registered-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Post('login')
    login(): any {


        return {login:"is this working"};
    }

    @Post('register')
    async register(@Body() registerUser:RegisterUserDto): Promise<RegisteredUserDto> {

        let user = await this.authService.register(registerUser);

        let registeredUser = {
            id: user.id, 
            name: registerUser.name, 
            email: registerUser.email, 
            company: registerUser.company
        };

        return registeredUser;
    }
}
