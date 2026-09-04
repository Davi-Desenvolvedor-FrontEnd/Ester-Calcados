import { FaStar, FaRegStar, FaHeart, FaWhatsapp } from "react-icons/fa";

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
    <div className="produto-card shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative border border-gray-100/80 font-['Poppins',sans-serif] w-full">
      <div className="w-full aspect-square relative">
        <button
          type="button"
          aria-label="Adicionar aos favoritos"
          className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#8b46cd] transition-colors shadow-xs z-10"
        >
          <FaHeart className="text-[13px]" />
        </button>
        <img
          src={photo}
          alt={name}
          className="relative h-full w-full object-contain"
        />
      </div>
      <div className="flex flex-col grow px-4 py-2">
        {" "}
        <h3 className="text-[20px] font-bold text-gray-800 line-clamp-1 mb-1">
          {name}
        </h3>
        <div className="flex items-center gap-1.5 mb-2">
          {nRating > 0 ? (
            <>
              <div className="flex gap-0.5">{renderStars(rating)}</div>
              <p className="text-[14px]  font-normal">{rating}</p>
              <p className="text-[14px]  font-normal">({nRating})</p>
            </>
          ) : (
            <p className="text-[14px]">Sem avaliações</p>
          )}
        </div>
        <div className="mt-auto mb-3">
          {desconto > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#8b46cd]">
                R$ {precoComDesconto.toFixed(2).replace(".", ",")}
              </span>
              <p className="text-[14px]  line-through">
                R$ {Number(price).toFixed(2).replace(".", ",")}
              </p>
            </div>
          ) : (
            <span className="text-xl font-bold text-[#8b46cd]">
              R$ {Number(price).toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>
        <button
          type="button"
          className="w-full h-10 bg-[#8b46cd] hover:bg-[#7a3bb8] active:bg-[#6931a2] text-white font-medium text-[13px] rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          <FaWhatsapp className="text-xl" />
          <span>Comprar</span>
        </button>
      </div>
    </div>
  );
}
