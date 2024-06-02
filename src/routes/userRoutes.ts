import { Layer, Effect } from "effect";
import { post } from "../utils/expressUtils";
import { createUser } from "../controllers/userControllers";

export const UserRoutesLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    yield* post("/users", createUser);
  })
);
