import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { UserResponse } from './dto/user-response.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Search users by username' })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'username',
    description: 'Username substring to search for.',
    required: true,
    example: 'john',
  })
  @ApiOkResponse({ description: 'List of matching users (excluding the current user).', type: () => [UserResponse] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @Authorization()
  @Get('search')
  @HttpCode(HttpStatus.OK)
  async findUsersByUsername(@Authorized('id') currentUserId: number, @Query('username') usernameQuery: string){
    return this.userService.findUsersByUsername(usernameQuery,currentUserId);
  }
}
