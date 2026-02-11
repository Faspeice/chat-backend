import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ChatRepository {
    findChats(currentUserId: number) {
        return this.prismaService.chat.findMany({
            where: {
                members: {
                    some: { userId: currentUserId }
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
    constructor(private readonly prismaService: PrismaService) { }
    

    async findChatByUserIds(userIds: number[]) {
        const uniqueUserIds = [...new Set(userIds)];
        
        return this.prismaService.chat.findFirst({
            where: {
                AND: [
                    ...uniqueUserIds.map(userId => ({
                        members: {
                            some: { userId }
                        }
                    })),
                    {
                        members: {
                            none: {
                                userId: {
                                    notIn: uniqueUserIds
                                }
                            }
                        }
                    }
                ]
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
        const uniqueUserIds = [...new Set(userIds)];
        
        return this.prismaService.chat.create({
            data: {
                members: {
                    create: uniqueUserIds.map(userId => ({
                        user: {
                            connect: { id: userId }
                        }
                    }))
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