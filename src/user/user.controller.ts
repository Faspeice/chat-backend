import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @Get('search')
  @HttpCode(HttpStatus.OK)
  async findUsersByUsername(@Authorized('id') currentUserId: number, @Query('username') usernameQuery: string){
    return this.userService.findUsersByUsername(usernameQuery,currentUserId);
  }
}
