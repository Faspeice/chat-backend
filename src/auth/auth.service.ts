import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterRequest } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(dto: RegisterRequest) {
    const { username, password } = dto;

    const existingUser = await this.prismaService.user.findUnique({
      where: { username: username },
    });

    if (existingUser) {
      throw new ConflictException('User with this username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        username,
        passwordHash: hashedPassword,
      },
    });

    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }
}
