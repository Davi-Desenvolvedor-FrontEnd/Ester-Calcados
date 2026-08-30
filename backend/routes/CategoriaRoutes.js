import express from 'express'
import CategoriaController from '../controllers/CategoriaControllers.js'

const router = express.Router()

router.post("/", CategoriaController.create)
router.get("/:id", CategoriaController.getOne)
router.get("/", CategoriaController.getAll)
router.put("/:id", CategoriaController.update)

export default router