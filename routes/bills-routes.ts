import { Router } from "express";
import {
  createBill,
  getBillByName,
  getBills,
  getBillByEmail,
} from "../controllers/bills-controllers";

const router = Router();

router.post("/", createBill);

router.get("/get-bill-by-name", getBillByName);

router.get("/get-bills", getBills);

router.get("/get-bill-by-email/:email", getBillByEmail);

export default router;

// ferperezvl@gmail.com
