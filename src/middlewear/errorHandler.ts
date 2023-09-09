import { NextFunction, Request, Response } from "express";
import { logEvents } from "./logEvents.ts";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logEvents(`${err.name}: ${err.message}`, "errLog.txt")
  console.log(err.stack)
  res.status(500).send(err.message)
}