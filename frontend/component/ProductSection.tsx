"use client";

import { IoIosArrowForward } from "react-icons/io";

interface ProductSectionProps {
  id: number;
  name: string;
  value: number;
  onSelect: (id: number) => void;
  isActive: boolean;
}

export default function ProductSection({
  id,
  name,
  value,
  onSelect,
  isActive
}: ProductSectionProps) {
  return (
    <div
      className="flex flex-row justify-between items-center p-4 bg-amber-50 rounded-xl w-[90%] h-30 border-l-8 border-l-purple-950 shadow-[1px_1px_8px_black] hover:transform hover:scale-[1.05] cursor-pointer duration-300 "
      onClick={() => onSelect(id)}
    >
      <div className="flex flex-col">
          <h3 className="text-xl font-bold text-[#101828]">{name}</h3>
          <div className="w-30 h-px bg-gray-800 rounded-4xl"></div>
          <p className="text-[1em] font-medium text-[#101828] mt-2">
            R$ {value.toFixed(2)}
          </p>
      </div>
      <IoIosArrowForward className="text-2xl " />
    </div>
  );
}
