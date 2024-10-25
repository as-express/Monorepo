import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'apps/user/src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private user: Model<User>,
  private jwt: JwtService) {}
  



  private async getUser(id: string) {
    const user = await this.User.findById(id)
    if(!user) {
        throw new BadRequestException('User is not found')
    }

    return user
}

private async issueTokens(userId: string) {
    const data = {id: userId}

    const refreshToken = this.jwt.sign(data, {
        expiresIn: '3d'
    })

    const accessToken = this.jwt.sign(data, {
        expiresIn: '1h'
    })

    return {refreshToken, accessToken}
}

}
