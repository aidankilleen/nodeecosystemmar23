import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from 'src/dtos/login-response.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { RegisterUserDto } from 'src/dtos/register-user.dto';
import { RegisteredUserDto } from 'src/dtos/registered-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, 
                private jwtService: JwtService) {

    }

    private _createToken(payload: RegisteredUserDto): LoginResponseDto {

        const token = this.jwtService.sign(payload);
        return { token };
    }

    @Post('login')
    async login(@Body() loginUser: LoginUserDto): Promise<LoginResponseDto> {

        let registeredUser = await this.authService.validateUser(loginUser);

        // create jwt using jwt service
        const token = this._createToken(registeredUser);

        return token;
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
