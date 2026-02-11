import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { PollMessagesQueryDto } from './dto/poll-messages-query.dto';
import { MessagePaginationDto } from './dto/message-pagination.dto';
import { CreateMessageDto } from './dto/create.message.dto';
import { ChatMemberAuth } from './decorators/chat-member-auth.decorator';

@Controller('chats/:chatId/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @ChatMemberAuth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createMessage(
    @Param('chatId') chatId: number,
    @Body() createMessageDto: CreateMessageDto,
    @Req() req
  ) {
    const message = await this.messageService.createMessage(
      req.user.id,
      chatId,
      createMessageDto.content
    );

    return message;

  }

  @ChatMemberAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getChatMessages(
    @Authorized('id') userId: number,
    @Param('chatId') chatId: number,
    @Query() paginationDto: MessagePaginationDto,
  ) {
    const result = await this.messageService.getChatMessages(
      userId,
      chatId,
      paginationDto
    );

    return result;
  }
}

