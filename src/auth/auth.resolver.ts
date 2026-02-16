import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { GqlAuthorized } from './decorators/gql-authorized.decorator';
import { GqlAuthorization } from './decorators/gql-authorization.decorator';
import type { GqlContext } from 'src/common/interfaces/gql-context.interface';
import { GqlAuth, GqlRegisterInput, GqlLoginInput } from './graphql/auth.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => GqlAuth)
  async register(@Context() { res }: GqlContext, @Args('data') input: GqlRegisterInput) {
    return await this.authService.register(res, input);
  }

  @Mutation(() => GqlAuth)
  async login(@Context() { res }: GqlContext, @Args('data') input: GqlLoginInput) {
    return await this.authService.login(res, input);
  }

  @Mutation(() => GqlAuth)
  async refresh(@Context() { req, res }: GqlContext) {
    return await this.authService.refresh(req, res);
  }

  @Mutation(() => GqlAuth)
  async logout(@Context() { res }: GqlContext) {
    return await this.authService.logout(res);
  }

  @GqlAuthorization()
  @Query(() => Int)
  async me(@GqlAuthorized('id') id: string) {
    return id;
  }
}
