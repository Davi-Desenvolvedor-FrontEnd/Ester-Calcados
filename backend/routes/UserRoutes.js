import express from "express";
import UserController from "../controllers/UserControllers.js";

const router = express.Router();

router.delete("/:id", UserController.delete);

// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const userFound = users.find((u) => u.id == Number(id));

//   res.status(200).json({
//     message: "Usuario encontrado",
//     userFound,
//   });
// });

router.post("/login", UserController.login)
router.post("/", UserController.create);
router.get("/", UserController.getAll);

export default router;
