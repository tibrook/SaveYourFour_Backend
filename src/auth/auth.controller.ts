// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
// Custom error classes
class AccountNotActiveError extends Error {
  constructor() {
    super('Account is not active');
    this.name = 'AccountNotActiveError';
  }
}

class AccountLockedError extends Error {
  constructor() {
    super('Account is locked');
    this.name = 'AccountLockedError';
  }
}

class CredentialsExpiredError extends Error {
  constructor() {
    super('Credentials have expired');
    this.name = 'CredentialsExpiredError';
  }
}
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.validateUser(loginDto.email, loginDto.password);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return this.authService.login(user); // return JWT
    } catch (error) {
      if (error instanceof AccountNotActiveError) {
        throw new ForbiddenException(error.message); // 403 Forbidden
      } else if (error instanceof AccountLockedError) {
        throw new ForbiddenException(error.message); // 403 Forbidden
      } else if (error instanceof CredentialsExpiredError) {
        throw new UnauthorizedException(error.message); // 401 Unauthorized
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
