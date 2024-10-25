import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary: 'Register'})
  @ApiResponse({status: 200, type: ''})
  @Post('signup')
  @UsePipes(new ValidationPipe())
  signup(@Body() data: '') {
    return this.authService.signup(data)
  }

  @ApiOpe
}
