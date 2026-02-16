import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { GqlUser } from './graphql/user.model';
import { GqlAuthorization } from 'src/auth/decorators/gql-authorization.decorator';
import { GqlAuthorized } from 'src/auth/decorators/gql-authorized.decorator';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [GqlUser], { name: 'searchUsers' })
  @GqlAuthorization()
  async searchUsers(
    @Args('username', { type: () => String }) username: string,
    @GqlAuthorized('id') currentUserId: number,
  ): Promise<GqlUser[]> {
    const users = await this.userService.findUsersByUsername(username, currentUserId);
    return users.map((u) => ({ id: u.id, username: u.username }));
  }
}

