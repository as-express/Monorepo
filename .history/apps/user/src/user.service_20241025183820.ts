import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { userDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private user: Model<User>) {}

  async newUser(dto: userDto): Promise<void> {
    const user = await this.user.create({
      username: dto.username,
      email: dto.email,
      password: dto.password,
    });

    user.save();
  }
}
