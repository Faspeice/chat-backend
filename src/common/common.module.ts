import { Module } from '@nestjs/common';
import { HttpAllExceptionsFilter } from './filters/http-exception.filter';
import { GqlAllExceptionsFilter } from './filters/gql-exception.filter';

@Module({
  exports: [HttpAllExceptionsFilter, GqlAllExceptionsFilter],
})
export class CommonModule {}
