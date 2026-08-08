import { Router } from "express";
import { type Request, type Response } from "express";
import { Prisma } from "./generated/prisma/client.ts";
import authMiddleware from "./authMiddleware.ts";

import prisma from "./prisma.ts";

const router = Router();

// GET all categories
router.get("/", async (req: Request, res: Response) => {
  let categories = null;

  try {
    categories = await prisma.category.findMany();
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while fetching categories" });
    return;
  }

  res.send(categories);
});

// GET a single category by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  let category = null;

  try {
    category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while fetching the category" });
    return;
  }

  if (!category) {
    res.status(404).send({ error: "Category not found" });
    return;
  }

  res.send(category);
});

// POST a new category
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const { name }: { name: string } = req.body;

  let createdCategory = null;

  try {
    createdCategory = await prisma.category.create({
      data: { name },
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while creating the category" });
    return;
  }

  res.send(createdCategory);
});

// PATCH (update) a category by ID
router.patch("/:id", authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name }: { name: string } = req.body;

  const data: {
    name?: string;
  } = {
    ...(name !== undefined && { name }),
  };

  let updatedCategory = null;

  try {
    updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: data,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(404).send({ error: "Category not found" });
        return;
      } else {
        res
          .status(500)
          .send({ error: "An error occurred while updating the category" });
        return;
      }
    } else {
      res.status(500).send({
        error: "An unexpected error occurred while updating the category",
      });
      return;
    }
  }

  res.send(updatedCategory);
});

// DELETE a category by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;

  let deletedCategory = null;

  try {
    const resourcesInCategory = await prisma.resource.count({
      where: { categories: { some: { id: Number(id) } } },
    });

    if (resourcesInCategory > 0) {
      res.status(400).send({
        error: "Cannot delete category with associated resources",
      });
      return;
    }

    deletedCategory = await prisma.category.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(404).send({ error: "Category not found" });
        return;
      } else {
        res
          .status(500)
          .send({ error: "An error occurred while deleting the category" });
        return;
      }
    } else {
      res.status(500).send({
        error: "An unexpected error occurred while deleting the category",
      });
      return;
    }
  }

  res.send(deletedCategory);
});

export default router;
