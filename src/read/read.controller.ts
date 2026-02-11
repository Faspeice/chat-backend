import { Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ReadService } from './read.service';
import { ChatMemberAuth } from 'src/message/decorators/chat-member-auth.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';

@Controller('chats/:chatId/read')
export class ReadController {
  constructor(private readonly readService: ReadService) {}

  @ChatMemberAuth()
  @Post()
  @HttpCode(HttpStatus.OK)
  async readChat(@Param('chatId') chatId: number,@Authorized('id') userId: number) {
    await this.readService.readChat(userId,chatId);
  }
}
