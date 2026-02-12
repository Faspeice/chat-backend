import { ApiProperty } from '@nestjs/swagger';

export class ChatMebmerDto {
  @ApiProperty({ description: 'User ID.', example: 1 })
  id: number;

  @ApiProperty({ description: 'Username.', example: 'john_doe' })
  username: string;

  @ApiProperty({
    description: 'Date when the user joined the chat.',
    example: '2026-02-12T10:15:30.000Z',
    type: String,
    format: 'date-time',
  })
  joinedAt: Date;

  constructor(id: number, username: string, joinedAt: Date) {
    this.id = id;
    this.username = username;
    this.joinedAt = joinedAt;
  }
}