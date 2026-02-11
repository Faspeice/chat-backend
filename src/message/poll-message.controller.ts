// poll-message.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { Authorized } from '../auth/decorators/authorized.decorator';
import { PollMessagesQueryDto } from './dto/poll-messages-query.dto';

@Controller('messages')
export class PollMessageController {
  constructor(private readonly messageService: MessageService) { }

  @Authorization()
  @Get('poll')
  async pollMessages(
    @Authorized('id') currentUserId: number,
    @Query() query: PollMessagesQueryDto,
  ) {
    const timeout = Number(query.timeout);
    const lastMessageId = query.lastMessageId ? Number(query.lastMessageId) : undefined;

    return this.messageService.pollMessages(currentUserId, timeout, lastMessageId);
  }
}