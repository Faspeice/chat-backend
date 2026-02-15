import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { ChatResponse } from './dto/chat-response.dto';
import { GqlAuthorized } from 'src/auth/decorators/gql-authorized.decorator';
import { GqlAuthorization } from 'src/auth/decorators/gql-authorization.decorator';
import { CreateChatRequest } from './dto/chat-request.dto';

@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @GqlAuthorization()
  @Mutation(() => ChatResponse, { name: 'createChat' })
  async createChatWithUser(
      @GqlAuthorized('id') currentUserId: number,
      @Args('data') input: CreateChatRequest
    ) {
      return await this.chatService.createChat(currentUserId, input.participantId);
    }

  @GqlAuthorization()
  @Query(() => [ChatResponse], { name: 'chats' })
  async getChats(
    @GqlAuthorized('id') currentUserId: number
  ){
    return this.chatService.getChats(currentUserId);
  }

}

