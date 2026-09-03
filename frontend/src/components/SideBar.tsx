import React, { useState } from "react";
import DoubleSlider from "./DoubleSlider";

interface PriceRange {
  min: number;
  max: number;
}

interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  onClose?: () => void; // para fechar no mobile
}

export default function SideBar({
  isOpen,
  onClose,
  className,
  ...props
}: SideBarProps) {
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: 0,
    max: 1000,
  });
  const minPrice = 0;
  const maxPrice = 1000;

  const handlePriceChange = ({ min, max }: PriceRange) => {
    setPriceRange({ min, max });
    console.log("Preço selecionado:", { min, max });
  };

  const categorias = [
    { id: 1, label: "Calçados" },
    { id: 2, label: "Óculos" },
    { id: 3, label: "Bolsas" },
  ];

  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    categorias.map((c) => c.id),
  );

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const [resetKey, setResetKey] = useState(0);

  const clearFilters = () => {
    setSelectedCategories(categorias.map((c) => c.id));
    setPriceRange({ min: minPrice, max: maxPrice });
    setResetKey((prev) => prev + 1);
  };

  return (
    <aside className={`side-bar ${className}`} {...props}>
      {/* Cabeçalho com título e botão fechar (mobile) */}
      <div className="flex items-center lg:bg-(--surface) justify-end md:justify-start p-4 border-b border-gray-200 rounded-xl">
        <div className="md:flex hidden items-center gap-2">
          <i className="fa-solid fa-sliders text-(--secondary) text-2xl"></i>
          <h2 className="text-(--secondary) text-2xl">Filtros</h2>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden flex self-end p-1 bg-(--surface) rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Fechar filtros"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="filters-content p-4 overflow-y-auto flex-1">
        <div className="filter-box mb-6">
          <p className="text-gray-700 mb-2">Faixa de Preço</p>
          <DoubleSlider
            key={resetKey}
            min={Math.floor(minPrice)}
            max={Math.ceil(maxPrice)}
            step={1}
            initialMin={Math.floor(minPrice)}
            initialMax={Math.ceil(maxPrice)}
            onPriceChange={handlePriceChange}
          />
        </div>

        <div className="filter-box">
          <p className="text-gray-700 mb-2">Categorias</p>
          <div className="flex flex-col gap-1">
            {categorias.map((item) => (
              <label
                key={item.id}
                htmlFor={String(item.id)}
                className="flex items-center gap-4 p-3 rounded-xl duration-200 cursor-pointer border-2 border-transparent group hover:border-purple-200"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    id={String(item.id)}
                    checked={selectedCategories.includes(item.id)}
                    onChange={() => toggleCategory(item.id)}
                    className="peer appearance-none w-4 h-4 rounded-sm border-2 border-gray-300 cursor-pointer transition-all duration-200 checked:bg-purple-600 checked:border-purple-600 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                  <svg
                    className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="font-normal text-[16px] transition-colors group-hover:text-purple-600">
                  {item.label}
                </span>
              </label>
            ))}
          </div>
          <button
            onClick={clearFilters}
            className="mt-4 text-sm cursor-pointer text-purple-600 hover:text-purple-800 font-medium"
          >
            Limpar filtros
          </button>
        </div>
      </div>
    </aside>
  );
}
