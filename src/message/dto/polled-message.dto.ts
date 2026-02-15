import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class PolledMessageDto {
  
  @Field(() => Int)
  @ApiProperty({ description: 'Message ID.', example: 123 })
  id: number;

  @Field(() => Int)
  @ApiProperty({ description: 'Chat ID.', example: 10 })
  chatId: number;

  @Field(() => Int)
  @ApiProperty({ description: 'Sender user ID.', example: 1 })
  senderId: number;

  @Field(() => String)
  @ApiProperty({ description: 'Message content.', example: 'Hello!' })
  content: string;

  @Field(() => Date)
  @ApiProperty({
    description: 'When the message was sent.',
    example: '2026-02-12T10:15:30.000Z',
    type: String,
    format: 'date-time',
  })
  sentAt: Date;
}

