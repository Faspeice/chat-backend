import { ApiProperty } from '@nestjs/swagger';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserResponse {
  @ApiProperty({ description: 'User ID.', example: 1 })
  @Field(() => Int)
  readonly id: number;

  @ApiProperty({ description: 'Username.', example: 'john_doe' })
  @Field(() => String)
  readonly username: string;

  constructor(id: number, username: string) {
    this.id = id;
    this.username = username;
  }
}
  