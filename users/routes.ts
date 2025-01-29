import { Router } from "express";
import post from "./create";

const router = Router();

router.use("/", post);

export default router;
