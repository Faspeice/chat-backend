import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { ChatResponse } from './dto/chat-response.dto';
import { ChatMebmerDto } from './dto/chat-member.dto';
import { UserNotFoundException } from 'src/user/exceptions/user-not-found.exception';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  constructor(private readonly chatRepository: ChatRepository, private readonly userRepository: UserRepository) { }
  async createChat(firstUserId: number, secondUserId: number) {

    await this.validateUsersExist([firstUserId, secondUserId]);

    const existingChat = await this.chatRepository.findChatByUserIds([firstUserId, secondUserId]);
    
    if (existingChat) {
      this.logger.log(`Chat already exists between ${firstUserId} and ${secondUserId}`);
      return new ChatResponse(
        existingChat.id,
        existingChat.members.map(member => new ChatMebmerDto(member.user.id, member.user.username, member.joinedAt))
      );
    }
    try {
      const newChat = await this.chatRepository.createChatWithMembers([firstUserId, secondUserId]);

      this.logger.log(`Chat created between ${firstUserId} and ${secondUserId}`);

      return new ChatResponse(
        newChat.id,
        newChat.members.map(member => new ChatMebmerDto(member.user.id, member.user.username, member.joinedAt))
      );
    }
    catch (e) {
      if (e instanceof UserNotFoundException) {
        this.logger.error(`User not found: ${e.message}`);
        throw e; 
      }
      this.logger.error("Failed to create chat");
      throw e;
    }
  }

  private async validateUsersExist(userIds: number[]): Promise<void> {
    for (const userId of userIds) {
      const user = await this.userRepository.getById(userId);
      if (!user) {
        throw new UserNotFoundException(userId);
      }
    }
  }
}
