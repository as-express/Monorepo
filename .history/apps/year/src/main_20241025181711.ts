import { NestFactory } from '@nestjs/core';
import { YearModule } from './year.module';

async function bootstrap() {
  const app = await NestFactory.create(YearModule);
  app.setGlobalPrefix('year');

  await app.listen(8003);
}
bootstrap();
