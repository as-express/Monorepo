import { Controller, Get } from '@nestjs/common';
import { YearService } from './year.service';

@Controller()
export class YearController {
  constructor(private readonly yearService: YearService) {}
}
