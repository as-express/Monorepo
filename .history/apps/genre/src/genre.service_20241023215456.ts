import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Genre } from './schemas/genre.schemas';

@Injectable()
export class GenreService {
  constructor(@InjectModel(Genre.name) private genre: Model){}
}
