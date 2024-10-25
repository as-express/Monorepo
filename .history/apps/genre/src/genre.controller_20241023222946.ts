import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { GenreService } from './genre.service';
import { ApiResponse } from '@nestjs/swagger';
import { Genre } from './schemas/genre.schemas';
import { createGenre } from './dto/genre.dto';

@Controller()
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiResponse({status: 200, type: Genre})
  @UsePipes(new ValidationPipe())
  @Post('new')
  async newGenre(@Body() dto: createGenre) {
    return this.genreService.new(dto)
  }

  @ApiResponse({status: 200, type: [Genre]})
  @Get()
  async getAll() {
    return this.genreService.getAll()
  }

  @ApiResponse({status: 200, type: Genre})
  @Get(':id')
  async
}
