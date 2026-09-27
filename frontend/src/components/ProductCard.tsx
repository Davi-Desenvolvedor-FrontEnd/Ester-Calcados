import { FaStar, FaRegStar, FaHeart, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { Produto } from "../types";

interface ProdutoCardProps {
  produto: Produto;
}

export default function ProductCard({ produto }: ProdutoCardProps) {
  const navigate = useNavigate();

  const precoBase = Number(produto.preco) || 0;
  const desconto = Number(produto.desconto) || 0;
  const precoComDesconto =
    desconto > 0 ? precoBase * (1 - desconto / 100) : precoBase;

  const avaliacaoMedia = produto.avaliacao_media ?? 0;
  const avaliacaoTotal = produto.avaliacao_total ?? 0;

  const renderStars = (ratingValue: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const isFilled = i + 1 <= Math.round(ratingValue);
      return isFilled ? (
        <FaStar key={i} className="text-[#e56b92] text-[14px]" />
      ) : (
        <FaRegStar key={i} className="text-gray-700 text-[14px]" />
      );
    });
  };

  return (
    <div
      className="produto-card flex flex-col justify-between relative border border-gray-100 font-['Poppins',sans-serif] overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer rounded-xl bg-white"
      onClick={() => navigate(`/product/${produto.id}`)}
    >
      <div className="w-full aspect-square relative mb-4">
        <button
          type="button"
          aria-label="Adicionar aos favoritos"
          onClick={(e) => {
            e.stopPropagation();
            // Lógica de favoritar aqui
          }}
          className="absolute top-0 right-0 w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-300 hover:text-[#8b46cd] hover:border-[#8b46cd] transition-all shadow-sm z-10"
        >
          <FaHeart className="text-[14px]" />
        </button>
        <img
          src={`http://localhost:3000/imagens/${produto.imagem_url}`}
          alt={produto.nome}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-col grow px-4 py-2">
        <h3 className="text-[20px] font-medium text-gray-700 line-clamp-2 mb-2 leading-tight">
          {produto.nome}
        </h3>

        <div className="flex items-center gap-1.5 mb-3">
          {avaliacaoTotal > 0 ? (
            <>
              <div className="flex gap-0.5 text-[#8b46cd] text-[12px]">
                {renderStars(avaliacaoMedia)}
              </div>
              <p className="text-[12px] text-gray-700 font-medium">
                ({avaliacaoTotal})
              </p>
            </>
          ) : (
            <p className="text-[12px] text-gray-700">Sem avaliações</p>
          )}
        </div>

        <div className="mt-auto mb-4">
          {desconto > 0 ? (
            <div className="flex flex-col">
              <span className="text-[13px] text-gray-700 line-through">
                R$ {precoBase.toFixed(2).replace(".", ",")}
              </span>
              <span className="text-[22px] font-bold text-plum-700 leading-none mt-1">
                R$ {precoComDesconto.toFixed(2).replace(".", ",")}
              </span>
            </div>
          ) : (
            <span className="text-[22px] font-bold text-plum-700 leading-none">
              R$ {precoBase.toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            // Lógica de compra / redirecionamento WhatsApp
          }}
          className="w-full h-9 bg-plum-700 hover:bg-[#7a3bb8] active:bg-[#6931a2] text-white font-medium text-[20px] rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          <FaWhatsapp className="text-[20px]" />
          <span>Comprar</span>
        </button>
      </div>
    </div>
  );
}