import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function processarImagem(
  imagemBuffer,
  desconto,
  nomeProduto,
) {
  try {
    const nomeArquivo = `produto_${Date.now()}.jpg`;

    const pastaPublic = path.join(__dirname, "..", "public");
    const caminhoSalvar = path.join(pastaPublic, nomeArquivo);

    if (!fs.existsSync(pastaPublic)) {
      fs.mkdirSync(pastaPublic, { recursive: true });
    }

    const largura = 800;
    const altura = 800;
    const corDestaque = "#9E005D";
    const white = "#fff"; 

    const svgOverlay = `
      <svg width="${largura}" height="${altura}" xmlns="http://www.w3.org/2000/svg">
        
        <defs>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Betania+Patmos&;family=Dancing+Script:wght@400..700&;family=Great+Vibes&;display=swap')
            
          </style>
        </defs>

        <rect x="6" y="6" width="788" height="788" fill="none" stroke="${corDestaque}" stroke-width="12"/>
        
        <rect x="20" y="20" width="120" height="90" rx="8" fill="rgba(0, 0, 0, 0.45)"/>

        <g transform="translate(30, 32)">
          <circle cx="50" cy="15" r="9" fill="${white}"/>
          <circle cx="40" cy="26" r="9" fill="${white}"/>
          <circle cx="60" cy="26" r="9" fill="${white}"/>
          
          <text x="50" y="65" font-family="'Times New Roman', Georgia, serif" font-size="28" fill="${white}" font-weight="bold" text-anchor="middle">ESTILO</text>
          <text x="50" y="80" font-family="Arial, sans-serif" font-size="16" fill="${white}" letter-spacing="2" text-anchor="middle" font-weight="bold">BRASILEIRO</text>
        </g>

        <g transform="translate(680, 120) rotate(45)">
          <rect x="-200" y="-45" width="400" height="90" fill="${corDestaque}"/>
          
          <text x="0" y="15" font-family="cursive" font-size="60" fill="${white}" font-weight="normal" text-anchor="middle">${desconto + "% OFF"}</text>
        </g>

        <text x="30" y="750" font-family="serif" font-size="40" fill="${corDestaque}" font-weight="bold" text-anchor="start">${nomeProduto}</text>
        
      </svg>
    `;

    await sharp(imagemBuffer)
      .resize(largura, altura, {
        fit: "cover",
        position: "center",
      })
      .composite([
        {
          input: Buffer.from(svgOverlay),
          top: 0,
          left: 0,
        },
      ])
      .jpeg({ quality: 90 })
      .toFile(caminhoSalvar);

    return {
      nomeArquivo,
      imagemUrl: `/${nomeArquivo}`, 
      caminhoCompleto: caminhoSalvar,
    };
  } catch (error) {
    throw new Error(`Erro ao processar imagem: ${error.message}`);
  }
}