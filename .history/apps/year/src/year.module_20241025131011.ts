import { Module } from '@nestjs/common';
import { YearController } from './year.controller';
import { YearService } from './year.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Year, yearSchema } from './schemas/year.schema';

@Module({
  imports: [
    MongooseModule.foMongooseModule.forFeature([{name: Year.name, schema: yearSchema}])],
  controllers: [YearController],
  providers: [YearService],
})

export class YearModule {}
