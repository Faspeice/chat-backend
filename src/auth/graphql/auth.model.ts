import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GqlAuth {
  @Field(() => String)
  accessToken: string;
}
@InputType()
export class GqlLoginInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class GqlRegisterInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
