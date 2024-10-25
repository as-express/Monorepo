import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { Movie } from 'apps/movie/src/schemas/movie.schema';

@Injectable()
export class YearService {
  constructor(@InjectModel(.name) private : Model<>,
  private http: HttpService) {}

  async new(dto: ): Promise<> {
    await this.check(dto.title)
    const  = await this..create({title: dto.title})
    await .save()

    return 
  } 

  async getAll(): Promise<[]> {
    return this..find()
  }

  async getOne(id: string): Promise<> {
    const  = await this..findById(id).populate('movies')
    if() {throw new NotFoundException(' is not found')}

    return 
  }

  async update(id: string, dto: create): Promise<> {
    await this.getOne(id)
    const update = await this..findByIdAndUpdate(id, {title: dto.title})

    return update
  }

  async delete(id: string): Promise<void> {
    await this..findByIdAndDelete(id)
  }

  async pushMovie(Title: string, movie: Movie): Promise<void> {
    const  = await this..findOne({title: Title})
    if(!) {throw new NotFoundException(' is not defined')}

    .movieCount += 1
    .movies.push(movie)

    await .save()
  }

  async unPushMovie(Id: string, movie: Movie): Promise<void> {
    const  = await this.getId(Id)

    const index = .movies.indexOf(movie);
    if (index > -1) {
        .movies.splice(index, 1);
        .movieCount -= 1;
    } else {
        throw new NotFoundException('Movie ID not found in ');
    }
  }


  private async check(title: string): Promise<void> {
    const is = await this..findOne({title})
    if(is) {throw new BadRequestException(' is created already')}
  }

  private async getId(title: string): Promise<> {
    const  = await this..findOne({title})
    if(!) {throw new NotFoundException(' is not defined')}

    return 
  }
}
