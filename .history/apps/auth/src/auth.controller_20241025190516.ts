import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { signIn } from './dto/signin.dto';
import { signUp } from './dto/signup.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Signup' })
  @Post('signup')
  @UsePipes(new ValidationPipe())
  register(@Body() info: signUp) {
    return this.authService.register(info);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() info: signIn) {
    return this.authService.login(info);
  }
}
