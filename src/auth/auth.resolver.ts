import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { GqlAuthorized } from "./decorators/gql-authorized.decorator";
import { GqlAuthorization } from "./decorators/gql-authorization.decorator";
import type { GqlContext } from "src/common/interfaces/gql-context.interface";
import { RegisterRequest } from "./dto/register.dto";
import { LoginRequest } from "./dto/login.dto";
import { AuthModel } from "./models/auth.model";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => AuthModel)
    async register(@Context() { res }: GqlContext, @Args('data') input: RegisterRequest) {
        return await this.authService.register(res, input);
    }

    @Mutation(() => AuthModel)
    async login(@Context() { res }: GqlContext, @Args('data') input: LoginRequest) {
        return await this.authService.login(res, input);
    }

    @Mutation(() => AuthModel)
    async refresh(@Context() { req, res }: GqlContext) {
        return await this.authService.refresh(req, res);
    }

    @Mutation(() => AuthModel)
    async logout(@Context() { res }: GqlContext) {
        return await this.authService.logout(res);
    }


    @GqlAuthorization()
    @Query(() => Int)
    async me(@GqlAuthorized('id') id: string) {
        return id
    }
}
