import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JWT } from "src/utils/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwt: JWT) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if(!authHeader)
            throw new UnauthorizedException('No authorization header');

        const token = authHeader.replace('Bearer ', '')

        const payload = await this.jwt.isJwtTokenValid(token);

        if (!payload) {
            throw new UnauthorizedException('Invalid token');
        }

        request.user = payload

        return true
    }
}