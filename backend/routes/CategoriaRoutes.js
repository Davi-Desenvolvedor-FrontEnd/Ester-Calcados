import express from 'express'
import CategoriaController from '../controllers/CategoriaControllers.js'

const router = express.Router()

router.post("/", CategoriaController.create)

export default router