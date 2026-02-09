import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { User } from "src/generated/prisma/client";

export const Authorized = createParamDecorator((data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;

     const user = request.user as User | undefined;
    
    if (!user) {
        throw new UnauthorizedException('User not authorized');
    }

    return data ? user[data] : user;
});

