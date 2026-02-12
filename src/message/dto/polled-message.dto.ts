import { ApiProperty } from '@nestjs/swagger';

export class PolledMessageDto {
  @ApiProperty({ description: 'Message ID.', example: 123 })
  id: number;

  @ApiProperty({ description: 'Chat ID.', example: 10 })
  chatId: number;

  @ApiProperty({ description: 'Sender user ID.', example: 1 })
  senderId: number;

  @ApiProperty({ description: 'Message content.', example: 'Hello!' })
  content: string;

  @ApiProperty({
    description: 'When the message was sent.',
    example: '2026-02-12T10:15:30.000Z',
    type: String,
    format: 'date-time',
  })
  sentAt: Date;
}

