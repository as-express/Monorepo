import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot()
  ],
  controllers: [MovieController],
  providers: [MovieService, ConfigService],
})

export class MovieModule {}