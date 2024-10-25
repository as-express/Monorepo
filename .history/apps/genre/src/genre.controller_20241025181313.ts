import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Genre } from './schemas/genre.schemas';
import { createGenre } from './dto/genre.dto';
import { MovieInterface } from './interfaces/movie.interface';

@Controller()
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiOperation({ summary: 'new Genre' })
  @ApiResponse({ status: 201, type: Genre })
  @UsePipes(new ValidationPipe())
  @Post('new')
  async newGenre(@Body() dto: createGenre) {
    return this.genreService.new(dto);
  }

  @ApiOperation({ summary: 'push movie' })
  @ApiResponse({ status: 200, type: 'Movie is pushed' })
  @Patch(':genreId/movies')
  async addMovieToGenre(
    @Param('genreId') genreId: string,
    @Body() body: { movieId: string },
  ) {
    return this.genreService.updateMovies(genreId, movieId);
  }

  @ApiResponse({ status: 200, type: [Genre] })
  @Get()
  async getAll() {
    return this.genreService.getAll();
  }

  @ApiResponse({ status: 200, type: Genre })
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.genreService.getOne(id);
  }

  @ApiResponse({ status: 200, type: Genre })
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: createGenre) {
    return this.genreService.update(id, dto);
  }

  @ApiResponse({ status: 200, type: 'deleted' })
  @Delete(':id')
  async get(@Param('id') id: string) {
    return this.genreService.getOne(id);
  }
}
