import { Args, Query, Resolver } from "@nestjs/graphql";
import { ReadService } from "./read.service";
import { GqlChatMemberAuth } from "src/message/decorators/gql-chat-member-auth.decorator";
import { GqlAuthorized } from "src/auth/decorators/gql-authorized.decorator";

@Resolver()
export class ReadResolver {
    constructor(private readonly readService: ReadService) { }

    @GqlChatMemberAuth()
    @Query(() => Boolean)
    async readChat(@Args('chatId') chatId: number, @GqlAuthorized('id') userId: number) {
        await this.readService.readChat(userId, chatId);
    }

}