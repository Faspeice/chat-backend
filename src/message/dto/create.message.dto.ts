import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateMessageDto {
  @Field(() => String)
  @ApiProperty({
    description: 'Message text content.',
    example: 'Hello!',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

}