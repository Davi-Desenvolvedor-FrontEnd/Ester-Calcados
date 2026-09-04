import express from "express";
import cors from "cors";
import 'dotenv/config'
import userRouter from './routes/UserRoutes.js'
import produtoRouter from './routes/ProdutoRoutes.js'
import categoriaRouter from './routes/CategoriaRoutes.js'
import avaliacaoRouter from './routes/AvaliacaoRoutes.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORTA
app.use("/users", userRouter)
app.use("/produtos", produtoRouter)
app.use("/categorias", categoriaRouter)
app.use("/avaliacoes", avaliacaoRouter)
app.use('/imagens', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});
