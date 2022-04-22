import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput, ReadUsersInput } from "../schema/user.schema";
import { createUser, getUsers } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
export async function getAllUserHandler(
  req: Request<ReadUsersInput['query']>,
  res: Response
) {
  try {
    const userId = req.query;
    console.log(userId.role_id);
    const users = await getUsers();
    return res.send(users);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
