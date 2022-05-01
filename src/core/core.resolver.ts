import { Query, Resolver } from '@nestjs/graphql';

@Resolver(() => String)
export class CoreResolver {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // Used in e2e tests of components without a defined query - https://stackoverflow.com/questions/64105940/graphqlerror-query-root-type-must-be-provided
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
