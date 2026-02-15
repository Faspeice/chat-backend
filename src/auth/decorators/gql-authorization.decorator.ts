import { applyDecorators, UseGuards } from "@nestjs/common";
import { GqlJwtGuard } from "../guards/gql-jwt.guard";

export function GqlAuthorization() {
    return applyDecorators(UseGuards(GqlJwtGuard));
}