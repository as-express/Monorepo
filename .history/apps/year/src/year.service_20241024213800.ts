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
    const ye = await this.ye.create({title: dto.title})
    await ye.save()

    return ye
  } 

  async getAll(): Promise<Year[]> {
    return this.ye.find()
  }

  async getOne(id: string): Promise<Year> {
    const ye = await this.ye.findById(id).populate('movies')
    if(ye) {throw new NotFoundException('Year is not found')}

    return ye
  }

  async update(id: string, dto: createYear): Promise<Year> {
    await this.getOne(id)
    const update = await this.ye.findByIdAndUpdate(id, {title: dto.title})

    return update
  }

  async delete(id: string): Promise<void> {
    await this.ye.findByIdAndDelete(id)
  }

  async pushMovie(yeTitle: string, movie: Movie): Promise<void> {
    const ye = await this.ye.findOne({title: yeTitle})
    if(!ye) {throw new NotFoundException('Year is not defined')}

    ye.movieCount += 1
    ye.movies.push(movie)

    await ye.save()
  }

  async unPushMovie(yeId: string, movie: Movie): Promise<void> {
    const ye = await this.getYearId(yeId)

    const index = ye.movies.indexOf(movie);
    if (index > -1) {
        ye.movies.splice(index, 1);
        ye.movieCount -= 1;
    } else {
        throw new NotFoundException('Movie ID not found in ye');
    }
  }


  private async checkYear(title: string): Promise<void> {
    const isYear = await this.ye.findOne({title})
    if(isYear) {throw new BadRequestException('Year is created already')}
  }

  private async getYearId(title: string): Promise<Year> {
    const ye = await this.ye.findOne({title})
    if(!ye) {throw new NotFoundException('Year is not defined')}

    return ye
  }
}
