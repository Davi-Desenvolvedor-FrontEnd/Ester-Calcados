import { TbPointFilled } from "react-icons/tb";

interface ProductCardProps {
  id: number;
  name: string;
  photo: string;
  status: boolean;
}

export default function ProductCard({
  id,
  name,
  photo,
  status,
}: ProductCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl mx-auto cursor-pointer">
      <div className="w-80 h-55 border-b-[5px] border-b-purple-800">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="w-80 h-25 flex flex-col justify-center p-4 gap-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
        <div className="flex flex-row gap-2 items-center">
          <TbPointFilled
            className={`${status ? "text-green-600" : "text-red-600"}`}
          />
          <p className="text-[20px] font-normal text-gray-600">
            {status ? "Disponível" : "Em Falta"}
          </p>
        </div>
      </div>
    </div>
  );
}
