import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function processarImagem(
  imagemBuffer,
  textoMarca = "LOJA OFICIAL",
) {
  try {
    const nomeArquivo = `produto_${Date.now()}.jpg`;
    const caminhoSalvar = path.join(
      __dirname,
      "..",
      "public",
      nomeArquivo,
    );

    const pastaUploads = path.join(__dirname, "..", "public");
    if (!fs.existsSync(pastaUploads)) {
      fs.mkdirSync(pastaUploads, { recursive: true });
    }

    await sharp(imagemBuffer)
      .resize(800, 800, {
        fit: "inside",
        background: { r: 255, g: 255, b: 255 },
      })
      .composite([
        {
          input: await sharp({
            text: {
              text: textoMarca || "LOJA OFICIAL",
              font: "Arial",
              fontSize: 60,
              rgba: true,
              width: 800,
              height: 100,
            },
          })
            .png()
            .toBuffer(),
          top: 700,
          left: 50,
        },
      ])
      .jpeg({ quality: 90 })
      .toFile(caminhoSalvar);

    return {
      nomeArquivo,
      imagemUrl: `/uploads/${nomeArquivo}`,
      caminhoCompleto: caminhoSalvar,
    };
  } catch (error) {
    throw new Error(`Erro ao processar imagem: ${error.message}`);
  }
}
