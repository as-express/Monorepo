import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { Movie } from 'apps/movie/src/schemas/movie.schema';

@Injectable()
export class YearService {
  constructor(@InjectModel(Ye.name) private ye: Model<Ye>,
  private http: HttpService) {}

  async new(dto: ): Promise<Ye> {
    await this.checkYe(dto.title)
    const ye = await this.ye.create({title: dto.title})
    await ye.save()

    return ye
  } 

  async getAll(): Promise<Ye[]> {
    return this.ye.find()
  }

  async getOne(id: string): Promise<Ye> {
    const ye = await this.ye.findById(id).populate('movies')
    if(ye) {throw new NotFoundException('Ye is not found')}

    return ye
  }

  async update(id: string, dto: createYe): Promise<Ye> {
    await this.getOne(id)
    const update = await this.ye.findByIdAndUpdate(id, {title: dto.title})

    return update
  }

  async delete(id: string): Promise<void> {
    await this.ye.findByIdAndDelete(id)
  }

  async pushMovie(yeTitle: string, movie: Movie): Promise<void> {
    const ye = await this.ye.findOne({title: yeTitle})
    if(!ye) {throw new NotFoundException('Ye is not defined')}

    ye.movieCount += 1
    ye.movies.push(movie)

    await ye.save()
  }

  async unPushMovie(yeId: string, movie: Movie): Promise<void> {
    const ye = await this.getYeId(yeId)

    const index = ye.movies.indexOf(movie);
    if (index > -1) {
        ye.movies.splice(index, 1);
        ye.movieCount -= 1;
    } else {
        throw new NotFoundException('Movie ID not found in ye');
    }
  }


  private async checkYe(title: string): Promise<void> {
    const isYe = await this.ye.findOne({title})
    if(isYe) {throw new BadRequestException('Ye is created already')}
  }

  private async getYeId(title: string): Promise<Ye> {
    const ye = await this.ye.findOne({title})
    if(!ye) {throw new NotFoundException('Ye is not defined')}

    return ye
  }
}
