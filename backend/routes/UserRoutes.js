import express from "express";
import UserController from "../controllers/UserControllers.js";

const router = express.Router();

router.post("/login", UserController.login)
router.post("/", UserController.create);
router.get("/:id", UserController.getOne);
router.put("/", UserController.update);
router.delete("/:id", UserController.delete);

export default router;