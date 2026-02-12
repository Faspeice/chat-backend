import { Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ReadService } from './read.service';
import { ChatMemberAuth } from 'src/message/decorators/chat-member-auth.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';

@ApiTags('Read receipts')
@Controller('chats/:chatId/read')
export class ReadController {
  constructor(private readonly readService: ReadService) {}

  @ApiOperation({ summary: 'Mark all messages in a chat as read' })
  @ApiBearerAuth()
  @ApiParam({ name: 'chatId', description: 'Chat ID.', example: 10 })
  @ApiOkResponse({ description: 'All unread messages in the chat were marked as read.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized / not a chat member.' })
  @ChatMemberAuth()
  @Post()
  @HttpCode(HttpStatus.OK)
  async readChat(@Param('chatId') chatId: number,@Authorized('id') userId: number) {
    await this.readService.readChat(userId,chatId);
  }
}
