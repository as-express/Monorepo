import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { userDto } from './dto/user.dto';
import { signUp } from 'apps/auth/src/dto/signup.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'new User' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(new ValidationPipe())
  @Post('newUser')
  async newUser(@Body() dto: signUp) {
    return this.userService.newUser(dto);
  }

  @ApiOperation({ summary: 'Check user' })
  @ApiResponse({ status: 200, type: User })
  @Get(':email')
  async checkUser(@Param('email') email: string) {
    return this.userService.checkUser(email);
  }
}
