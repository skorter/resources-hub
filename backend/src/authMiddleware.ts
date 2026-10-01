import { type Request, type Response, type NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const isAdmin = req.session.isAdmin;
  if (!isAdmin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export default authMiddleware;
