import { Module } from '@nestjs/common';
import { ReadService } from './read.service';
import { ReadController } from './read.controller';
import { ReadRepository } from './read.repository';

@Module({
  controllers: [ReadController],
  providers: [ReadService, ReadRepository],
})
export class ReadModule {}
