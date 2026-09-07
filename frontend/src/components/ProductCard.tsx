import { FaStar, FaRegStar, FaHeart, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  photo: string;
  rating: number;
  nRating: number;
  price: number;
  description: string;
  estoque: number;
  destaque: boolean;
  desconto: number;
}

export default function ProductCard({
  id,
  name,
  photo,
  rating,
  nRating,
  price,
  description,
  estoque,
  destaque,
  desconto,
}: ProductCardProps) {
  const navigate = useNavigate();
  const precoComDesconto = desconto > 0 ? price * (1 - desconto / 100) : price;

  // Renderização das estrelas no tom do design (#e56b92 / rosa-roxo)
  const renderStars = (ratingValue: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const isFilled = i + 1 <= Math.round(ratingValue);
      return isFilled ? (
        <FaStar key={i} className="text-[#e56b92] text-[14px]" />
      ) : (
        <FaRegStar key={i} className="text-gray-400 text-[14px]" />
      );
    });
  };

  return (
    <div
      className="produto-card flex-1 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between relative border border-gray-100 font-['Poppins',sans-serif] p-4"
      onClick={() => navigate(`/product/${id}`)}
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
          src={photo}
          alt={name}
          className="relative h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-col grow">
        <h3 className="text-[15px] font-medium text-gray-700 line-clamp-2 mb-2 leading-tight">
          {name}
        </h3>

        <div className="flex items-center gap-1.5 mb-3">
          {nRating > 0 ? (
            <>
              <div className="flex gap-0.5 text-[#8b46cd] text-[12px]">
                {renderStars(rating)}
              </div>
              <p className="text-[12px] text-gray-400 font-medium">
                ({nRating})
              </p>
            </>
          ) : (
            <p className="text-[12px] text-gray-400">Sem avaliações</p>
          )}
        </div>

        <div className="mt-auto mb-4">
          {desconto > 0 ? (
            <div className="flex flex-col">
              <span className="text-[13px] text-gray-400 line-through">
                R$ {Number(price).toFixed(2).replace(".", ",")}
              </span>
              <span className="text-[22px] font-bold text-[#8b46cd] leading-none mt-1">
                R$ {precoComDesconto.toFixed(2).replace(".", ",")}
              </span>
            </div>
          ) : (
            <span className="text-[22px] font-bold text-[#8b46cd] leading-none">
              R$ {Number(price).toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            // Lógica de compra aqui
          }}
          className="w-full h-11 bg-[#8b46cd] hover:bg-[#7a3bb8] active:bg-[#6931a2] text-white font-medium text-[14px] rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          <FaWhatsapp className="text-[18px]" />
          <span>Comprar</span>
        </button>
      </div>
    </div>
  );
}
