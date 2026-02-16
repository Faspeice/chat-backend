import { Resolver, Query, Args } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { GqlPolledMessage, GqlPollMessagesInput } from './graphql/message.model';
import { GqlAuthorization } from 'src/auth/decorators/gql-authorization.decorator';
import { GqlAuthorized } from 'src/auth/decorators/gql-authorized.decorator';

@Resolver()
export class PollMessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => [GqlPolledMessage])
  @GqlAuthorization()
  async pollMessages(
    @GqlAuthorized('id') currentUserId: number,
    @Args('data') input: GqlPollMessagesInput,
  ) {
    const timeout = Number(input.timeout);
    const lastMessageId = input.lastMessageId ? Number(input.lastMessageId) : undefined;
    const list = await this.messageService.pollMessages(
      currentUserId,
      timeout,
      lastMessageId,
    );
    return list.map((m) => ({
      id: m.id,
      chatId: m.chatId,
      senderId: m.senderId,
      content: m.content,
      sentAt: m.sentAt,
    }));
  }
}