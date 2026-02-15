import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserResolver],
  exports: [UserRepository],
})
export class UserModule {}

