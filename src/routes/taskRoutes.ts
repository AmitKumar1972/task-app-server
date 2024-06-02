import { Layer, Effect } from "effect";
import { post, get, put, del } from "../utils/expressUtils";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

export const TaskRoutesLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    yield* post("/users/:user_id/tasks", createTask);
    yield* get("/users/:user_id/tasks", getTasks);
    yield* get("/users/:user_id/tasks/:task_id", getTask);
    yield* put("/users/:user_id/tasks/:task_id", updateTask);
    yield* del("/users/:user_id/tasks/:task_id", deleteTask);
  })
);
