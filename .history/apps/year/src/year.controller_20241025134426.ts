import { Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { YearService } from './year.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class YearController {
  constructor(private readonly yearService: YearService) {}

  @ApiResponse({status: 201, type: Ye})
  @UsePipes(new ValidationPipe())
  @Post('new')
  async newYe(@Body() dto: createYe) {
    return this.yearService.new(dto)
  }

  @ApiResponse({status: 200, type: [Ye]})
  @Get()
  async getAll() {
    return this.yearService.getAll()
  }

  @ApiResponse({status: 200, type: Ye})
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.yearService.getOne(id)
  }

  @ApiResponse({status: 200, type: Ye})
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: createYe) {
    return this.yearService.update(id, dto)
  }

  @ApiResponse({status: 200, type: 'deleted'})
  @Delete(':id')
  async get(@Param('id') id: string) {
    return this.yearService.getOne(id)
  }
}
