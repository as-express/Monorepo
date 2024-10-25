import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schema';
import { Model } from 'mongoose';
import { Genre } from 'apps/genre/src/schemas/genre.schemas';
import { movieDto } from './dto/movie.dto';
import { HttpService } from '@nestjs/axios';
import { FileService } from 'global-libs/file.service';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movie: Model<Movie>,
    private http: HttpService,
    private file: FileService,
  ) {}

  async new(dto: movieDto, file: any): Promise<any> {
    await this.checkMovie(dto.title);
    const avatar = await this.file.writeFile(file);

    const movie = await this.movie.create({
      title: dto.title,
      avatar,
      description: dto.description,
      year: dto.year,
      genre: dto.genre,
    });
    this.http.patch(`http://localhost:8004/genre/${dto.genre}`, {
      $push: { movies: movie._id },
    });

    this.http.patch(`http://localhost:8003/year/${dto.genre}`, {
      $push: { movies: movie._id },
    });

    await movie.save();
    return movie;
  }

  async getAll(): Promise<Movie[]> {
    return this.movie.find();
  }

  async getOne(id: string): Promise<any> {
    const movie = await this.movie.findById(id);
    if (!movie) {
      throw new NotFoundException('Movie is not defined');
    }

    return movie;
  }

  async update(id: string, dto: movieDto): Promise<any> {
    await this.getOne(id);
    const movie = await this.movie.findByIdAndUpdate(id, dto);

    await movie.save();
    return movie;
  }

  async delete(id: string): Promise<boolean> {
    const movie = await this.getOne(id);
    await this.movie.findByIdAndDelete(id);

    this.http.patch(`http://localhost:8004/genre/${movie.genre}`, {
      $pull: { movies: id },
    });

    this.http.patch(`http://localhost:8003/year/${movie.year}`, {
      $pull: { movies: id },
    });

    return true;
  }

  async checkMovie(title: string): Promise<void> {
    const movie = await this.movie.findOne({ title });
    if (movie) {
      throw new BadRequestException('Movie is already created');
    }
  }
}
