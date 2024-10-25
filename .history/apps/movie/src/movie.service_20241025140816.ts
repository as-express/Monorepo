import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async new(dto: movieDto): Promise<any> {
    await this.checkMovie(dto.title)

    const movie = await this.movie.create({
      title: dto.title
    })
    this.http.post(this.genreServer + 'pushMovie', movie)
    this.http.post(this.yearServer + 'pushMovie', movie)

    await movie.save()
    return movie
  }

  async getAll(): Promise<Movie[]> {
    return this.movie.find()
  }

  async getOne(id: string): Promise<any> {
    const movie = await this.movie.findById(id)
    if(!movie) {throw new NotFoundException('Movie is not defined')}

    return movie
  }

  async update(id: string, dto: movieDto): Promise<any> {
    await this.getOne(id)
    const movie = await this.movie.findByIdAndUpdate(id, dto)

    await movie.save()
    return movie
  }

  async delete(id: string): Promise<boolean> {
    await this.movie.findByIdAndDelete(id)
    
    this.http.post(this.genreServer + 'unPushMovie', id)
    return true
  }

  async checkMovie(title: string): Promise<void> {
    const movie = await this.movie.findOne({title})
    if(movie) {throw new BadRequestException('Movie is already created')}
  }
}
