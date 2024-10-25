import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User)) {}
  



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
