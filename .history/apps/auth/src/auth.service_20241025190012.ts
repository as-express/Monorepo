import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    const oldUser = this.http.get(`http://localhost:8002/user/${dto.email}`);
    if (oldUser) {
      throw new BadRequestException('User already exist');
    }

    const hash = bcrypt.hashSync(dto.password, 7);
    dto.password = hash;
    const req = await firstValueFrom(
      this.http.post('http://localhost:8002/user/newUser', dto),
    );
    const res = req.data;
    const tokens = await this.issueTokens(res.id);

    return {
      message: 'User created',
      ...tokens,
    };
  }

  async login(dto: signIn) {
    const req = await firstValueFrom(
      this.http.get(`http://localhost:8002/user/${email}`),
    );
    const user = req.data;

    if (!user) {
      throw new BadRequestException('User is not defined');
    }

    return this.issueTokens(user.id);
  }

  async refresh(info: TokenDto) {
    const result = await this.jwt.verifyAsync(info.refreshToken);
    if (!result) {
      throw new UnauthorizedException('Invalid Token');
    }

    // const user = await this.prisma.user.findUnique({
    //     where: {
    //         id: result.id
    //     }
    // })

    const tokens = await this.issueTokens(user.id);
    return tokens;
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
