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

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && user.password === pass) {
            this.logger.log(`Login successful for user: ${email}`);
            return user;
        }
        this.logger.warn(`Login attempt failed for user: ${email}`);
        return null;
    }
    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        console.log(payload)
        return {
        access_token: this.jwtService.sign(payload),
        };
    }
}
