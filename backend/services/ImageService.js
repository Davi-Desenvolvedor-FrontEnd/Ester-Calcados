import sharp from "sharp";

export async function processarImagem(imagemBuffer) {
  try {
    const nomeArquivo = `produto_${Date.now()}.jpg`;

    const imagemProcessada = await sharp(imagemBuffer)
      .resize(800, 800, {
        fit: "cover",
        position: "center",
      })
      .jpeg({ quality: 90 })
      .toBuffer();

    return {
      nomeArquivo,
      imagemBuffer: imagemProcessada,
      imagemUrl: `/imagens/${nomeArquivo}`,
    };
  } catch (error) {
    throw new Error(`Erro ao processar imagem: ${error.message}`);
  }
}