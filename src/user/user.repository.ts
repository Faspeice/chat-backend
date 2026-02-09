import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  
  async searchUsersByUsername(query: string, currentUserId: number) {
  return this.prismaService.user.findMany({
    where: {
      username: {
        contains: query,
        mode: 'insensitive'
      },
      NOT: {
        id: currentUserId 
      }
    },
    take: 20 
  });
}
}