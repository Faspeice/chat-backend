import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ description: 'User ID.', example: 1 })
  readonly id: number;

  @ApiProperty({ description: 'Username.', example: 'john_doe' })
  readonly username: string;

  constructor(id: number, username: string) {
    this.id = id;
    this.username = username;
  }
}
