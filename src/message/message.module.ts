import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { PollMessageController } from './poll-message.controller';
import { MessageResolver } from './message.resolver';
import { PollMessageResolver } from './poll-message.resolver';

@Module({
  controllers: [MessageController, PollMessageController],
  providers: [MessageService, MessageRepository, MessageResolver, PollMessageResolver],
})
export class MessageModule { }
