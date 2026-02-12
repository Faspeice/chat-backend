import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';
import type { Request, Response } from 'express';
import { Authorization } from './decorators/authorization.decorator';
import { Authorized } from './decorators/authorized.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({
    description: 'User registered successfully. Returns an access token and sets a refresh token cookie.',
    schema: {
      type: 'object',
      properties: { accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' } },
    },
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Res({passthrough: true}) res: Response,@Body() dto: RegisterRequest) {
    return await this.authService.register(res,dto);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({
    description: 'Logged in successfully. Returns an access token and sets a refresh token cookie.',
    schema: {
      type: 'object',
      properties: { accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' } },
    },
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Res({passthrough: true}) res: Response,@Body() dto: LoginRequest) {
    return await this.authService.login(res,dto);
}

  @ApiOperation({ summary: 'Refresh access token' })
  @ApiOkResponse({
    description: 'Access token refreshed. Requires a valid refresh token cookie.',
    schema: {
      type: 'object',
      properties: { accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' } },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid refresh token cookie.' })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request,@Res({passthrough: true}) res: Response) {
    return await this.authService.refresh(req,res);
}

  @ApiOperation({ summary: 'Logout' })
  @ApiOkResponse({ description: 'Logged out successfully. Clears the refresh token cookie.' })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({passthrough: true}) res: Response) {
    return await this.authService.logout(res);
}

  @ApiOperation({ summary: 'Get current user info (debug)' })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Returns the current user id extracted from the access token.',
    schema: {
      type: 'object',
      properties: { id: { type: 'string', example: '1' } },
    },
  })
  @Authorization()
  @Get('@me')
  @HttpCode(HttpStatus.OK)
  async me(@Authorized('id') id: string){
    return { id } 
  }
}
