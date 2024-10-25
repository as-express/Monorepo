import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieService {
  getHello(): string {
    return 'This is movie!';
  }
}
