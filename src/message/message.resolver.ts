import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { MessageService } from './message.service';
import {
  GqlChatMessagesResponse,
  GqlMessage,
  GqlCreateMessageInput,
} from './graphql/message.model';
import { MessagePaginationDto } from './dto/message-pagination.dto';
import { GqlAuthorized } from 'src/auth/decorators/gql-authorized.decorator';
import { GqlAuthorization } from 'src/auth/decorators/gql-authorization.decorator';
import { GqlChatMemberAuth } from './decorators/gql-chat-member-auth.decorator';

@Resolver()
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @GqlAuthorization()
  @GqlChatMemberAuth()
  @Query(() => GqlChatMessagesResponse, { name: 'chatMessages' })
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

    const result = await this.messageService.getChatMessages(userId, chatId, pagination);
    return {
      messages: result.messages.map((m) => ({
        id: m.id,
        content: m.content,
        sentAt: m.sentAt,
        isRead: m.isRead,
        sender: { id: m.sender.id, username: m.sender.username },
      })),
      pagination: {
        page: result.pagination.page,
        limit: result.pagination.limit,
        total: result.pagination.total,
      },
    };
  }

  @GqlAuthorization()
  @GqlChatMemberAuth()
  @Mutation(() => GqlMessage, { name: 'createMessage' })
  async createMessage(
    @Args('chatId') chatId: number,
    @Args('data') input: GqlCreateMessageInput,
    @GqlAuthorized('id') currentUserId: number,
  ) {
    const message = await this.messageService.createMessage(
      currentUserId,
      chatId,
      input.content,
    );
    return {
      id: message.id,
      content: message.content,
      sentAt: message.sentAt,
      isRead: false,
      sender: { id: message.sender.id, username: message.sender.username },
    };
  }
}

