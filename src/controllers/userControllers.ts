import { Request, Response } from "express";
import { Effect } from "effect";
import { UserRepository } from "../services/userService";

export const createUser = (req: Request, res: Response) =>
  Effect.gen(function* () {
    const repo = yield* UserRepository;
    const name = req.body.name;
    const user = yield* repo.createUser(name);
    res.json(user);
  });
