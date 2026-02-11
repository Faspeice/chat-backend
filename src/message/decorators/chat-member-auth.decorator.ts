import { JwtGuard } from "src/auth/guards/auth.guard";
import { ChatMemberGuard } from "../guards/chat-member.guard";
import { applyDecorators, UseGuards } from "@nestjs/common";

export function ChatMemberAuth() {
  return applyDecorators(
    UseGuards(JwtGuard, ChatMemberGuard)  
  );
}