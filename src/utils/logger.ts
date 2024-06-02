import { Effect, Console } from "effect";

export const log = (message: string): Effect.Effect<void, never, never> =>
  Effect.sync(() => {
    Console.log(message);
  });

export const logError = (error: any): Effect.Effect<void, never, never> =>
  Effect.sync(() => {
    Console.error("Error:", error);
  });
