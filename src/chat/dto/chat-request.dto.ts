import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateChatRequest {
    @ApiProperty({
        description: 'ID of the user to start a chat with.',
        example: 2,
    })
    @IsNumber()
    @IsNotEmpty()
    participantId: number;
}