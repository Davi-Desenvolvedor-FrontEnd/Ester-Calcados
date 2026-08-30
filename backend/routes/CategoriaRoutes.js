import express from 'express'
import CategoriaController from '../controllers/CategoriaControllers.js'
import auth from '../middlewares/Auth.js'
import admin from '../middlewares/Admin.js'

const router = express.Router()

router.post("/", auth, admin, CategoriaController.create)
router.get("/:id", CategoriaController.getOne)
router.get("/", CategoriaController.getAll)
router.put("/:id", auth, admin, CategoriaController.update)

export default router