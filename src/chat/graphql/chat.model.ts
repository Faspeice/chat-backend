import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GqlChatMember {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  joinedAt: Date;
}
@ObjectType()
export class GqlChat {
  @Field(() => Int)
  id: number;

  @Field(() => [GqlChatMember])
  members: GqlChatMember[];

  @Field(() => Int, { nullable: false })
  unreadCount?: number;

  @Field(() => String, { nullable: true })
  lastMessageContent?: string | null;

  @Field(() => Date, { nullable: true })
  lastMessageSentAt?: Date | null;
}

@ObjectType()
export class GqlCreateChatResponse {
  @Field(() => Int)
  id: number;

  @Field(() => [GqlChatMember])
  members: GqlChatMember[];
}

@InputType()
export class GqlCreateChatInput {
  @Field(() => Int)
  participantId: number;
}
