import { FaStar, FaRegStar } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";

interface ProductCardProps {
  id: number;
  name: string;
  photo: string;
  rating: number;
  price: number;
}

export default function ProductCard({
  id,
  name,
  photo,
  rating,
  price,
}: ProductCardProps) {
  function handleAvaliation(rating: number) {
    for (let i = 1; i <= 5; i++) {
      return (
        <>
          {Array.from({ length: 5 }, (_, i) => {
            i++;
            return i <= rating ? (
              <FaStar className="text-yellow-500 text-xl" key={i} />
            ) : (
              <FaStar className="text-gray-500 text-xl" key={i} />
            );
          })}
        </>
      );
    }
  }
  return (
    <div className="bg-amber-50 hover:shadow-lg rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 mx-auto cursor-pointer border border-amber-200">
      <div className="w-80 h-55 border-b-[5px] border-b-purple-800 relative">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-center object-cover relative"
        />
        <div className="absolute bottom-0 left-0 bg-linear-to-r from-purple-600 to-pink-500 m-4 rounded-3xl w-28 h-8 flex items-center justify-center text-amber-50 font-['Poppins'] font-bold">
          R$ {price.toFixed(2)}
        </div>
      </div>
      <div className="w-80 h-25 flex flex-col justify-center p-4 gap-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate font-['Poppins']">
          {name}
        </h3>
        <div className="flex flex-row items-center justify-between">
          <div className="flex gap-2">{handleAvaliation(rating)}</div>
          <p className="text-gray-800 text-xl font-semibold">
            {rating.toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
}
