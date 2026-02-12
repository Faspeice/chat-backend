import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ChatRepository {
        constructor(private readonly prismaService: PrismaService) { }
    async findChats(currentUserId: number) {
    return this.prismaService.chat.findMany({
      where: {
        members: {
          some: { userId: currentUserId },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
        messages: {
          orderBy: { sentAt: 'desc' },
          take: 1,
          select: {
            content: true,
            sentAt: true,
          },
        },
      },
    });
  }

    

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

    async getUnreadCountsForChats(
    currentUserId: number,
    chatIds: number[],
  ): Promise<Map<number, number>> {
    if (chatIds.length === 0) {
      return new Map<number, number>();
    }

    const grouped = await this.prismaService.message.groupBy({
      by: ['chatId'],
      where: {
        chatId: { in: chatIds },
        senderId: { not: currentUserId },
        reads: {
          none: {
            userId: currentUserId,
          },
        },
      },
      _count: {
        _all: true,
      },
    });

    return new Map<number, number>(
      grouped.map((item) => [item.chatId, item._count._all]),
    );
  }
}