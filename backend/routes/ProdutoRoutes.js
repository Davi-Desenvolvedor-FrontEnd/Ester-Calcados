import express from 'express'
import ProdutoController from '../controllers/ProdutoControllers.js'
import { handleUploadError, uploadSingle } from '../middlewares/UploadMiddleware.js'

const router = express.Router()

router.post("/",uploadSingle, handleUploadError, ProdutoController.create)

export default router