import { ApiProperty } from '@nestjs/swagger';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatMebmerDto {
  @ApiProperty({ description: 'User ID.', example: 1 })
  @Field(() => Int)
  id: number;

  @ApiProperty({ description: 'Username.', example: 'john_doe' })
  @Field(() => String)
  username: string;

  @ApiProperty({
    description: 'Date when the user joined the chat.',
    example: '2026-02-12T10:15:30.000Z',
    type: String,
    format: 'date-time',
  })
  @Field(() => Date)
  joinedAt: Date;

  constructor(id: number, username: string, joinedAt: Date) {
    this.id = id;
    this.username = username;
    this.joinedAt = joinedAt;
  }
}