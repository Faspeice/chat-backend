import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class PollMessagesQueryDto {
    @ApiProperty({
        description: 'Long-polling timeout in milliseconds. The server will wait up to this duration for new messages.',
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


