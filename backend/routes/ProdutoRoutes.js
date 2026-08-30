import express from 'express'
import ProdutoController from '../controllers/ProdutoControllers.js'
import { handleUploadError, uploadSingle } from '../middlewares/UploadMiddleware.js'
import auth from '../middlewares/Auth.js'
import admin from '../middlewares/Admin.js'

const router = express.Router()

router.post("/", auth, admin, uploadSingle, handleUploadError, ProdutoController.create)
router.get("/", ProdutoController.getAll)
router.get("/:id", ProdutoController.getOne)
router.delete("/:id", auth, admin, ProdutoController.delete)
router.put("/:id", auth, admin, uploadSingle, handleUploadError, ProdutoController.update)

export default router