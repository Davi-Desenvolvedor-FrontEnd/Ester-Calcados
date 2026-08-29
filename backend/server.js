import express from "express";
import cors from "cors";
import 'dotenv/config'
import userRouter from './routes/UserRoutes.js'
import produtoRouter from './routes/ProdutoRoutes.js'
import categoriaRouter from './routes/CategoriaRoutes.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORTA
app.use("/users", userRouter)
app.use("/produtos", produtoRouter)
app.use("/categorias", categoriaRouter)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});
