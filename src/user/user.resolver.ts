import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserResponse } from './dto/user-response.dto';
import { GqlAuthorization } from 'src/auth/decorators/gql-authorization.decorator';
import { GqlAuthorized } from 'src/auth/decorators/gql-authorized.decorator';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserResponse], { name: 'searchUsers' })
  @GqlAuthorization()
  async searchUsers(
    @Args('username', { type: () => String }) username: string,
    @GqlAuthorized('id') currentUserId: number,
  ): Promise<UserResponse[]> {
    return this.userService.findUsersByUsername(username, currentUserId);
  }
}

