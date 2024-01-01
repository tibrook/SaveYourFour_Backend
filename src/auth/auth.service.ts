// src/auth/auth.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            this.logger.log(`Login successful for user: ${username}`);
            const { password, ...result } = user;
            return result;
        }
        this.logger.warn(`Login attempt failed for user: ${username}`);
        return null;
    }
    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
        access_token: this.jwtService.sign(payload),
        };
    }
}
