import { ApiProperty } from '@nestjs/swagger';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ChatMebmerDto } from './chat-member.dto';

@ObjectType()
export class ChatResponse {

    constructor(
    id: number,
    members: ChatMebmerDto[],
    lastMessageContent: string | null,
    lastMessageSentAt: Date | null,
    unreadCount: number,
  ) {
    this.id = id;
    this.members = members;
    this.lastMessageContent = lastMessageContent;
    this.lastMessageSentAt = lastMessageSentAt;
    this.unreadCount = unreadCount;
  }
  
  @ApiProperty({ description: 'Chat ID.', example: 10 })
  @Field(() => Int)
  id: number;

  @ApiProperty({
    description: 'Chat participants.',
    type: () => [ChatMebmerDto],
  })
  @Field(() => [ChatMebmerDto])
  members: ChatMebmerDto[];

  @ApiProperty({
    description: 'Content of the last message in this chat (if any).',
    example: 'Hey, how are you?',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  lastMessageContent: string | null;

  @ApiProperty({
    description: 'When the last message was sent (if any).',
    example: '2026-02-12T10:15:30.000Z',
    type: String,
    format: 'date-time',
    nullable: true,
  })
  @Field(() => Date, { nullable: true })
  lastMessageSentAt: Date | null;

  @ApiProperty({
    description: 'Number of unread messages for the current user in this chat.',
    example: 3,
  })
  @Field(() => Int)
  unreadCount: number;


}

@ObjectType()
export class CreateChatResponse {

  @Field(() => Int)
  @ApiProperty({ description: 'Chat ID.', example: 10 })
  id: number;

  @Field(() => [ChatMebmerDto])
  @ApiProperty({
    description: 'Chat participants.',
    type: () => [ChatMebmerDto],
  })
  members: ChatMebmerDto[];

  constructor(
    id: number,
    members: ChatMebmerDto[],
  ) {
    this.id = id;
    this.members = members;
  }
}