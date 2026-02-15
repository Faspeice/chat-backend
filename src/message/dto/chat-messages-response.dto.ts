import { MessageResponseDto } from "./message-response.dto";
import { ApiProperty } from '@nestjs/swagger';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationInfoDto {
  @ApiProperty({ description: 'Current page (1-based).', example: 1 })
  @Field(() => Int)
  page: number;

  @ApiProperty({ description: 'Page size.', example: 20 })
  @Field(() => Int)
  limit: number;

  @ApiProperty({ description: 'Total number of items.', example: 57 })
  @Field(() => Int)
  total: number;
}

@ObjectType()
export class ChatMessagesResponseDto {
  @ApiProperty({ description: 'Messages for the chat.', type: () => [MessageResponseDto] })
  @Field(() => [MessageResponseDto])
  messages: MessageResponseDto[];

  @ApiProperty({ description: 'Pagination metadata.', type: () => PaginationInfoDto })
  @Field(() => PaginationInfoDto)
  pagination: PaginationInfoDto;
}

