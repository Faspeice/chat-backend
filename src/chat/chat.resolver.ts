import { Resolver, Query, Args, Mutation, ResolveField, Parent, Context, Int } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { GqlAuthorized } from 'src/auth/decorators/gql-authorized.decorator';
import { GqlAuthorization } from 'src/auth/decorators/gql-authorization.decorator';
import { GqlChat, GqlCreateChatResponse, GqlCreateChatInput } from './graphql/chat.model';
import { createChatLoaders, unreadCountKey } from './loaders/chat.loaders';
import type { GqlContext } from 'src/common/interfaces/gql-context.interface';
import type { ChatLoaders } from './loaders/chat.loaders';
import { ChatRepository } from './chat.repository';

@Resolver(() => GqlChat)
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatRepository: ChatRepository,
  ) {}


  @GqlAuthorization()
  @Mutation(() => GqlCreateChatResponse, { name: 'createChat' })
  async createChatWithUser(
    @GqlAuthorized('id') currentUserId: number,
    @Args('data') input: GqlCreateChatInput,
  ) {
    const result = await this.chatService.createChat(currentUserId, input.participantId);
    return {
      id: result.id,
      members: result.members.map((m) => ({ id: m.id, username: m.username, joinedAt: m.joinedAt })),
    };
  }

  @GqlAuthorization()
  @Query(() => [GqlChat], { name: 'chats' })
  async getChats(
    @GqlAuthorized('id') currentUserId: number,
    @Context() context: GqlContext,
  ) {
    const chats = await this.chatService.getChatsForGraphQL(currentUserId);
    this.ensureLoaders(context);
    return chats.map((chat) => ({
      id: chat.id,
      members: chat.members.map((m) => ({
        id: m.user.id,
        username: m.user.username,
        joinedAt: m.joinedAt,
      })),
    }));
  }

  @ResolveField(() => Int)
  async unreadCount(
    @Parent() chat: { id: number },
    @GqlAuthorized('id') currentUserId: number,
    @Context() context: GqlContext,
  ): Promise<number> {
    const loaders = this.ensureLoaders(context);
    return loaders.unreadCount.load(unreadCountKey(currentUserId, chat.id));
  }

  @ResolveField(() => String, { nullable: true })
  async lastMessageContent(
    @Parent() chat: { id: number },
    @Context() context: GqlContext,
  ): Promise<string | null> {
    const loaders = this.ensureLoaders(context);
    const last = await loaders.lastMessage.load(chat.id);
    return last?.content ?? null;
  }

  @ResolveField(() => Date, { nullable: true })
  async lastMessageSentAt(
    @Parent() chat: { id: number },
    @Context() context: GqlContext,
  ): Promise<Date | null> {
    const loaders = this.ensureLoaders(context);
    const last = await loaders.lastMessage.load(chat.id);
    return last?.sentAt ?? null;
  }

  
  private ensureLoaders(context: GqlContext): ChatLoaders {
    if (context.loaders) return context.loaders as unknown as ChatLoaders;
    const loaders = createChatLoaders(this.chatRepository);
    context.loaders = loaders as unknown as Record<string, unknown>;
    return loaders;
  }
}
