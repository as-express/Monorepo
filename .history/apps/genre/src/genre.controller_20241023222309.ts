import { Controller, Get } from '@nestjs/common';
import { GenreService } from './genre.service';
import { ApiProperty } from '@nestjs/swagger';

@Controller()
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiProperty({s})
}
