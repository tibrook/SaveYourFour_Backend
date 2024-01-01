// src/users/users.controller.ts
import { Controller, Post, Body, ConflictException, HttpException, HttpStatus,UsePipes  } from '@nestjs/common';
import { UsersService } from './users.service';
import { JoiValidationPipe } from './validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { createUserSchema } from './schemas/createUser.schema';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async create(@Body() createUserDto: CreateUserDto) {
      try {
        return await this.usersService.create(createUserDto);
      } catch (error) {
        if (error instanceof ConflictException) {
          throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
        throw error;
      }
    }
}