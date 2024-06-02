import { Context, Effect, Layer } from "effect";

interface User {
  readonly id: number;
  readonly name: string;
}

// In-memory Database
const users = new Map<number, User>();

// Define the repository as a service
export class UserRepository extends Context.Tag("UserRepository")<
  UserRepository,
  {
    readonly createUser: (name: string) => Effect.Effect<User>;
    readonly getUser: (id: number) => Effect.Effect<User | null>;
  }
>() {}

// Repositories Implementation
export const UserRepositoryLive = Layer.succeed(UserRepository, {
  createUser: (name) =>
    Effect.sync(() => {
      const id = users.size + 1;
      const user = { id, name };
      users.set(id, user);
      return user;
    }),
  getUser: (id) =>
    Effect.sync(() => {
      return users.get(id) || null;
    }),
});
