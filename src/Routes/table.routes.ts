import { Router } from "express";
import { Request, Response } from "express";
import { getAllTables, getTableStatus } from "../services/table.service";
import { table } from "console";
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

router.get("/tablestatus?tableID", (req: Request, res: Response) => {
  const tableID: string = req.query.tableID as unknown as string;
  if (tableID === undefined) {
    res.status(400).json({ message: "Table ID not provided" });
    return;
  }
  getTableStatus(parseInt(tableID))
    .then((table) => {
      res.json(table);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post("/bookTable", (req: Request, res: Response) => {
  const tableID: String = req.body.tableID;
});

export default router;
