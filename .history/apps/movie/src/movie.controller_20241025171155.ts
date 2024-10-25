import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Movie } from './schemas/movie.schema';

@Controller()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({summary: 'new Movie'})
  @ApiResponse({status: 200, type: Movie})
  @UsePipes(new ValidationPipe())

}
