import { NestFactory } from '@nestjs/core';
import { YearModule } from './year.module';

async function bootstrap() {
  const app = await NestFactory.create(YearModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
