import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { CreateChatRequest } from './dto/chat-request.dto';
import { ChatResponse } from './dto/chat-response.dto';

@ApiTags('Chats')
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @ApiOperation({ summary: 'Create a 1:1 chat with another user' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Chat created (or existing chat returned).', type: ChatResponse })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @Authorization()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createChatWithUser(
    @Authorized('id') currentUserId: number,
    @Body() createChatDto: CreateChatRequest
  ) {
    return await this.chatService.createChat(currentUserId, createChatDto.participantId);
  }

  @ApiOperation({ summary: 'Get chats for current user' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Chats where the current user is a participant.', type: () => [ChatResponse] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @Authorization()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getChats(
    @Authorized('id') currentUserId: number,
  ) {
    return this.chatService.getChats(currentUserId);
  }
}
