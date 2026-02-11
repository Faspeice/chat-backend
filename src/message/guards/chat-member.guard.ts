import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    BadRequestException,
  } from '@nestjs/common';
  import { PrismaService } from '../../prisma/prisma.service';
import { NotChatMemberException } from '../exceptions/not-chat-mebmer.exception';
  
  @Injectable()
  export class ChatMemberGuard implements CanActivate {
    constructor(private readonly prisma: PrismaService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const userId = request.user?.id;
      const chatId = parseInt(request.params.chatId) as number;
  
      if (!userId) {
        throw new ForbiddenException('User not authenticated');
      }

      if (isNaN(chatId)) {
      throw new BadRequestException(`Invalid chatId: ${request.params.chatId}`);
    }
  
      const isMember = await this.prisma.chatMember.findFirst({
        where: {
          chatId: chatId,
          userId: userId,
        },
      });
  
      if (!isMember) {
        throw new NotChatMemberException(userId, chatId);
      }
  
      return true;
    }
  }