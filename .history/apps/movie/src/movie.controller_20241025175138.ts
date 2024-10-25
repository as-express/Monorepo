import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Movie } from './schemas/movie.schema';
import { movieDto } from './dto/movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { movieUpdateDto } from './dto/update.dto';

@Controller()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({ summary: 'new Movie' })
  @ApiResponse({ status: 200, type: Movie })
  @Post('new')
  @UseInterceptors(FileInterceptor('avatar'))
  async newMovie(@Body() dto: movieDto, @UploadedFile() avatar) {
    return this.movieService.new(dto, avatar);
  }

  @ApiOperation({ summary: 'Get All' })
  @ApiResponse({ status: 200, type: [Movie] })
  @Get()
  async getAll() {
    return this.movieService.getAll();
  }

  @ApiOperation({ summary: 'Get By Id' })
  @ApiResponse({ status: 200, type: Movie })
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.movieService.getOne(id);
  }

  @ApiOperation({ summary: 'Update Movie' })
  @ApiResponse({ status: 200, type: Movie })
  @UseInterceptors(FileInterceptor('avatar'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: movieUpdateDto,
    @UploadedFile() avatar,
  ) {
    return this.movieService.update(id, dto, avatar);
  }

  @ApiOperation({ summary: 'Delete' })
  @ApiResponse({ status: 200, type: 'deleted' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.movieService.delete(id);
  }
}
