import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, ResponseCreateUserDto } from 'src/user/dto/CreateUser.dto';
import { LoginUserDto } from 'src/user/dto/LoginUser.dto';
import { plainToInstance } from 'class-transformer';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor) 
    async register(@Body() createUserDto: CreateUserDto){
        const user = await this.authService.create(createUserDto)
        return plainToInstance(ResponseCreateUserDto, user.dataValues)
    }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto){
        return this.authService.login(loginUserDto)
    }

    // refresh token (in the future)
}
