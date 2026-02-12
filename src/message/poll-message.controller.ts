// poll-message.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { Authorized } from '../auth/decorators/authorized.decorator';
import { PollMessagesQueryDto } from './dto/poll-messages-query.dto';
import { PolledMessageDto } from './dto/polled-message.dto';

@ApiTags('Messages')
@Controller('messages')
export class PollMessageController {
  constructor(private readonly messageService: MessageService) { }

  @ApiOperation({ summary: 'Long-poll for new messages' })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Returns an array of new messages (may be empty if timeout reached).',
    type: () => [PolledMessageDto],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
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