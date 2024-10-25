import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    
    MongooseModule.forRoot(process.env.movie)
  ],
  controllers: [MovieController],
  providers: [MovieService, ConfigService],
})

export class MovieModule {}
