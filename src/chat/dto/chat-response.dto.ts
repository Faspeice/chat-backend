import { ApiProperty } from '@nestjs/swagger';
import { ChatMebmerDto } from './chat-member.dto';

export class ChatResponse {
  @ApiProperty({ description: 'Chat ID.', example: 10 })
  id: number;

  @ApiProperty({
    description: 'Chat participants.',
    type: () => [ChatMebmerDto],
  })
  members: ChatMebmerDto[];

  @ApiProperty({
    description: 'Content of the last message in this chat (if any).',
    example: 'Hey, how are you?',
    nullable: true,
  })
  lastMessageContent: string | null;

  @ApiProperty({
    description: 'When the last message was sent (if any).',
    example: '2026-02-12T10:15:30.000Z',
    type: String,
    format: 'date-time',
    nullable: true,
  })
  lastMessageSentAt: Date | null;

  @ApiProperty({
    description: 'Number of unread messages for the current user in this chat.',
    example: 3,
  })
  unreadCount: number;

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
}

export class CreateChatResponse {
  @ApiProperty({ description: 'Chat ID.', example: 10 })
  id: number;

  @ApiProperty({
    description: 'Chat participants.',
    type: () => [ChatMebmerDto],
  })
  members: ChatMebmerDto[];

  constructor(id: number, members: ChatMebmerDto[]) {
    this.id = id;
    this.members = members;
  }
}
