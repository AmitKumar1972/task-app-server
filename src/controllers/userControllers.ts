import { Request, Response } from "express";
import { Effect } from "effect";
import { UserRepository } from "../services/userService";

export const createUser = (req: Request, res: Response) =>
  Effect.gen(function* () {
    const { name } = req.body;
    const repo = yield* UserRepository;
    const user = yield* repo.createUser(name);
    return res.json(user);
  });
