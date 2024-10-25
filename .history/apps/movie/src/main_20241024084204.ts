import { NestFactory } from '@nestjs/core';
import { MovieModule } from './movie.module';
import dotenv from 'dotenv'

async function bootstrap() {
  const app = await NestFactory.create(MovieModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
