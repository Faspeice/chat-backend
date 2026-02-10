import { Module } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/http-exception.filter';

@Module({
  exports: [AllExceptionsFilter],
})
export class CommonModule {}
