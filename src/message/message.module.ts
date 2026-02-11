import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { PollMessageController } from './poll-message.controller';

@Module({
  controllers: [MessageController, PollMessageController],
  providers: [MessageService, MessageRepository],
})
export class MessageModule { }
