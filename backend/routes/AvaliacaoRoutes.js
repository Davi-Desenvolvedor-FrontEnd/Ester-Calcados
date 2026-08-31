import express from 'express'
import auth from '../middlewares/Auth.js'
import AvaliacaoController from '../controllers/AvaliacaoControllers.js'

const router = express.Router()

router.post("/", auth, AvaliacaoController.create)
router.get("/:id", AvaliacaoController.getAll)

export default router