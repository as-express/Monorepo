import { NestFactory } from '@nestjs/core';
import { GenreModule } from './genre.module';

async function bootstrap() {
  Mod
  const app = await NestFactory.create(GenreModule);
  await app.listen(process.env.port ?? 8000);
}

bootstrap();
