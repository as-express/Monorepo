import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { signIn } from './dto/signin.dto';
import { tokenDto } from './dto/token.dto';
import { signUp } from './dto/signup.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('signup')
  @UsePipes(new ValidationPipe())
  register(@Body() info: AuthDto) {
    return this.authService.register(info)
  }

  @HttpCode(200)
  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() info: AuthDto) {
    return this.authService.login(info)
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post('/refresh')
  refresgToken(@Body() info: TokenDto) {
    return this.authService.refresh(info)
  }
}
