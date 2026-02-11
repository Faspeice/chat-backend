import { Controller } from '@nestjs/common';
import { ReadService } from './read.service';

@Controller('read')
export class ReadController {
  constructor(private readonly readService: ReadService) {}
}
