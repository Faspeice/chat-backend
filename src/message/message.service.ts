import { Injectable, Logger } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { ChatNotFoundException } from 'src/chat/exceptions/chat-not-found.exception';
import { MessagePaginationDto } from './dto/message-pagination.dto';
import { plainToInstance } from 'class-transformer';
import { MessageResponseDto } from './dto/message-response.dto';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(private readonly messageRepository: MessageRepository) { }

  async pollMessages(currentUserId: number, timeout: number, lastMessageId?: number) {
    const startTime = Date.now();
    const effectiveLastMessageId = lastMessageId ?? 0;

    try {
      while (true) {
        const newMessages = await this.messageRepository.findMessagesForUserAfterId(currentUserId, effectiveLastMessageId);

        if (newMessages.length > 0) {
          this.logger.log(`Found ${newMessages.length} new messages for user ${currentUserId}`);
          return newMessages;
        }

        const elapsed = Date.now() - startTime;

        if (elapsed >= timeout) {
          this.logger.log(`Polling timeout reached for user ${currentUserId}`);
          return [];
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      this.logger.error(`Failed to poll messages for user ${currentUserId}`, error instanceof Error ? error.stack : undefined);
      throw error;
    }
  }

  async createMessage(
    userId: number,
    chatId: number,
    content: string
  ) {
    const numericChatId = Number(chatId);
    try {
      this.logger.log(
        `Creating message for chat ${chatId} by user ${userId}`
      );

      const chatExists = await this.messageRepository.checkChatExists(numericChatId);
      if (!chatExists) {
        throw new ChatNotFoundException(numericChatId);
      }

      const message = await this.messageRepository.createMessage(
        userId,
        numericChatId,
        content
      );

      this.logger.log(`Message created successfully: ${message.id}`);
      return message;
    } catch (error) {
      this.logger.error(
        `Failed to create message for chat ${numericChatId}: ${error.message}`
      );
      throw error;
    }
  }

  async getChatMessages(
    userId: number,
    chatId: number,
    pagination: MessagePaginationDto
  ) {
    const nummericUserId = Number(userId);
    const numericChatId = Number(chatId);
    try {
      this.logger.log(
        `Fetching messages for chat ${chatId} by ${nummericUserId} with pagination: page=${pagination.page}, limit=${pagination.limit}`
      );

      const chatExists = await this.messageRepository.checkChatExists(numericChatId);
      if (!chatExists) {
        throw new ChatNotFoundException(numericChatId);
      }

      const { messages, total } =
        await this.messageRepository.getChatMessages(numericChatId, pagination);

      const messagesWithReadStatus = messages.map((msg) => {
        const isRead =
          msg.senderId === nummericUserId ||
          (msg.reads && msg.reads.some((read) => read.userId === nummericUserId));

        return plainToInstance(MessageResponseDto, {
          id: msg.id,
          content: msg.content,
          sentAt: msg.sentAt,
          sender: {
            id: msg.sender.id,
            username: msg.sender.username,
          },
          isRead,
        });
      });

      const paginationInfo = {
        page: pagination.page,
        limit: pagination.limit,
        total: total,
      };

      this.logger.log(
        `Successfully fetched ${messages.length} messages for chat ${numericChatId}`
      );
      return { messages: messagesWithReadStatus, pagination: paginationInfo };
    } catch (error) {
      this.logger.error(
        `Failed to fetch messages for chat ${numericChatId}: ${error.message}`
      );
      throw error;
    }
  }
}
