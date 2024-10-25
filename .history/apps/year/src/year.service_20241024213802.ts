import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { Movie } from 'apps/movie/src/schemas/movie.schema';
import { Year } from './schemas/year.schema';

@Injectable()
export class YearService {
  constructor(@InjectModel(Year.name) private year: Model<Year>,
  private http: HttpService) {}

  async new(dto: ): Promise<Year> {
    await this.checkYear(dto.title)
    const year = await this.year.create({title: dto.title})
    await year.save()

    return year
  } 

  async getAll(): Promise<Year[]> {
    return this.year.find()
  }

  async getOne(id: string): Promise<Year> {
    const year = await this.year.findById(id).populate('movies')
    if(year) {throw new NotFoundException('Year is not found')}

    return year
  }

  async update(id: string, dto: createYear): Promise<Year> {
    await this.getOne(id)
    const update = await this.year.findByIdAndUpdate(id, {title: dto.title})

    return update
  }

  async delete(id: string): Promise<void> {
    await this.year.findByIdAndDelete(id)
  }

  async pushMovie(yearTitle: string, movie: Movie): Promise<void> {
    const year = await this.year.findOne({title: yearTitle})
    if(!year) {throw new NotFoundException('Year is not defined')}

    year.movieCount += 1
    year.movies.push(movie)

    await year.save()
  }

  async unPushMovie(yearId: string, movie: Movie): Promise<void> {
    const year = await this.getYearId(yearId)

    const index = year.movies.indexOf(movie);
    if (index > -1) {
        year.movies.splice(index, 1);
        year.movieCount -= 1;
    } else {
        throw new NotFoundException('Movie ID not found in year');
    }
  }


  private async checkYear(title: string): Promise<void> {
    const isYear = await this.year.findOne({title})
    if(isYear) {throw new BadRequestException('Year is created already')}
  }

  private async getYearId(title: string): Promise<Year> {
    const year = await this.year.findOne({title})
    if(!year) {throw new NotFoundException('Year is not defined')}

    return year
  }
}
