import { Body, Controller, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { CreateChatRequest } from './dto/chat-request.dto';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @Authorization()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createChatWithUser(
    @Authorized('id') currentUserId: number,
    @Body() createChatDto: CreateChatRequest
  ) {
    return this.chatService.createChat(currentUserId, createChatDto.participantId);
  }
}
