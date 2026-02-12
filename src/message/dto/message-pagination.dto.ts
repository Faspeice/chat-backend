import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class MessagePaginationDto {
  @ApiPropertyOptional({
    description: 'Page number (1-based).',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Page size.',
    example: 20,
    default: 20,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number = 20;
}