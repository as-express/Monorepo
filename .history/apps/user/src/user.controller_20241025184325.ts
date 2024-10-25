import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './schemas/user.schema';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @ApiOperation({summary: 'new User'})
  @ApiResponse({status: 200, type: User})
}
