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

  @ApiOperation({summary: 'Login'})
  @ApiResponse({status: 200, type: ''})
  @Post('login')
  @UsePipes(new ValidationPipe())
  signin(@Body() data: siginDto) {
    return this.authService.signin(data)
  }

  @ApiOperation({summary: 'Change-passsword'})
  @ApiResponse({status: 200, type: 'Password is changed'})
  @Post('change-password')
  @UsePipes(new ValidationPipe())
  validatePass(@Body() data: validateDto) {
    return this.authService.validatePass(data)
  }

  @ApiOperation({summary: 'Logout'})
  @ApiResponse({status: 200, type: boolean})
  @Post('logout')
  async logout 
}
