import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateChatRequest {
    @IsNumber()
    @IsNotEmpty()
    participantId: number;
}