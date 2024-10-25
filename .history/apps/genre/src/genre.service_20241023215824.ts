import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Genre } from './schemas/genre.schemas';
import { Model } from 'mongoose';

@Injectable()
export class GenreService {
  constructor(@InjectModel(Genre.name) private genre: Model<Genre>){}

  async new
}
