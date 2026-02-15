import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

@InputType()
export class PollMessagesQueryDto {
    @Field(() => String)
    @ApiProperty({
        description: 'Long-polling timeout in milliseconds. The server will wait up to this duration for new messages.',
        example: '30000',
    })
    @IsNotEmpty()
    @IsNumberString()
    timeout: string;

    @Field(() => String)
    @ApiPropertyOptional({
        description: 'Return messages strictly after this message ID.',
        example: '123',
    })
    @IsOptional()
    @IsNumberString()
    lastMessageId?: string;
}


