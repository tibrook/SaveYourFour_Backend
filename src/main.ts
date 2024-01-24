import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true, 
    transform: true, 
    exceptionFactory: (errors) => {
      const messages = errors.map(error => ({
        property: error.property,
        constraints: error.constraints
      }));
      return new BadRequestException(messages);
    },
  }));

  await app.listen(3000);
}
bootstrap();
