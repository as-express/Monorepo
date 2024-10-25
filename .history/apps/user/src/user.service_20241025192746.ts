import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { userDto } from './dto/user.dto';
import { signUp } from 'apps/auth/src/dto/signup.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private user: Model<User>) {}

  async newUser(dto: signUp): Promise<void> {
    const user = await this.user.create({
      username: dto.username,
      email: dto.email,
      password: dto.password,
    });

    user.save();
  }

  async checkUser(email: string) {
    const user = await this.user.findOne({ email });
    if (user) {
      throw new BadRequestException('User already exist');
    }
    return user;
  }
}
