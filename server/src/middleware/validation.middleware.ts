import { Request, Response, NextFunction } from "express";
import { userSchema } from "../api/user/validation";
import logger from "../main";
import { ErrorMessage } from "../util/error/errorMessages";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(555555555, req.body);
  
  const { error } = userSchema.validate(req.body);

  if (error) {
    logger.error({ error: error.details[0].message });
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
