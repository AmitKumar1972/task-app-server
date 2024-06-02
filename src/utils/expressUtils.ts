import { Context, Effect, FiberSet, Layer } from "effect";
import express from "express";

// Express Utility
export class Express extends Context.Tag("Express")<
  Express,
  ReturnType<typeof express>
>() {}

export const get = <A, E, R>(
  path: string,
  body: (req: express.Request, res: express.Response) => Effect.Effect<A, E, R>
) =>
  Effect.gen(function* () {
    const app = yield* Express;
    const run = yield* FiberSet.makeRuntime<R>();
    app.get(path, (req, res) => run(body(req, res)));
  });

export const post = <A, E, R>(
  path: string,
  body: (req: express.Request, res: express.Response) => Effect.Effect<A, E, R>
) =>
  Effect.gen(function* () {
    const app = yield* Express;
    const run = yield* FiberSet.makeRuntime<R>();
    app.post(path, (req, res) => run(body(req, res)));
  });

export const put = <A, E, R>(
  path: string,
  body: (req: express.Request, res: express.Response) => Effect.Effect<A, E, R>
) =>
  Effect.gen(function* () {
    const app = yield* Express;
    const run = yield* FiberSet.makeRuntime<R>();
    app.put(path, (req, res) => run(body(req, res)));
  });

export const del = <A, E, R>(
  path: string,
  body: (req: express.Request, res: express.Response) => Effect.Effect<A, E, R>
) =>
  Effect.gen(function* () {
    const app = yield* Express;
    const run = yield* FiberSet.makeRuntime<R>();
    app.delete(path, (req, res) => run(body(req, res)));
  });

export const ServerLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const port = 3001;
    const app = yield* Express;
    yield* Effect.acquireRelease(
      Effect.sync(() =>
        app.listen(port, () =>
          console.log(`Server is listening on port ${port}`)
        )
      ),
      (server) => Effect.sync(() => server.close())
    );
  })
);

export const ExpressLive = Layer.sync(Express, () => {
  const app = express();
  app.use(express.json());
  return app;
});
