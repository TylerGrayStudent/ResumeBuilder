// filepath: /home/tyler/Documents/programming/bunExpress/routes/notes/get.ts
import { PrismaClient } from "@prisma/client/extension";
import type { Request, Response } from "express";
import { Router } from "express";
import { getClient } from "../prisma/client";

const router = Router();

// Swagger definition
/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get all notes
 *     responses:
 *       200:
 *         description: The notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       500:
 *         description: Error retrieving notes
 */
router.get("/", async (_: Request, res: Response) => {
  let client: PrismaClient;
  try {
    client = await getClient();
    const notes = await client.notes.findMany();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving notes" });
  } finally {
    client?.$disconnect();
  }
});

export default router;

