import { Router } from "express";
import { type Request, type Response } from "express";
import { Prisma } from "./generated/prisma/client.ts";
import authMiddleware from "./authMiddleware.ts";

import prisma from "./prisma.ts";

const router = Router();

// GET all statuses
router.get("/", async (req: Request, res: Response) => {
  let statuses = null;

  try {
    statuses = await prisma.status.findMany();
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while fetching statuses" });
    return;
  }

  res.send(statuses);
});

// GET a single status by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  let status = null;

  try {
    status = await prisma.status.findUnique({
      where: { id: Number(id) },
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while fetching the status" });
    return;
  }

  if (!status) {
    res.status(404).send({ error: "Status not found" });
    return;
  }

  res.send(status);
});

// POST a new status
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const { name }: { name: string } = req.body;

  let createdStatus = null;

  try {
    createdStatus = await prisma.status.create({
      data: { name },
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while creating the status" });
    return;
  }
  res.send(createdStatus);
});

// PATCH (update) a status by ID
router.patch("/:id", authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name }: { name: string } = req.body;

  const data: {
    name?: string;
  } = {
    ...(name !== undefined && { name }),
  };

  let updatedStatus = null;

  try {
    updatedStatus = await prisma.status.update({
      where: { id: Number(id) },
      data: data,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(404).send({ error: "Status not found" });
        return;
      } else {
        res
          .status(500)
          .send({ error: "An error occurred while updating the status" });
        return;
      }
    } else {
      res.status(500).send({
        error: "An unexpected error occurred while updating the status",
      });
      return;
    }
  }
  res.send(updatedStatus);
});

// DELETE a status by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;

  let deletedStatus = null;

  try {
    deletedStatus = await prisma.status.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(404).send({ error: "Status not found" });
        return;
      } else {
        res
          .status(500)
          .send({ error: "An error occurred while deleting the status" });
        return;
      }
    } else {
      res.status(500).send({
        error: "An unexpected error occurred while deleting the status",
      });
      return;
    }
  }

  res.send(deletedStatus);
});

export default router;
