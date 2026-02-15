import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReadRepository {

  constructor(private readonly prismaService: PrismaService) {}

  async markAllMessagesAsRead(userId: number, chatId: number){

    const unreadMessages = await this.prismaService.message.findMany({
  where: {
    chatId: chatId,
    senderId: { not: userId },
    NOT: {
      reads: {
        some: {
          userId: userId,
        },
      },
    },
  },
  select: { id: true },
});


    const messageIds = unreadMessages.map(m => m.id);
    
    await this.prismaService.$transaction(
      messageIds.map(messageId =>
        this.prismaService.messageRead.create({
          data: {
            messageId,
            userId,
          },
        })
      )
    );

  }

  async checkChatExists(chatId: number): Promise<boolean> {
    const chat = await this.prismaService.chat.findUnique({
      where: { id: chatId },
    });
    return !!chat;
  }

}