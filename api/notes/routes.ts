import { Router } from "express";
import post from "./create";
import get from "./get";
import getAll from "./getAll";

const router = Router();

router.use("/", get);
router.use("/", getAll);
router.use("/", post);

export default router;
