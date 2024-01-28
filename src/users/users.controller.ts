import {
  Controller,
  Post,
  Body,
  ConflictException,
  HttpException,
  HttpStatus,UseGuards ,
  UsePipes,
  UnauthorizedException,Req,Get,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import your JWT Auth Guard

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.create(createUserDto);
      return newUser;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  @UseGuards(JwtAuthGuard) 
  @Get('settings')
  async getUserSettings(@Req() request) {
    // Assuming you have a way to get the user ID from the request, e.g., a session or a token
    const userId = request.user.userId;
    if (!userId) {
      throw new UnauthorizedException('User ID not found in request');
    }

    const userSettings = await this.usersService.getUserSettings(userId);
    if (!userSettings) {
      throw new UnauthorizedException('User not found');
    }

    return userSettings;
  }
}
