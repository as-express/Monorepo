import { Module } from '@nestjs/common';
import { YearController } from './year.controller';
import { YearService } from './year.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Year, yearSchema } from './schemas/year.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://expressaset:aset@year.lt1uu.mongodb.net/?retryWrites=true&w=majority&appName=year'),
    MongooseModule.forFeature([{name: Year.name, schema: yearSchema}])],
  controllers: [YearController],
  providers: [YearService],
})

export class YearModule {}
