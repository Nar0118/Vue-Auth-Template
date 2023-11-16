import { Router } from "express";
import session from "express-session";
import path from "path";
import FileStore from "session-file-store";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";
import logger from "../../main";
import authenticateToken from "../../middleware/auth.middleware";
import csrfProtection from "../../middleware/csrf.middleware";
import { bruteForce } from "../../middleware/bruteForce.middleware";
import { validateUser } from "../../middleware/validation.middleware";
import { ErrorMessage } from "../../util/error/errorMessages";
import env from "../../util/constants/env";
import User, { IUser } from "../../models/user.model";

const router = Router();

type User = {
  username: string;
};

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}

const fileStoreOptions = {
  path: path.join(__dirname, "sessions"),
};

router.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to true if using HTTPS
    store: new (FileStore(session))(fileStoreOptions),
  })
);

// GET http://localhost:8080/v1/csrf-token
/**
 * @swagger
 * /v1/csrf-token:
 *   get:
 *     tags:
 *       - Authentication
 *     description: Get a CSRF token
 *     responses:
 *       200:
 *         description: CSRF token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 csrfToken:
 *                   type: string
 *                   description: The CSRF token
 *       500:
 *         description: Internal server error
 */
router.get("/csrf-token", csrfProtection, (req, res) => {
  res.status(200).json({ csrfToken: req.csrfToken() });
});

// POST http://localhost:8080/v1/signup
// add csrf-token in headers(x-csrf-token)
/**
 * @swagger
 * /v1/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Create a new user account
 *     security:
 *       - CSRFToken: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User account created successfully
 *       500:
 *         description: Internal server error
 */
router.get("/test", validateUser, async (req, res, next) => {
 return res.status(200).json('{ username, password }');

})

router.post("/signup", async (req, res, next) => {
  console.log(11111111111111111);
  const { username, password } = req.body;
  console.log(2222222222222222);

  

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      logger.warn(`Username ${username} is already taken`);
      const error = new Error(ErrorMessage.usernameTaken);
      return next(error);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user: IUser = new User({
      username,
      password: hashedPassword,
      signupTimestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
    });

    await user.save();

    logger.info(`User ${username} signed up successfully`);
    res.status(200).json({ message: "Sign up successful" });
  } catch (err) {
    console.log(6666666666666666666);
    
    // logger.warn(`Failed sign up attempt for user ${username}`);

    // const error = new Error(ErrorMessage.internalError);
    // next(error);
  }
});

// POST http://localhost:8080/v1/signin
/**
 * @swagger
 * /v1/signin:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Sign in as an existing user
 *     security:
 *       - CSRFToken: []
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/signin", bruteForce.prevent, async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ username: username });

    if (!user) {
      logger.warn(`Cannot find user with username ${username}`);

      const error = new Error(ErrorMessage.userNotFound);
      return next(error);
    }

    if (await bcrypt.compare(password, user.password)) {
      const roles = ["user"];
      const accessToken = jwt.sign(
        { username: user.username, roles },
        env.ACCESS_TOKEN_SECRET
      );
      res.cookie("token", accessToken, {
        httpOnly: true,
        sameSite: "strict",
      });

      if (!req.session.user) req.session.user = { username };

      logger.info(`User ${username} signed in successfully`);
      res.status(200).json({ message: "Success" });
    } else {
      logger.warn(`Invalid password for user ${username}`);

      const error = new Error(ErrorMessage.wrongCredentials);
      next(error);
    }
  } catch (err) {
    const error = new Error(ErrorMessage.internalError);
    next(error);
  }
});

// Protected route using JWT authentication and authorization
// GET http://localhost:8080/v1/profile
/**
 * @swagger
 * /v1/profile:
 *   get:
 *     tags:
 *       - Authentication
 *     description: Get user's protected profile data
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: User's protected profile data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: The username of the authenticated user
 *                 message:
 *                   type: string
 *                   description: A success message
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       403:
 *         description: Forbidden, user is not authorized
 *       500:
 *         description: Internal server error
 */
router.get("/profile", authenticateToken, (req, res) => {
  if (req.session.user) {
    const { username } = req.session.user;
    logger.info(`Accessed protected profile data for user ${username}`);
    res
      .status(200)
      .json({ username: username, message: "Protected profile data" });
  }
});

// POST http://localhost:8080/v1/signout
/**
 * @swagger
 * /v1/signout:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Sign out the user
 *     responses:
 *       200:
 *         description: User signed out successfully
 */
router.post("/signout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "strict",
  });

  req.session.destroy(function () {
    logger.info("Destroyed session");
  });

  logger.info("User signed out");
  res.status(200).json({ message: "Sign out successful" });
});

export default router;
