import { Module } from '@nestjs/common';
import { YearController } from './year.controller';
import { YearService } from './year.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.for],
  controllers: [YearController],
  providers: [YearService],
})

export class YearModule {}
