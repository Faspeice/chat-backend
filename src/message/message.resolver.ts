import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { ChatMessagesResponseDto } from './dto/chat-messages-response.dto';
import { MessagePaginationDto } from './dto/message-pagination.dto';
import { CreateMessageDto } from './dto/create.message.dto';
import { MessageResponseDto } from './dto/message-response.dto';
import { GqlAuthorized } from 'src/auth/decorators/gql-authorized.decorator';
import { GqlAuthorization } from 'src/auth/decorators/gql-authorization.decorator';
import { GqlChatMemberAuth } from './decorators/gql-chat-member-auth.decorator';

@Resolver()
export class MessageResolver {
  constructor(private readonly messageService: MessageService) { }

  @GqlAuthorization()
  @GqlChatMemberAuth()
  @Query(() => ChatMessagesResponseDto, { name: 'chatMessages' })
  async getChatMessages(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('chatId', { type: () => Int }) chatId: number,
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 })
    page = 1,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 20 })
    limit = 20,
  ) {
    const pagination = new MessagePaginationDto();
    pagination.page = page;
    pagination.limit = limit;

    return this.messageService.getChatMessages(userId, chatId, pagination);
  }

  @GqlAuthorization()
  @GqlChatMemberAuth()
  @Mutation(() => MessageResponseDto, { name: 'createMessage' })
  async createMessage(
    @Args('chatId') chatId: number,
    @Args('data') input: CreateMessageDto,
    @GqlAuthorized('id') currentUserId: number
  ) {
    const message = await this.messageService.createMessage(
      currentUserId,
      chatId,
      input.content
    );

    return message;

  }

}

