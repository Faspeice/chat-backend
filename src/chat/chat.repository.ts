import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ChatRepository {
    constructor(private readonly prismaService: PrismaService) { }
    async findPrivateChatByUserIds(userId1: number, userId2: number) {
        return this.prismaService.chat.findFirst({
            where: {
                members: {
                    every: {
                        userId: { in: [userId1, userId2] }
                    },
                    none: {
                        userId: { notIn: [userId1, userId2] }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                            }
                        }
                    }
                }
            }
        });
    }
    async createChatWithMembers(userIds: number[]) {
        return this.prismaService.chat.create({
            data: {
                members: {
                    createMany: {
                        data: userIds.map(userId => ({ userId }))
                    }
                }
            },
            include: {
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                            }
                        }
                    }
                }
            }
        });
    }
}