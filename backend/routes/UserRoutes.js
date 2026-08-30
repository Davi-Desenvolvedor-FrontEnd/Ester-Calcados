import express from "express";
import UserController from "../controllers/UserControllers.js";
import AuthController from "../controllers/AuthControllers.js";
import auth from "../middlewares/Auth.js";

const router = express.Router();

router.post("/login", AuthController.login)
router.post("/", UserController.create);
router.get("/:id", auth, UserController.getOne);
router.put("/", auth, UserController.update);

export default router;