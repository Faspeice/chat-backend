// src/read/read.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ReadRepository } from './read.repository';
import { ChatNotFoundException } from 'src/chat/exceptions/chat-not-found.exception';
import { NotChatMemberException } from 'src/message/exceptions/not-chat-mebmer.exception';
@Injectable()
export class ReadService {
  private readonly logger = new Logger(ReadService.name);

  constructor(private readonly readRepository: ReadRepository) {}

  async readChat(userId: number, chatId: number) {
    const nummericUserId = Number(userId);
    const numericChatId = Number(chatId);
    this.logger.log(`User ${nummericUserId} requests to mark chat ${numericChatId} as read`);

    const chatExists = await this.readRepository.checkChatExists(numericChatId);
    if (!chatExists) {
      throw new ChatNotFoundException(numericChatId);
    }
    await this.readRepository.markAllMessagesAsRead(nummericUserId, numericChatId);

    this.logger.log(`Successfully marked chat ${numericChatId} as read for user ${nummericUserId}`);
  }
}