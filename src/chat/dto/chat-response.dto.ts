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

  constructor(id: number, members: ChatMebmerDto[]) {
    this.id = id;
    this.members = members;
  }
}