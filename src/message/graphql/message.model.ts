import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GqlMessageSender {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;
}

@ObjectType()
export class GqlMessage {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field()
  sentAt: Date;

  @Field()
  isRead: boolean;

  @Field(() => GqlMessageSender)
  sender: GqlMessageSender;
}

@ObjectType()
export class GqlPaginationInfo {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  total: number;
}

@ObjectType()
export class GqlChatMessagesResponse {
  @Field(() => [GqlMessage])
  messages: GqlMessage[];

  @Field(() => GqlPaginationInfo)
  pagination: GqlPaginationInfo;
}

@InputType()
export class GqlCreateMessageInput {
  @Field()
  content: string;
}

@ObjectType()
export class GqlPolledMessage {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  chatId: number;

  @Field(() => Int)
  senderId: number;

  @Field()
  content: string;

  @Field()
  sentAt: Date;
}

@InputType()
export class GqlPollMessagesInput {
  @Field(() => String)
  timeout: string;

  @Field(() => String, { nullable: true })
  lastMessageId?: string;
}
