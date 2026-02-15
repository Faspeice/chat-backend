import { Resolver, Query, Args} from '@nestjs/graphql';
import { MessageService } from './message.service';
import { PolledMessageDto } from './dto/polled-message.dto';
import { GqlAuthorization } from 'src/auth/decorators/gql-authorization.decorator';
import { GqlAuthorized } from 'src/auth/decorators/gql-authorized.decorator';
import { PollMessagesQueryDto } from './dto/poll-messages-query.dto';

@Resolver()
export class PollMessageResolver {
    constructor(private readonly messageService: MessageService) { }

    @Query(() => [PolledMessageDto])
    @GqlAuthorization()
    async pollMessages(
        @GqlAuthorized('id') currentUserId: number,
        @Args('data') input: PollMessagesQueryDto,
    ) {
        const timeout = Number(input.timeout);
        const lastMessageId = input.lastMessageId ? Number(input.lastMessageId) : undefined;

        return this.messageService.pollMessages(currentUserId, timeout, lastMessageId);
    }
}