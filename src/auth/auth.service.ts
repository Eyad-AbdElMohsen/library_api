import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/CreateUser.dto';
import { UserRepository } from 'src/user/user.repository';
import { hash, compare } from 'bcrypt'
import { LoginUserDto } from 'src/user/dto/LoginUser.dto';
import { JWT } from 'src/utils/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwt: JWT
    ) { }

    async getUserByEmail(email: string) {
        return await this.userRepository.findByEmail(email)
    }

    async comparePassword(inputPass: string, userPass: string) {
        return await compare(inputPass, userPass)
    }

    async create(createUserDto: CreateUserDto) {
        const isEmailFound = await this.getUserByEmail(createUserDto.email)
        if (isEmailFound)
            throw new HttpException('This email is already exist', HttpStatus.BAD_REQUEST)

        const hashedPassword = await hash(createUserDto.password, 10)
        createUserDto.password = hashedPassword

        return await this.userRepository.create(createUserDto)
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await this.getUserByEmail(loginUserDto.email)
        if (!user)
            throw new HttpException('Email is not found or Password is not correct', HttpStatus.BAD_REQUEST)

        const isPasswordCorrect = await this.comparePassword(loginUserDto.password, user.dataValues.password)
        if (!isPasswordCorrect)
            throw new HttpException('Email is not found or Password is not correct', HttpStatus.BAD_REQUEST)

        const token = this.jwt.generateJwtToken({
            id: user.dataValues.id,
            email: user.dataValues.email
        })

        return {token}
     }
}
