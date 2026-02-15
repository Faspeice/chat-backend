import { ChatMemberGuard } from "../guards/chat-member.guard";
import { applyDecorators, UseGuards } from "@nestjs/common";
import { GqlJwtGuard } from "src/auth/guards/gql-jwt.guard";

export function GqlChatMemberAuth() {
  return applyDecorators(
    UseGuards(GqlJwtGuard, ChatMemberGuard)  
  );
}