import { Injectable } from '@nestjs/common'
import { JwtPayload } from '../user/dto/JwtPayload.dto'
import { sign, verify } from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JWT {
    constructor(private configService: ConfigService) { }

    async generateJwtToken(payload: JwtPayload) {
        const secretKey = this.configService.get('JWT_SECRET');
        if (secretKey) {
            return sign(payload, secretKey, { expiresIn: '5h' });
        } else {
            throw new Error('The secret key is required');
        }
    }

    isJwtTokenValid(token: string) {
        try {
            const secretKey = this.configService.get('JWT_SECRET');
            return verify(token, secretKey) as JwtPayload
        } catch (err) {
            return false
        }
    }
}