import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateChatRequest {
    @Field(() => Int)
    @ApiProperty({
        description: 'ID of the user to start a chat with.',
        example: 2,
    })
    @IsNumber()
    @IsNotEmpty()
    participantId: number;
}