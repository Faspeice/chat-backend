import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { HttpAllExceptionsFilter } from './common/filters/http-exception.filter';
import { setupSwagger } from './utils/swagger.util';
import { GqlAllExceptionsFilter } from './common/filters/gql-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpAllExceptionsFilter(), new GqlAllExceptionsFilter());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

