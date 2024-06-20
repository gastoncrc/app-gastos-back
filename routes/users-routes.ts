import { Router } from "express";
import {
  createUser,
  getUsers,
  getUser,
  getUserbyId,
} from "../controllers/users-controllers";

const router = Router();

router.post("/", createUser);

router.get("/get-users", getUsers);

router.get("/get-user", getUser);

router.get("/:id", getUserbyId);

export default router;
