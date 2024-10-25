import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Genre } from './schemas/genre.schemas';
import { Model } from 'mongoose';
import { createGenre } from './dto/genre.dto';
import { HttpService } from '@nestjs/axios';
import { Movie } from 'apps/movie/src/schemas/movie.schema';
import { MovieInterface } from './interfaces/movie.interface';
import { movieDto } from 'apps/movie/src/dto/movie.dto';

@Injectable()
export class GenreService {
  constructor(@InjectModel(Genre.name) private genre: Model<Genre>,
  private http: HttpService) {}

  async new(dto: createGenre): Promise<Genre> {
    await this.checkGenre(dto.title)
    const genre = await this.genre.create({title: dto.title})
    await genre.save()

    return genre
  } 

  async getAll(): Promise<Genre[]> {
    return this.genre.find()
  }

  async getOne(id: string): Promise<Genre> {
    const genre = await this.genre.findById(id).populate('movies')
    if(genre) {throw new NotFoundException('Genre is not found')}

    return genre
  }

  async update(id: string, dto: createGenre): Promise<Genre> {
    await this.getOne(id)
    const update = await this.genre.findByIdAndUpdate(id, {title: dto.title})

    return update
  }

  async delete(id: string): Promise<void> {
    await this.genre.findByIdAndDelete(id)
  }

  async pushMovie(req: MovieInterface): Promise<void> {
    const genre = await this.genre.findOne({title: req.genre})
    if(!genre) {throw new NotFoundException('Genre is not defined')}

    genre.movieCount += 1
    genre.movies.push(req.movie.)

    await genre.save()
  }

  async unPushMovie(genreId: string, movie: Movie): Promise<void> {
    const genre = await this.getGenreId(genreId)

    const index = genre.movies.indexOf(movie);
    if (index > -1) {
        genre.movies.splice(index, 1);
        genre.movieCount -= 1;
    } else {
        throw new NotFoundException('Movie ID not found in genre');
    }
  }

  private async checkGenre(title: string): Promise<void> {
    const isGenre = await this.genre.findOne({title})
    if(isGenre) {throw new BadRequestException('Genre is created already')}
  }

  private async getGenreId(title: string): Promise<Genre> {
    const genre = await this.genre.findOne({title})
    if(!genre) {throw new NotFoundException('Genre is not defined')}

    return genre
  }
}
