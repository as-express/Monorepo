import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schema';
import { Model } from 'mongoose';
import { Genre } from 'apps/genre/src/schemas/genre.schemas';
import { movieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movie: Model<Genre>) {}

  async new(dto: movieDto) {

  }

  async getAll() {

  }

  async getOne(id: string) {

  }

  async update(dto: movieDto) {

  }

  async delete() {

  }

}
