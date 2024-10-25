import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://expressaset:aset@movie.etplx.mongodb.net/?retryWrites=true&w=majority&appName=movie')
  ],
  controllers: [MovieController],
  providers: [MovieService],
})

export class MovieModule {}
=