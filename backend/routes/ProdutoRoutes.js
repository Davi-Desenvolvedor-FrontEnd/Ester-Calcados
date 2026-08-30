import express from 'express'
import ProdutoController from '../controllers/ProdutoControllers.js'
import { handleUploadError, uploadSingle } from '../middlewares/UploadMiddleware.js'

const router = express.Router()

router.post("/", uploadSingle, handleUploadError, ProdutoController.create)
router.get("/", ProdutoController.getAll)
router.get("/:id", ProdutoController.getOne)
router.delete("/:id", ProdutoController.delete)
router.put("/:id", uploadSingle, handleUploadError, ProdutoController.update)

export default router