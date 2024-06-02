import { Layer, Effect } from "effect";
import { Express, ServerLive, ExpressLive } from "./utils/expressUtils";
import { UserRepositoryLive } from "./services/userService";
import { RouterLive } from "./app";

// Combine all layers to create the final application layer
const AppLive = ServerLive.pipe(
  Layer.provide(RouterLive),
  Layer.provide(ExpressLive)
);

// Launch the application
const main = AppLive.pipe(Layer.provide(UserRepositoryLive));
Effect.runFork(Layer.launch(main));
