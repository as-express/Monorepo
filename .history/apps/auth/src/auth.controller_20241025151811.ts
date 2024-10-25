import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { signIn } from './dto/signin.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  rigester(@Body() data: signIn) {
    return this.authService.signUp(data)
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  login(@Body() data: signIn) {
    return this.authService.signIn(data)
  }

  @Post('refresh-token')
  @UsePipes(new ValidationPipe())
  refressh(@Body() data: tokenDto) {
    return this.authService.refresh(data)
  }
}
