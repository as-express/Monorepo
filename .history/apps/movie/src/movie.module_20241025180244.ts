import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { FileService } from 'global-libs/file.service';
import { Movie, movieSchema } from './schemas/movie.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot(
      'mongodb+srv://expressaset:aset@movie.etplx.mongodb.net/?retryWrites=true&w=majority&appName=movie',
    ),
    MongooseModule.forFeature([{ name: Movie.name, schema: movieSchema }]),
  ],
  controllers: [MovieController],
  providers: [MovieService, FileService],
})
export class MovieModule {}
