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
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({ summary: 'new Movie' })
  @ApiResponse({ status: 200, type: Movie })
  @Post('new')
  @UseInterceptors(FileInterceptor('avatar'))
  async newMovie(@Body() dto: movieDto) {
    return this.movieService.new(dto);
  }
}
