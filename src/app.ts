import { Layer } from "effect";
import { UserRoutesLive } from "./routes/userRoutes";

// Merge routes into a single layer
export const RouterLive = Layer.mergeAll(UserRoutesLive);
