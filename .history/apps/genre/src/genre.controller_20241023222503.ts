import { Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { GenreService } from './genre.service';
import { ApiResponse } from '@nestjs/swagger';
import { Genre } from './schemas/genre.schemas';
import { dot } from 'node:test/reporters';

@Controller()
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiResponse({status: 200, type: Genre})
  @UsePipes(new ValidationPipe())
  @Post('new')
  async newGenre() {
    return this.genreService.new(dot)
  }
}
