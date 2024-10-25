import { NestFactory } from '@nestjs/core';
import { MovieModule } from './movie.module';
import * as dotenv from 'dotenv'
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(MovieModule);
  await app.listen(80006);
  console.log(process.env.port)
}
bootstrap();
