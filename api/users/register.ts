import bcrypt from "bcryptjs";
import { Request, Response, Router } from "express";
import { getClient } from "../prisma/client";

const router = Router();
const client = getClient();
const pepper = process.env["PEPPER"];

// Define the password complexity regex
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

router.post("/register", async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;
  // check if user already exists
  const user = await client.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    res.status(400).send("User already exists");
    return;
  }
  // Check if password meets complexity requirements
  if (!passwordRegex.test(password)) {
    res
      .status(400)
      .send(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character"
      );
    return;
  }
  // hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password + pepper, salt);

  // create user
  const newUser = await client.user.create({
    data: {
      email,
      password: hashedPassword,
      userDetails: {
        create: {
          firstName,
          lastName,
        },
      },
    },
  });

  res.status(201).json(newUser);
});

export default router;

