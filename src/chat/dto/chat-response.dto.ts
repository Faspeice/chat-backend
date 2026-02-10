import { ChatMebmerDto } from "./chat-member.dto";

export class ChatResponse{
constructor(private readonly id: number, private readonly members: ChatMebmerDto[]) {}
}