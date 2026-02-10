import { Injectable, Logger } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { ChatResponse } from './dto/chat-response.dto';
import { ChatMebmerDto } from './dto/chat-member.dto';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
    constructor(private readonly chatRepository: ChatRepository) { }
  async createChat(firstUserId: number, secondUserId: number) {
    const existingChat = await this.chatRepository.findPrivateChatByUserIds(firstUserId, secondUserId);
    if(existingChat) {
      this.logger.log(`Chat already exists between ${firstUserId} and ${secondUserId}`);
      return new ChatResponse(
        existingChat.id, 
        existingChat.members.map(member => new ChatMebmerDto(member.user.id, member.user.username, member.joinedAt)) 
    );
    }
    const newChat = await this.chatRepository.createChatWithMembers([firstUserId, secondUserId]);
    this.logger.log(`Chat created between ${firstUserId} and ${secondUserId}`);
    
    return new ChatResponse(
        newChat.id, 
        newChat.members.map(member => new ChatMebmerDto(member.user.id, member.user.username, member.joinedAt)) 
    );
      }
}
