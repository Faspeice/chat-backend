import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GqlUser {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;
}
