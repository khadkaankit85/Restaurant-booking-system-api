import { Router } from "express";
import { Request, Response } from "express";
import { getAllTables } from "../services/table.service";
const router = Router();

router.get("/getTables", (req: Request, res: Response) => {
  getAllTables()
    .then((tables) => {
      res.json(tables);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

export default router;
