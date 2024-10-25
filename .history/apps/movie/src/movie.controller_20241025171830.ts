import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Movie } from './schemas/movie.schema';
import { movieDto } from './dto/movie.dto';

@Controller()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({ summary: 'new Movie' })
  @ApiResponse({ status: 200, type: Movie })
  @Post('new')
  @UseInterceptors()
  // async newMovie(
  //   @Param('yearId') yearId: string,
  //   @Body('movieId') movieId: string,
  // ) {
  //   return this.movieService.checkM
  // }
  async newMovie(@Body() dto: movieDto)
}
