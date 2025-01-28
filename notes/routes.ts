import { Router } from "express";
import get from "./get";
import getAll from "./getAll";
import post from "./post";

const router = Router();

router.use("/", get);
router.use("/", getAll);
router.use("/", post);

export default router;
