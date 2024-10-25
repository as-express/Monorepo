import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('lskdlsk')
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}