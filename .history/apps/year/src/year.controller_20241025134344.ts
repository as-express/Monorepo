import { Controller, Get } from '@nestjs/common';
import { YearService } from './year.service';

@Controller()
export class YearController {
  constructor(private readonly yearService: YearService) {}

  @ApiResponse({status: 201, type: Genre})
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
  async getOne(@Param('id') id: string) {
    return this.genreService.getOne(id)
  }

  @ApiResponse({status: 200, type: Genre})
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: createGenre) {
    return this.genreService.update(id, dto)
  }

  @ApiResponse({status: 200, type: 'deleted'})
  @Delete(':id')
  async get(@Param('id') id: string) {
    return this.genreService.getOne(id)
  }
}
