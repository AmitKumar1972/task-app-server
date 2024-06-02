import { Context, Effect, Layer } from "effect";

// Domain
interface Task {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly dueDate: string;
  readonly status: "To Do" | "In Progress" | "Done";
}

// In-memory Database
const tasks = new Map<number, Map<number, Task>>();

// Define the repository as a service
export class TaskRepository extends Context.Tag("TaskRepository")<
  TaskRepository,
  {
    readonly createTask: (
      userId: number,
      title: string,
      description: string,
      dueDate: string,
      status: "To Do" | "In Progress" | "Done"
    ) => Effect.Effect<Task>;
    readonly getTasks: (userId: number) => Effect.Effect<Array<Task>>;
    readonly getTask: (
      userId: number,
      taskId: number
    ) => Effect.Effect<Task | null>;
    readonly updateTask: (
      userId: number,
      taskId: number,
      title: string,
      description: string,
      dueDate: string,
      status: "To Do" | "In Progress" | "Done"
    ) => Effect.Effect<Task | null>;
    readonly deleteTask: (
      userId: number,
      taskId: number
    ) => Effect.Effect<void>;
  }
>() {}

// Repositories Implementation
export const TaskRepositoryLive = Layer.succeed(TaskRepository, {
  createTask: (userId, title, description, dueDate, status) =>
    Effect.sync(() => {
      const userTasks = tasks.get(userId) || new Map<number, Task>();
      const id = userTasks.size + 1;
      const task: Task = { id, title, description, dueDate, status };
      userTasks.set(id, task);
      tasks.set(userId, userTasks);
      return task;
    }),
  getTasks: (userId) =>
    Effect.sync(() => {
      const userTasks = tasks.get(userId) || new Map<number, Task>();
      return Array.from(userTasks.values());
    }),
  getTask: (userId, taskId) =>
    Effect.sync(() => {
      const userTasks = tasks.get(userId) || new Map<number, Task>();
      return userTasks.get(taskId) || null;
    }),
  updateTask: (userId, taskId, title, description, dueDate, status) =>
    Effect.sync(() => {
      const userTasks = tasks.get(userId) || new Map<number, Task>();
      const task = userTasks.get(taskId);
      if (task) {
        const updatedTask: Task = {
          ...task,
          title,
          description,
          dueDate,
          status,
        };
        userTasks.set(taskId, updatedTask);
        tasks.set(userId, userTasks);
        return updatedTask;
      }
      return null;
    }),
  deleteTask: (userId, taskId) =>
    Effect.sync(() => {
      const userTasks = tasks.get(userId);
      if (userTasks) {
        userTasks.delete(taskId);
        if (userTasks.size === 0) {
          tasks.delete(userId);
        } else {
          tasks.set(userId, userTasks);
        }
      }
    }),
});
