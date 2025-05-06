import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './CreateUser.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto extends OmitType(CreateUserDto, []) { 
      @IsNotEmpty()
      @IsEmail()
      email: string;
}