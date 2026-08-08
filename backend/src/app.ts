import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL!, credentials: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  }),
);

// HEALTH CHECK
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use((req: Request, res: Response, next) => {
  console.log("Session data:", req.session);
  next();
});

// RESOURCES
import resourceRoutes from "./resourceRoutes.ts";
app.use("/resources", resourceRoutes);

import categoryRoutes from "./categoryRoutes.ts";
app.use("/categories", categoryRoutes);

// STATUSES
import statusRoutes from "./statusRoutes.ts";
app.use("/statuses", statusRoutes);

// AUTH
import authRoutes from "./authRoutes.ts";
app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT!}`);
});
