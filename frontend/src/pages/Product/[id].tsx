import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import {
  FaHeart,
  FaStar,
  FaRegStar,
  FaMinus,
  FaPlus,
  FaWhatsapp,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

// Dados mockados baseados nas imagens
const currentProduct = {
  name: "Sandália Salto Bloco Nude",
  price: 189.9,
  desconto: 10,
  rating: 4.8,
  nRating: 128,
  mainPhoto: "/path/to/nude-sandals-main.jpg",
  photos: [
    "/path/to/nude-sandals-main.jpg",
    "/path/to/thumb1.jpg",
    "/path/to/thumb2.jpg",
    "/path/to/thumb3.jpg",
  ],
  colors: [
    { name: "Nude", hex: "#e8c8ac", selected: true },
    { name: "Preto", hex: "#000000", selected: false },
  ],
  sizes: [
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
  ],
};

const relatedProducts = [
  {
    id: 1,
    name: "Óculos de Sol Cat-Eye",
    photo: "/path/to/sunglasses.jpg",
    rating: 5,
    nRating: 45,
    price: 159.9,
    description: "",
    estoque: 10,
    destaque: true,
    desconto: 0,
  },
  {
    id: 2,
    name: "Mochila Feminina",
    photo: "/path/to/backpack.jpg",
    rating: 4,
    nRating: 62,
    price: 249.9,
    description: "",
    estoque: 5,
    destaque: false,
    desconto: 0,
  },
];

type ProductPagesProps = {
  id: string;
};

export default function () {
  const { id } = useParams<ProductPagesProps>();
  const [selectedColor, setSelectedColor] = useState("Nude");
  const [selectedSize, setSelectedSize] = useState("36");
  const [quantity, setQuantity] = useState(1);
  const [mainPhoto, setMainPhoto] = useState(currentProduct.mainPhoto);

  const renderStars = (ratingValue: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const isFilled = i + 1 <= Math.round(ratingValue);
      return isFilled ? (
        <FaStar key={i} className="text-[#e56b92] text-[18px]" />
      ) : (
        <FaRegStar key={i} className="text-gray-400 text-[18px]" />
      );
    });
  };

  return (
    <div className="bg-[#fdfdfd] min-h-screen font-['Poppins',sans-serif]">
      <main className="container mx-auto px-6 py-24">
        {/* Painel do Produto (Com base na Imagem B) */}
        <section className="grid grid-cols-1 md:grid-cols-[1.2fr,1fr] gap-12 mb-16">
          {/* Showcase de Imagens */}
          <div>
            <div className="w-full h-125 bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-8 mb-4 overflow-hidden shadow-sm">
              <img
                src={mainPhoto}
                alt="Produto"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {currentProduct.photos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setMainPhoto(photo)}
                  className={`border-2 rounded-lg p-2 flex items-center justify-center transition-colors ${photo === mainPhoto ? "border-[#8b46cd]" : "border-gray-200 hover:border-[#e56b92]"}`}
                >
                  <img
                    src={photo}
                    alt={`Miniatura ${i}`}
                    className="w-full h-20 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Detalhes e Ações */}
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              {currentProduct.name}
            </h1>

            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {renderStars(currentProduct.rating)}
              </div>
              <span className="text-sm text-gray-600">
                ({currentProduct.nRating} avaliações)
              </span>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#8b46cd]">
                  R${" "}
                  {(currentProduct.price * (1 - currentProduct.desconto / 100))
                    .toFixed(2)
                    .replace(".", ",")}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  R$ {currentProduct.price.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>

            {/* Cores */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Cor: <span className="font-normal">{selectedColor}</span>
              </h3>
              <div className="flex gap-2">
                {currentProduct.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 p-0.5 transition-colors ${color.name === selectedColor ? "border-[#8b46cd]" : "border-gray-200 hover:border-[#e56b92]"}`}
                    title={color.name}
                  >
                    <span
                      style={{ backgroundColor: color.hex }}
                      className="block w-full h-full rounded-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tamanhos */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Tamanho: <span className="font-normal">{selectedSize}</span>
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {currentProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 rounded-lg border text-sm transition-colors ${size === selectedSize ? "bg-[#8b46cd] text-white border-[#8b46cd]" : "bg-white text-gray-700 border-gray-200 hover:border-[#e56b92]"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantidade e Ações */}
            <div className="flex gap-4 pt-4">
              <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg h-12 px-3 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-[#8b46cd] hover:text-[#7a3bb8] disabled:text-gray-300"
                  disabled={quantity === 1}
                >
                  <FaMinus />
                </button>
                <input
                  type="number"
                  value={quantity}
                  className="w-12 text-center font-medium text-gray-800"
                  readOnly
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-[#8b46cd] hover:text-[#7a3bb8]"
                >
                  <FaPlus />
                </button>
              </div>
              <button className="grow h-12 bg-[#8b46cd] hover:bg-[#7a3bb8] text-white rounded-lg font-medium flex items-center justify-center gap-3">
                <FaWhatsapp className="text-2xl" />
                Comprar via WhatsApp
              </button>
              <button className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-lg text-gray-400 hover:text-[#e56b92] hover:border-[#e56b92] transition-colors">
                <FaHeart className="text-xl" />
              </button>
            </div>
          </div>
        </section>

        {/* Abas e "Produtos que combinam" */}
        <section className="pt-12 border-t border-gray-100">
          <div className="flex gap-1 mb-10 border-b border-gray-200">
            <button className="text-lg font-medium px-4 py-2 text-[#8b46cd] border-b-2 border-[#8b46cd]">
              Detalhes
            </button>
            <button className="text-lg font-medium px-4 py-2 text-gray-500 hover:text-[#e56b92]">
              Avaliações (128)
            </button>
            <button className="text-lg font-medium px-4 py-2 text-gray-500 hover:text-[#e56b92]">
              Entregas e Trocas
            </button>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              Produtos que combinam
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
