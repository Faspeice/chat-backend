import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserResponse } from './dto/user-response.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }
    async findUsersByUsername(username: string, currentUserId: number) {
        const users = await this.userRepository.searchUsersByUsername(username, currentUserId);

        return users.map(user => new UserResponse(user.id, user.username));
    }
}

