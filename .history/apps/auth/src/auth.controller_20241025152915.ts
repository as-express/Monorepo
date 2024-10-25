import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { signIn } from './dto/signin.dto';
import { tokenDto } from './dto/token.dto';
import { signUp } from './dto/signup.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  register(@Body() info: sign) {
    return this.authService.register(info)
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() info: AuthDto) {
    return this.authService.login(info)
  }

  @UsePipes(new ValidationPipe())
  @Post('/refresh')
  refresgToken(@Body() info: TokenDto) {
    return this.authService.refresh(info)
  }
}
