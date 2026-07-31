import { Router } from "express";
import { type Request, type Response } from "express";
import { Prisma } from "./generated/prisma/client.ts";
import authMiddleware from "./authMiddleware.ts";

import prisma from "./prisma.ts";

const router = Router();

// GET all tags
router.get("/", async (req: Request, res: Response) => {
  let tags = null;

  try {
    tags = await prisma.tag.findMany();
  } catch (error) {
    res.status(500).send({ error: "An error occurred while fetching tags" });
    return;
  }

  res.send(tags);
});

// GET a single tag by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  let tag = null;

  try {
    tag = await prisma.tag.findUnique({
      where: { id: Number(id) },
    });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while fetching the tag" });
    return;
  }

  if (!tag) {
    res.status(404).send({ error: "Tag not found" });
    return;
  }

  res.send(tag);
});

// POST a new tag
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const { name }: { name: string } = req.body;

  let createdTag = null;

  try {
    createdTag = await prisma.tag.create({
      data: { name },
    });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while creating the tag" });
    return;
  }
  res.send(createdTag);
});

// PATCH (update) a tag by ID
router.patch("/:id", authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name }: { name: string } = req.body;

  const data: {
    name?: string;
  } = {
    ...(name !== undefined && { name }),
  };

  let updatedTag = null;

  try {
    updatedTag = await prisma.tag.update({
      where: { id: Number(id) },
      data: data,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(404).send({ error: "Tag not found" });
        return;
      } else {
        res
          .status(500)
          .send({ error: "An error occurred while updating the tag" });
        return;
      }
    } else {
      res.status(500).send({
        error: "An unexpected error occurred while updating the tag",
      });
      return;
    }
  }
  res.send(updatedTag);
});

// DELETE a tag by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;

  let deletedTag = null;

  try {
    deletedTag = await prisma.tag.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(404).send({ error: "Tag not found" });
        return;
      } else {
        res
          .status(500)
          .send({ error: "An error occurred while deleting the tag" });
        return;
      }
    } else {
      res.status(500).send({
        error: "An unexpected error occurred while deleting the tag",
      });
      return;
    }
  }

  res.send(deletedTag);
});

export default router;
