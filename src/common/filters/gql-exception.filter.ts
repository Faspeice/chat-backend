import { Catch, ArgumentsHost} from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';

@Catch()
export class GqlAllExceptionsFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(GqlAllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const contextType = host.getType(); 
    
    this.logger.error(
      `GraphQL Exception: ${exception instanceof Error ? exception.message : 'Unknown error'}`,
      exception instanceof Error ? exception.stack : undefined
    );

    return exception;
  }
}