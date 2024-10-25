import { Controller, Get } from '@nestjs/common';
import { YearService } from './year.service';

@Controller()
export class YearController {
  constructor(private readonly yearService: YearService) {}

  @Get()
  getHello(): string {
    return this.yearService.getHello();
  }
}
