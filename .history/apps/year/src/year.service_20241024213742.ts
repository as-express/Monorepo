import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { Movie } from 'apps/movie/src/schemas/movie.schema';
import { Year } from './schemas/year.schema';

@Injectable()
export class YearService {
  constructor(@InjectModel(Year.name) private yeYear: Model<Year>,
  private http: HttpService) {}

  async new(dto: ): Promise<Year> {
    await this.checkYear(dto.title)
    const yeYear = await this.yeYear.create({title: dto.title})
    await yeYear.save()

    return yeYear
  } 

  async getAll(): Promise<Year[]> {
    return this.yeYear.find()
  }

  async getOne(id: string): Promise<Year> {
    const yeYear = await this.yeYear.findById(id).populate('movies')
    if(yeYear) {throw new NotFoundException('Year is not found')}

    return yeYear
  }

  async update(id: string, dto: createYear): Promise<Year> {
    await this.getOne(id)
    const update = await this.yeYear.findByIdAndUpdate(id, {title: dto.title})

    return update
  }

  async delete(id: string): Promise<void> {
    await this.yeYear.findByIdAndDelete(id)
  }

  async pushMovie(yeYearTitle: string, movie: Movie): Promise<void> {
    const yeYear = await this.yeYear.findOne({title: yeYearTitle})
    if(!yeYear) {throw new NotFoundException('Year is not defined')}

    yeYear.movieCount += 1
    yeYear.movies.push(movie)

    await yeYear.save()
  }

  async unPushMovie(yeYearId: string, movie: Movie): Promise<void> {
    const yeYear = await this.getYearId(yeYearId)

    const index = yeYear.movies.indexOf(movie);
    if (index > -1) {
        yeYear.movies.splice(index, 1);
        yeYear.movieCount -= 1;
    } else {
        throw new NotFoundException('Movie ID not found in yeYear');
    }
  }


  private async checkYear(title: string): Promise<void> {
    const isYear = await this.yeYear.findOne({title})
    if(isYear) {throw new BadRequestException('Year is created already')}
  }

  private async getYearId(title: string): Promise<Year> {
    const yeYear = await this.yeYear.findOne({title})
    if(!yeYear) {throw new NotFoundException('Year is not defined')}

    return yeYear
  }
}
