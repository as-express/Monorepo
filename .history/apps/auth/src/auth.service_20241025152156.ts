import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { user } from 'apps/user/src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { signUp } from './dto/signup.dto';
import { HttpService } from '@nestjs/axios';
import { signIn } from './dto/signin.dto';
import { tokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(user.name) private user: Model<user>,
  private jwt: JwtService,
  private http: HttpService) {}
  

  async signUp(data: signUp) {
    const isOldUser = this.http.get(`http://localhost:8001/olduser/${data.email}`)
    if(isOlduser) {
      throw new BadRequestException('user is already exist')
    }

    const hash = bcrypt.hashSync(data.password, 7)
    this.http.post('http://localhost:8001/newuser', data)
    const user = this.http.get(`http://localhost:8001/getuser/${data.email}`)

    return this.issueTokens(user.id)
}

  async signIn(data: signIn) {
    const user = this.http.get(`http://localhost:8001/getuser/${data.email}`)
    if(!user) {
      throw new NotFoundException('user is not defined')
    }

    const isPassword = bcrypt.compareSync(data.password, user.password)
    if(!isPassword) {
        throw new BadRequestException('Password is not correct')
    }

    return await this.issueTokens(user.id)
}

async refresh(data: tokenDto) {
    try {
        const valid = await this.jwt.verifyAsync(data.refreshToken)
        await this.getuser(valid.id)

        return this.issueTokens(valid.id)
    } catch(error) {
      throw new BadRequestException('Token is not valid')
  }
}



  private async getuser(id: string) {
    const user = await this.user.findById(id)
    if(!user) {
        throw new BadRequestException('user is not found')
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