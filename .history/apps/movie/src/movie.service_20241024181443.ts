import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schema';
import { Model } from 'mongoose';
import { Genre } from 'apps/genre/src/schemas/genre.schemas';
import { movieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movie: Model<Genre>) {}

  async new(dto: movieDto) {
    await this.checkMovie(dto.title)


    a

  }

  async getAll() {

  }

  async getOne(id: string) {

  }

  async update(id: string, dto: movieDto) {

  }

  async delete(id: string) {

  }

  async checkMovie(title: string): Promise<void> {
    const movie = await this.movie.findOne({title})
    if(movie) {throw new BadRequestException('Movie is already created')}
  }
}
