import { ApiProperty } from '@nestjs/swagger';

export class MessageSenderDto {

  @ApiProperty({ description: 'Sender user ID.', example: 1 })
  id: number;


  @ApiProperty({ description: 'Sender username.', example: 'john_doe' })
  username: string;
}

export class MessageResponseDto {

  @ApiProperty({ description: 'Message ID.', example: 123 })
  id: number;
  
  @ApiProperty({ description: 'Message content.', example: 'Hello!' })
  content: string;

  @ApiProperty({
    description: 'When the message was sent.',
    example: '2026-02-12T10:15:30.000Z',
    type: String,
    format: 'date-time',
  })
  sentAt: Date;

  @ApiProperty({
    description: 'Whether the current user has read this message.',
    example: true,
  })
  isRead: boolean; //Текущим пользователем

  @ApiProperty({ description: 'Sender information.', type: () => MessageSenderDto })
  sender: MessageSenderDto;
}