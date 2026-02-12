import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { MessagePaginationDto } from './dto/message-pagination.dto';
import { CreateMessageDto } from './dto/create.message.dto';
import { ChatMemberAuth } from './decorators/chat-member-auth.decorator';
import { ChatMessagesResponseDto } from './dto/chat-messages-response.dto';
import { MessageResponseDto } from './dto/message-response.dto';

@ApiTags('Chat messages')
@Controller('chats/:chatId/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @ApiOperation({ summary: 'Create a message in a chat' })
  @ApiBearerAuth()
  @ApiParam({ name: 'chatId', description: 'Chat ID.', example: 10 })
  @ApiCreatedResponse({
    description: 'Message created successfully.',
    type: MessageResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized / not a chat member.' })
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

  @ApiOperation({ summary: 'Get chat messages (paginated)' })
  @ApiBearerAuth()
  @ApiParam({ name: 'chatId', description: 'Chat ID.', example: 10 })
  @ApiOkResponse({
    description: 'Messages for the chat with pagination info.',
    type: ChatMessagesResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized / not a chat member.' })
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

