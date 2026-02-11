import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  content: string;

}