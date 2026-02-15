import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatRepository } from './chat.repository';
import { UserModule } from 'src/user/user.module';
import { ChatResolver } from './chat.resolver';

@Module({
  imports: [UserModule],
  controllers: [ChatController],
  providers: [ChatService, ChatRepository, ChatResolver],
})
export class ChatModule {}
