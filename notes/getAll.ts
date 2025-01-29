import { PrismaClient } from "@prisma/client/extension";
import type { Request, Response } from "express";
import { Router } from "express";
import { getClient } from "../prisma/client";

const router = Router();

router.get("/", async (_: Request, res: Response) => {
  let client: PrismaClient;
  try {
    client = getClient();
    const notes = await client.notes.findMany();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving notes" });
  } finally {
    client?.$disconnect();
  }
});

export default router;
