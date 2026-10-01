import { Router } from "express";
import { type Request, type Response } from "express";
import bcrypt from "bcryptjs";

const router = Router();

declare module "express-session" {
  interface SessionData {
    isAdmin: boolean;
  }
}

// POST login route
router.post("/login", async (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string } =
    req.body;

  let isMatch = false;
  try {
    isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH!);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while verifying password" });
    return;
  }

  if (username === process.env.ADMIN_USERNAME && isMatch) {
    req.session.isAdmin = true;
    res.send({ message: "Login successful" });
  } else {
    res.status(401).send({ error: "Invalid username or password" });
  }
});

// POST logout route
router.post("/logout", async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send({ error: "An error occurred while logging out" });
      return;
    } else {
      res.clearCookie("connect.sid");
      res.send({ message: "Logout successful" });
    }
  });
});

// GET session route
router.get("/session", async (req: Request, res: Response) => {
  res.send({ isAdmin: req.session.isAdmin });
  console.log("Session data:", req.session);
});

export default router;
