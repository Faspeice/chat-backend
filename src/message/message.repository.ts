import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { MessagePaginationDto } from "./dto/message-pagination.dto";

@Injectable()
export class MessageRepository {
  private readonly logger = new Logger(MessageRepository.name);

  constructor(private readonly prismaService: PrismaService) { }

  async findMessagesForUserAfterId(userId: number, lastMessageId: number) {
    return this.prismaService.message.findMany({
      where: {
        id: {
          gt: lastMessageId,
        },
        chat: {
          members: {
            some: { userId }
          }
        }
      },
      orderBy: {
        id: "asc"
      }
    });
  }

  async createMessage(
    userId: number,
    chatId: number,
    content: string
  ) {
    try {
      this.logger.log(`Creating message for chat ${chatId} by user ${userId}`);

      const message = await this.prismaService.message.create({
        data: {
          chatId: chatId,
          senderId: userId,
          content: content,
        },
        include: {
          sender: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });

      this.logger.log(`Message created successfully: ${message.id}`);
      return message;
    } catch (error) {
      this.logger.error(
        `Failed to create message for chat ${chatId}: ${error.message}`
      );
      throw error;
    }
  }

  async getChatMessages(
    chatId: number,
    pagination: MessagePaginationDto
  ) {
    try {
      this.logger.log(
        `Fetching messages for chat ${chatId} with pagination: page=${pagination.page}, limit=${pagination.limit}`
      );
      const page = pagination.page || 1;
      const limit = pagination.limit || 20;

      const skip = (page - 1) * limit;
      const take = limit;

      const [messages, total] = await Promise.all([
        this.prismaService.message.findMany({
          where: { chatId: chatId },
          include: {
            sender: {
              select: {
                id: true,
                username: true,
              },
            },
          },
          orderBy: { sentAt: 'desc' },
          skip: skip,
          take: take,
        }),
        this.prismaService.message.count({
          where: { chatId: chatId },
        }),
      ]);

      this.logger.log(
        `Fetched ${messages.length} messages for chat ${chatId} (total: ${total})`
      );
      return { messages, total };
    } catch (error) {
      this.logger.error(
        `Failed to fetch messages for chat ${chatId}: ${error.message}`
      );
      throw error;
    }
  }

  async checkChatExists(chatId: number){
    try {
      const chat = await this.prismaService.chat.findUnique({
        where: { id: chatId },
      });

      return !!chat;
    } catch (error) {
      this.logger.error(`Failed to check chat existence: ${error.message}`);
      throw error;
    }
  }
}


