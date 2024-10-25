import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary: 'Register'})
  @ApiResponse({status: 200, type: User})
  @Post('signup')
  @UsePipes(new ValidationPipe())
  signup(@Body() data: signupDto) {
    return this.authService.signup(data)
  }

  @ApiOperation({summary: 'Login'})
  @ApiResponse({status: 200, type: User})
  @Post('login')
  @UsePipes(new ValidationPipe())
  signin(@Body() data: siginDto) {
    return this.authService.signin(data)
  }


  @ApiOperation({summary: 'Forget Password'})
  @ApiResponse({status: 200, type: 'Go throught Otp'})
  @Post('forget-password')
  forgetPassword(@Body() phone: phoneDto) {
    return this.authService.rePassword(phone)
  }

  @ApiOperation({summary: 'Change-passsword'})
  @ApiResponse({status: 200, type: 'Password is changed'})
  @Post('change-password')
  @UsePipes(new ValidationPipe())
  validatePass(@Body() data: validateDto) {
    return this.authService.validatePass(data)
}
