import { Response, Request, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHanler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({
      errors: err.serializeError(),
    });
  }
  console.log(err);
  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};
