import { Injectable } from '@nestjs/common';

@Injectable()
export class YearService {
  getHello(): string {
    return 'Hello World!';
  }
}
