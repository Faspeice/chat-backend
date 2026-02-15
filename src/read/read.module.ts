import { Module } from '@nestjs/common';
import { ReadService } from './read.service';
import { ReadController } from './read.controller';
import { ReadRepository } from './read.repository';
import { ReadResolver } from './read.resolver';

@Module({
  controllers: [ReadController],
  providers: [ReadService, ReadRepository,ReadResolver],
})
export class ReadModule {}
