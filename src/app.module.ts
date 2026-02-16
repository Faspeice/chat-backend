import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { ReadModule } from './read/read.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver} from '@nestjs/apollo';
import { getGraphQlConfig } from './config/graphql.config';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    ChatModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MessageModule,
    ReadModule,
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getGraphQlConfig,
    }),
  ],
})
export class AppModule {}
