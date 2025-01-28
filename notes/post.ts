import type { PrismaClient } from "@prisma/client/extension";
import type { Request, Response } from "express";
import { Router } from "express";
import { getClient } from "../prisma/client";
import type { CreateNoteRequest } from "./models/requests/CreateNoteRequest";

const router = Router();

// Swagger definition
/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNoteRequest'
 *     responses:
 *       200:
 *         description: The note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       500:
 *         description: Error creating note
 */
router.post("/", async (req: Request<CreateNoteRequest>, res: Response) => {
  let client: PrismaClient;
  try {
    client = await getClient();
    const { content } = req.body;
    const note = await client.notes.create({
      data: {
        Text: content,
      },
    });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Error creating note" });
  } finally {
    client?.$disconnect();
  }
});

export default router;

