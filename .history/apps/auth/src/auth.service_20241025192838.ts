import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { signUp } from './dto/signup.dto';
import { HttpService } from '@nestjs/axios';
import { signIn } from './dto/signin.dto';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private http: HttpService,
  ) {}

  async register(dto: signUp): Promise<any> {
    // const oldUser = await firstValueFrom(
      await this.http.get(`http://localhost:8002/user/${dto.email}`),
    // );
    // const user = oldUser.data;
    // if (user !== null) {
    //   throw new BadRequestException('User already exist');
    // }

    // const hash = bcrypt.hashSync(dto.password, 7);
    // dto.password = hash;

    return true;
    // try {
    //   const req = await firstValueFrom(
    //     this.http.post('http://localhost:8002/user/newUser', dto),
    //   );
    //   const res = req.data;
    //   const tokens = await this.issueTokens(res.id);

    //   return {
    //     message: 'User created',
    //     tokens: tokens,
    //   };
    // } catch (err) {
    //   console.error(err);
    // }
  }

  async login(dto: signIn) {
    const req = await firstValueFrom(
      this.http.get(`http://localhost:8002/user/${dto.email}`),
    );
    const user = req.data;
    if (!user) {
      throw new BadRequestException('User is not defined');
    }

    const isPassword = await bcrypt.verifyAsync(dto.password, user.password);
    if (!isPassword) {
      throw new BadRequestException('Password is not correct');
    }

    return this.issueTokens(user.id);
  }

  private async issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '1d',
    });

    return { accessToken, refreshToken };
  }
}
