import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { ReadModule } from './read/read.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, ChatModule, ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
}), ChatModule, MessageModule, ReadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
