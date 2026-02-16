import { MessageResponseDto } from './message-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationInfoDto {
  @ApiProperty({ description: 'Current page (1-based).', example: 1 })
  page: number;

  @ApiProperty({ description: 'Page size.', example: 20 })
  limit: number;

  @ApiProperty({ description: 'Total number of items.', example: 57 })
  total: number;
}

export class ChatMessagesResponseDto {
  @ApiProperty({ description: 'Messages for the chat.', type: () => [MessageResponseDto] })
  messages: MessageResponseDto[];

  @ApiProperty({ description: 'Pagination metadata.', type: () => PaginationInfoDto })
  pagination: PaginationInfoDto;
}
