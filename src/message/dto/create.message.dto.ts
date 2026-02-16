import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Message text content.',
    example: 'Hello!',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
