import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class PollMessagesQueryDto {
  @ApiProperty({
    description: 'Long-polling timeout in milliseconds.',
    example: '30000',
  })
  @IsNotEmpty()
  @IsNumberString()
  timeout: string;

  @ApiPropertyOptional({
    description: 'Return messages strictly after this message ID.',
    example: '123',
  })
  @IsOptional()
  @IsNumberString()
  lastMessageId?: string;
}
