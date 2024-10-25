import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getAll() {
    return this.authService.getAll()
  }

  @Post('signup')
  @UsePipes(new ValidationPipe())
  rigester(@Body() data: AuthDto) {
    return this.authService.signUp(data)
  }

  @Post('verify')
  @UsePipes(new ValidationPipe())
  otp(@Body() data: otpDto) {
    return this.authService.otp(data)
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  login(@Body() data: AuthDto) {
    return this.authService.signIn(data)
  }

  @Post('refresh-token')
  @UsePipes(new ValidationPipe())
  refressh(@Body() data: tokenDto) {
    return this.authService.refresh(data)
  }
}
