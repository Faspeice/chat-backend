import { ApiProperty } from '@nestjs/swagger';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageSenderDto {
  @ApiProperty({ description: 'Sender user ID.', example: 1 })
  @Field(() => Int)
  id: number;

  @ApiProperty({ description: 'Sender username.', example: 'john_doe' })
  @Field(() => String)
  username: string;
}

@ObjectType()
export class MessageResponseDto {
  @ApiProperty({ description: 'Message ID.', example: 123 })
  @Field(() => Int)
  id: number;

  @ApiProperty({ description: 'Message content.', example: 'Hello!' })
  @Field(() => String)
  content: string;

  @ApiProperty({
    description: 'When the message was sent.',
    example: '2026-02-12T10:15:30.000Z',
    type: String,
    format: 'date-time',
  })
  @Field(() => Date)
  sentAt: Date;

  @ApiProperty({
    description: 'Whether the current user has read this message.',
    example: true,
  })
  @Field(() => Boolean)
  isRead: boolean; //Текущим пользователем

  @ApiProperty({ description: 'Sender information.', type: () => MessageSenderDto })
  @Field(() => MessageSenderDto)
  sender: MessageSenderDto;
}