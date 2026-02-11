import { MessageResponseDto } from "./message-response.dto";


export class ChatMessagesResponseDto {
  messages: MessageResponseDto[];

  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

