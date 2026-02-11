import { HttpException, HttpStatus } from '@nestjs/common';

export class NotChatMemberException extends HttpException {
  constructor(userId: number, chatId: number) {
    super(
      `User ${userId} is not a member of chat ${chatId}`,
      HttpStatus.FORBIDDEN
    );
  }
}