import express from "express";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import methodOverride from "method-override";
import * as bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { initializeSocketIO } from "./sockets/socket";
import morgan from "morgan";
import winston from "winston";
import helmet from "helmet";
import csurf from "csurf";
import compression from "compression";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swaggerConfig";
import { apiV1 } from "./api";
import env from "./util/constants/env";
import errorHandlerMiddleware from "./middleware/errorHandler.middleware";

const app = express();
const port = env.port;

mongoose
  .connect(env.mongoConnection)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

app.use(methodOverride("_method"));

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

app.use(helmet());

app.use(morgan("combined"));

app.use(cookieParser());

app.use(csurf({ cookie: true }));

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use(apiLimiter);

app.use(
  compression({
    level: 6,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

app.use(errorHandlerMiddleware);

const server = http.createServer(app);

initializeSocketIO(server);

apiV1(app);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



server.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

export default logger;
