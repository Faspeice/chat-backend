import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}
    async findUsersByUsername(username: string, currentUserId: number) {
        return await this.userRepository.searchUsersByUsername(username, currentUserId); 
}
}
