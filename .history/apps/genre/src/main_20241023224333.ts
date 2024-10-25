import { NestFactory } from '@nestjs/core';
import { GenreModule } from './genre.module';
import dotenv from 'dotenv'
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(GenreModule);
  await app.listen(8003);
}

bootstrap();

