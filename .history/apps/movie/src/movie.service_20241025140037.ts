import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schema';
import { Model } from 'mongoose';
import { Genre } from 'apps/genre/src/schemas/genre.schemas';
import { movieDto } from './dto/movie.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movie: Model<Genre>,
  private http: HttpService) {}

  genreServer = 'http://localhost:8002/'
  yearServer =  'http://localhost:8002/'

  async new(dto: movieDto) {
    await this.checkMovie(dto.title)

    const movie = await this.movie.create({
      title: dto.title
    })
    this.http.post(this.genreServer + 'pushMovie', movie)
    this.http.post(this.yearServer + 'pushMovie', movie)

    await movie.save()
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
