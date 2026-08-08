import { Router } from "express";
import { type Request, type Response } from "express";
import { type Type } from "./generated/prisma/enums.ts";
import { Prisma } from "./generated/prisma/client.ts";
import authMiddleware from "./authMiddleware.ts";

import prisma from "./prisma.ts";

const router = Router();

// GET all resources
router.get("/", async (req: Request, res: Response) => {
  let resources = null;

  try {
    resources = await prisma.resource.findMany({
      include: {
        categories: true,
        status: true,
      },
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while fetching resources" });
    return;
  }

  res.send(resources);
});

// GET a single resource by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  let resource = null;

  try {
    resource = await prisma.resource.findUnique({
      where: { id: Number(id) },
      include: {
        categories: true,
        status: true,
      },
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while fetching the resource" });
    return;
  }

  if (!resource) {
    res.status(404).send({ error: "Resource not found" });
    return;
  }

  res.send(resource);
});

// POST a new resource
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const {
    title,
    description,
    logo,
    type,
    url,
    categories,
    statusId,
  }: {
    title: string;
    description: string;
    logo?: string;
    type: Type;
    url: string;
    categories: number[];
    statusId?: number;
  } = req.body;

  let createdResource = null;

  try {
    createdResource = await prisma.resource.create({
      data: {
        title,
        description,
        logo,
        type,
        url,
        categories: {
          connect: categories.map((id) => ({ id })),
        },
        ...(statusId !== undefined && {
          status: { connect: { id: statusId } },
        }),
      },
      include: {
        categories: true,
        status: true,
      },
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while creating the resource" });
    return;
  }

  res.send(createdResource);
});

// PATCH (update) a resource by ID
router.patch("/:id", authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    title,
    description,
    logo,
    type,
    url,
    categories,
    statusId,
  }: {
    title?: string;
    description?: string;
    logo?: string;
    type?: Type;
    url?: string;
    categories?: number[];
    statusId?: number;
  } = req.body;

  const data: {
    title?: string;
    description?: string;
    logo?: string;
    type?: Type;
    url?: string;
    categories?: { set: { id: number }[] };
    status?: { connect: { id: number } };
  } = {
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    ...(logo !== undefined && { logo }),
    ...(type !== undefined && { type }),
    ...(url !== undefined && { url }),
    ...(categories !== undefined && {
      categories: { set: categories.map((id) => ({ id })) },
    }),
    ...(statusId !== undefined && {
      status: { connect: { id: statusId } },
    }),
  };

  let updatedResource = null;

  try {
    updatedResource = await prisma.resource.update({
      where: { id: Number(id) },
      data: data,
      include: {
        categories: true,
        status: true,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(404).send({ error: "Resource not found" });
        return;
      } else {
        res
          .status(500)
          .send({ error: "An error occurred while updating the resource" });
        return;
      }
    } else {
      res.status(500).send({
        error: "An unexpected error occurred while updating the resource",
      });
      return;
    }
  }

  res.send(updatedResource);
});

// DELETE a resource by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;

  let deletedResource = null;

  try {
    deletedResource = await prisma.resource.delete({
      where: { id: Number(id) },
      include: {
        categories: true,
        status: true,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(404).send({ error: "Resource not found" });
        return;
      } else {
        res
          .status(500)
          .send({ error: "An error occurred while deleting the resource" });
        return;
      }
    } else {
      res.status(500).send({
        error: "An unexpected error occurred while deleting the resource",
      });
      return;
    }
  }

  res.send(deletedResource);
});

export default router;
