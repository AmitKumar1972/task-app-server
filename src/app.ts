import { Layer } from "effect";
import { UserRoutesLive } from "./routes/userRoutes";
import { TaskRoutesLive } from "./routes/taskRoutes";

// Merge routes into a single layer
export const RouterLive = Layer.mergeAll(UserRoutesLive, TaskRoutesLive);
