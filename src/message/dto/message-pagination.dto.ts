import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class MessagePaginationDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number = 20;
}