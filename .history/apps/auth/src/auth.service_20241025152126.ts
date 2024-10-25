import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Usr } from 'apps/usr/src/schemas/usr.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { signUp } from './dto/signup.dto';
import { HttpService } from '@nestjs/axios';
import { signIn } from './dto/signin.dto';
import { tokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Usr.name) private usr: Model<Usr>,
  private jwt: JwtService,
  private http: HttpService) {}
  

  async signUp(data: signUp) {
    const isOldUsr = this.http.get(`http://localhost:8001/oldUsr/${data.email}`)
    if(isOldUsr) {
      throw new BadRequestException('Usr is already exist')
    }

    const hash = bcrypt.hashSync(data.password, 7)
    this.http.post('http://localhost:8001/newUsr', data)
    const usr = this.http.get(`http://localhost:8001/getUsr/${data.email}`)

    return this.issueTokens(usr.id)
}

  async signIn(data: signIn) {
    const usr = this.http.get(`http://localhost:8001/getUsr/${data.email}`)
    if(!usr) {
      throw new NotFoundException('Usr is not defined')
    }

    const isPassword = bcrypt.compareSync(data.password, usr.password)
    if(!isPassword) {
        throw new BadRequestException('Password is not correct')
    }

    return await this.issueTokens(usr.id)
}

async refresh(data: tokenDto) {
    try {
        const valid = await this.jwt.verifyAsync(data.refreshToken)
        await this.getUsr(valid.id)

        return this.issueTokens(valid.id)
    } catch(error) {
      throw new BadRequestException('Token is not valid')
  }
}



  private async getUsr(id: string) {
    const usr = await this.Usr.findById(id)
    if(!usr) {
        throw new BadRequestException('Usr is not found')
    }

    return usr
  }

  private async issueTokens(usrId: string) {
    const data = {id: usrId}

    const refreshToken = this.jwt.sign(data, {
        expiresIn: '3d'
    })

    const accessToken = this.jwt.sign(data, {
        expiresIn: '1h'
    })

    return {refreshToken, accessToken}
}
}
