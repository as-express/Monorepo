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

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private http: HttpService,
  ) {}

  async register(dto: signUp): Promise<string> {
    const oldUser = this.http.get(`http://localhost:8002/user/${dto.email}`);
    if (oldUser) {
      throw new BadRequestException('User already exist');
    }

    const hash = bcrypt.hashSync(dto.password, 7);
    dto.password = hash;
    this.http.post('http://localhost:8002/user/newUser', dto);
    return 'User create go though login';
  }

  async login(dto: signIn) {
    const user = this.http.get(`http://localhost:8002/user/${dto.email}`);
    if (!user) {
      throw new BadRequestException('User is not defined');
    }
    const tokens = await this.issueTokens(user.pipe);

    return {
      user: this.userFields(user),
      ...tokens,
    };
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
