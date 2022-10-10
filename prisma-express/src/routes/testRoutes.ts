import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello world with Typescript." });
});

export default router;
