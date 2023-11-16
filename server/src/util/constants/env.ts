import dotenv from "dotenv";

dotenv.config();

export interface EnvVariables {
  port: number | string;
  ACCESS_TOKEN_SECRET: string;
  SESSION_SECRET: string;
  mongoConnection: string;
}
const env: EnvVariables = {
  port: process.env.PORT as string,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
  SESSION_SECRET: process.env.SESSION_SECRET as string,
  mongoConnection: process.env.MONGO_CONNECTION as string,
};

export default env;
