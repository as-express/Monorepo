import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { signUp } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(private jwt: JwtService) {}

    async register(info: signUp) {
        // const isUser = await this.prisma.user.findUnique({
        //     where: {
        //         email: info.email
        //     }
        // })
        // Axios
        // 

        // if(isUser) {
        //     throw new BadRequestException('User already exist')
        // }

        const hash = bcrypt.hashSync(info.password, 7)
        // const user = await this.prisma.user.create({
        //     data: {
        //         title: faker.person.firstName(),
        //         iamge: faker.image.avatar(),
        //         email: info.email,
        //         password: hash
        //     }
        // })
        //new User

        const tokens = await this.issueTokens(user.id)        
        return {
            user: this.userFields(user),
            ...tokens
        }
    }

    async login(data: AuthDto) {
        const user = await this.validateUser(data)
        const tokens = await this.issueTokens(user.id)

        return {
            user: this.userFields(user),
            ...tokens
        }
    }

    async refresh(info: TokenDto) {
        const result = await this.jwt.verifyAsync(info.refreshToken)
        if(!result) {
            throw new UnauthorizedException('Invalid Token')
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id: result.id
            }
        })
        
        const tokens = await this.issueTokens(user.id)
        return {
            
            ...tokens
        }
    }

    private async issueTokens(userId: string) {
        const data = {id: userId}

        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h'
        })

        const refreshToken = this.jwt.sign(data, {
            expiresIn: '1d'
        })

        return {accessToken, refreshToken}
    }
}