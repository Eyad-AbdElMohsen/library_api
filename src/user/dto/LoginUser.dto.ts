import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './CreateUser.dto';

export class LoginUserDto extends OmitType(CreateUserDto, []) { }