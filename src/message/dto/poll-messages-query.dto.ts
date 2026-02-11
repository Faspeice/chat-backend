import { IsNotEmpty, IsNumberString, IsOptional } from "class-validator";

export class PollMessagesQueryDto {
    @IsNotEmpty()
    @IsNumberString()
    timeout: string;

    @IsOptional()
    @IsNumberString()
    lastMessageId?: string;
}


