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
import { YearService } from './year.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Year } from './schemas/year.schema';
import { createYear } from './dto/year.dto';

@Controller()
export class YearController {
  constructor(private readonly yearService: YearService) {}

  @ApiOperation({ summary: 'new movie' })
  @ApiResponse({ status: 201, type: Year })
  @UsePipes(new ValidationPipe())
  @Post('new')
  async newYear(@Body() dto: createYear) {
    return this.yearService.new(dto);
  }

  @ApiOperation({ summary: 'push movie' })
  @ApiResponse({ status: 200, type: 'Movie is pushed' })
  @Patch(':genreId/movies')
  async addMovieToGenre(
    @Param('genreId') genreId: string,
    @Body() body: { movieId: string },
  ) {
    return this.yearService.updateMovies(genreId, body.movieId);
  }

  @ApiOperation({ summary: 'get years' })
  @ApiResponse({ status: 200, type: [Year] })
  @Get()
  async getAll() {
    return this.yearService.getAll();
  }

  @ApiResponse({ status: 200, type: Year })
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.yearService.getOne(id);
  }

  @ApiResponse({ status: 200, type: Year })
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: createYear) {
    return this.yearService.update(id, dto);
  }

  @ApiResponse({ status: 200, type: 'deleted' })
  @Delete(':id')
  async get(@Param('id') id: string) {
    return this.yearService.getOne(id);
  }
}
