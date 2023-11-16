import { Express } from "express";
import user from "./user/user.api";

export const apiV1 = (app: Express): void => {
  app.use("/v1", user);
};
