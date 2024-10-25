import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { U } from 'apps/u/src/schemas/u.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { signUp } from './dto/signup.dto';
import { HttpService } from '@nestjs/axios';
import { signIn } from './dto/signin.dto';
import { tokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(U.name) private u: Model<U>,
  private jwt: JwtService,
  private http: HttpService) {}
  

  async signUp(data: signUp) {
    const isOldU = this.http.get(`http://localhost:8001/oldU/${data.email}`)
    if(isOldU) {
      throw new BadRequestException('U is already exist')
    }

    const hash = bcrypt.hashSync(data.password, 7)
    this.http.post('http://localhost:8001/newU', data)
    const u = this.http.get(`http://localhost:8001/getU/${data.email}`)

    return this.issueTokens(u.id)
}

  async signIn(data: signIn) {
    const u = this.http.get(`http://localhost:8001/getU/${data.email}`)
    if(!u) {
      throw new NotFoundException('U is not defined')
    }

    const isPassword = bcrypt.compareSync(data.password, u.password)
    if(!isPassword) {
        throw new BadRequestException('Password is not correct')
    }

    return await this.issueTokens(u.id)
}

async refresh(data: tokenDto) {
    try {
        const valid = await this.jwt.verifyAsync(data.refreshToken)
        await this.getU(valid.id)

        return this.issueTokens(valid.id)
    } catch(error) {
      throw new BadRequestException('Token is not valid')
  }
}



  private async getU(id: string) {
    const u = await this.U.findById(id)
    if(!u) {
        throw new BadRequestException('U is not found')
    }

    return u
  }

  private async issueTokens(uId: string) {
    const data = {id: uId}

    const refreshToken = this.jwt.sign(data, {
        expiresIn: '3d'
    })

    const accessToken = this.jwt.sign(data, {
        expiresIn: '1h'
    })

    return {refreshToken, accessToken}
}
}
