import { Request, Response, Router } from "express";
import { getClient } from "../prisma/client";
import { CreateUserRequest } from "./models/requests/CreateUserRequest";
import { User } from "./models/user";

const router = Router();

router.post(
  "/",
  async (req: Request<CreateUserRequest>, res: Response<User | unknown>) => {
    try {
      const client = getClient();
      const { firstName, lastName, email, password } = req.body;

      const user = await client.users.create({
        data: {
          email,
          password,
          userDetails: {
            create: {
              firstName,
              lastName,
            },
          },
        },
      });

      res.json(user as unknown as User);
    } catch (error) {
      res.status(500).json({
        error: "Error creating user",
      });
    }
  }
);

export default router;
