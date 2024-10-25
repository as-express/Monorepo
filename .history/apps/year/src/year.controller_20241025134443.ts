import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { YearService } from './year.service';
import { ApiResponse } from '@nestjs/swagger';
import { Year } from './schemas/year.schema';
import { createYear } from './dto/year.dto';

@Controller()
export class YearController {
  constructor(private readonly yearService: YearService) {}

  @ApiResponse({status: 201, type: Year})
  @UsePipes(new ValidationPipe())
  @Post('new')
  async newYear(@Body() dto: createYear) {
    return this.yearService.new(dto)
  }

  @ApiResponse({status: 200, type: [Year]})
  @Get()
  async getAll() {
    return this.yearService.getAll()
  }

  @ApiResponse({status: 200, type: Year})
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.yearService.getOne(id)
  }

  @ApiResponse({status: 200, type: Year})
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: createYear) {
    return this.yearService.update(id, dto)
  }

  @ApiResponse({status: 200, type: 'deleted'})
  @Delete(':id')
  async get(@Param('id') id: string) {
    return this.yearService.getOne(id)
  }
}
