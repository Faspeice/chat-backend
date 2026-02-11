import { HttpException, HttpStatus } from '@nestjs/common';

export class ChatNotFoundException extends HttpException {
  constructor(chatId: number) {
    super(`Chat with id ${chatId} not found`, HttpStatus.NOT_FOUND);
  }
}