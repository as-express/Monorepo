import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  imports: [
    Mongo
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
