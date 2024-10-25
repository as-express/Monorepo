import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'apps/user/src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private user: Model<User>,
  private jwt: JwtService) {}
  

  async signIn(data: AuthDto) {
    const user = await this.User.findOne({phone: data.phone})
    if(!user) {
        throw new BadRequestException('User is not Authorized')
    }

    const isPassword = crypto.compareSync(data.password, user.password)
    if(!isPassword) {
        throw new BadRequestException('Password is not correct')
    }

    return await this.issueTokens(user.id)
}

async refresh(data: tokenDto) {
    try {
        const valid = await this.jwt.verifyAsync(data.refreshToken)
        await this.getUser(valid.id)

        return this.issueTokens(valid.id)
    } catch(error) {
      throw new BadRequestException('Token is not valid')
  }
}



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
