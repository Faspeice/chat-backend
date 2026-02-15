import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Request } from "express";
import { User } from "src/generated/prisma/client";

export const GqlAuthorized = createParamDecorator((data: keyof User, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    const request = ctx.getContext().req as Request;

    const user = request.user as User | undefined;

    if (!user) {
        throw new UnauthorizedException('User not authorized');
    }

    return data ? user[data] : user;
});

