// Swagger definition
/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The note ID
 *         content:
 *           type: string
 *           description: The content of the note
 *       example:
 *         id: "11111111-1111-1111-1111-111111111111"
 *         content: "This is a note"
 */

export interface Note {
  Id: string;
  Text: string;
}

