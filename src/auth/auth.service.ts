import { Injectable,ConflictException, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterRequest } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { JwtPayload } from './interfaces/jwt.interface';
import { LoginRequest } from './dto/login.dto';
import type { Request, Response } from 'express';
import { isDev } from 'src/utils/is-dev.utils';
import { parseDurationToMs } from 'src/utils/time.utils';

@Injectable()
export class AuthService {
  private JWT_ACCESS_TOKEN_TTL
  private JWT_REFRESH_TOKEN_TTL;

  private readonly COOKIE_DOMAIN;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly ConfigService: ConfigService,
    private readonly jwtService: JwtService) {
      this.JWT_ACCESS_TOKEN_TTL = this.ConfigService.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL');
      this.JWT_REFRESH_TOKEN_TTL = this.ConfigService.getOrThrow<string>('JWT_REFRESH_TOKEN_TTL');
      this.COOKIE_DOMAIN = this.ConfigService.getOrThrow<string>('COOKIE_DOMAIN');
    }

  async register(res: Response, dto: RegisterRequest) {
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

    return  this.auth(res,user.id.toString());
  }

  async login(res: Response,dto: LoginRequest) {
    const {username, password} = dto;
    const user = await this.prismaService.user.findUnique({
        where: {
            username: dto.username,
        },
        select: {
            id: true,
            passwordHash: true,
        },
    });

    if (!user) {
        throw new NotFoundException('User not found');
    }

    const isValidPassword = await bcrypt.compare(dto.password, user.passwordHash);

    if (!isValidPassword) {
        throw new NotFoundException('User not found');
    }

    return this.auth(res,user.id.toString());
}


async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
    }
    const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);

    if(payload) {
      const userId = Number(payload.id);
  
    if (isNaN(userId)) {
    throw new BadRequestException('Invalid user ID');
    }
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
        },
      })
      if (!user) {
        throw new NotFoundException('User not found');
    }

    return this.auth(res,user.id.toString());
    }
}

async logout(res: Response) {
  this.setCookie(res, 'refreshToken', new Date(0));
  
}

async validate(id: string) {
  const userId = Number(id);
  if (isNaN(userId)) {
    throw new BadRequestException('Invalid user ID');
  }
    const user = await this.prismaService.user.findUnique({
        where: {
            id: userId,
        },
    });
    
    if (!user) {
        throw new NotFoundException('User not found');
    }
    
    return user;
}


private auth (res: Response, id: string) {
  const {accessToken, refreshToken} = this.generateTokens(id);
  const ttlMs = parseDurationToMs(this.JWT_REFRESH_TOKEN_TTL);
  this.setCookie(res, refreshToken, new Date(Date.now() + ttlMs));;
  return {accessToken};
  
}
  private generateTokens(id: string) {
    const payload: JwtPayload = { id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
        httpOnly: true,
        domain: this.COOKIE_DOMAIN,
        expires,
        secure: !isDev(this.ConfigService),
        sameSite: !isDev(this.ConfigService) ? 'none' : 'lax',
    });
}
}
