import { useEffect, useState } from "react";
import DoubleSlider from "./DoubleSlider";

interface PriceRange {
  min: number;
  max: number;
}

export default function SideBar() {
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: 0,
    max: 1000,
  });

  const minPrice = 0;
  const maxPrice = 1000;

  const handlePriceChange = ({ min, max }: PriceRange): void => {
    setPriceRange({ min, max });
    console.log("Preço selecionado:", { min, max });
  };

  const categorias = [
    { id: 1, label: "Calçados" },
    { id: 2, label: "Óculos" },
    { id: 3, label: "Bolsas" },
  ];

  const getAllSelectedCategories = (): number[] =>
    categorias.map((categoria) => categoria.id);

  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    getAllSelectedCategories,
  );

  const toggleCategory = (categoryId: number): void => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const [resetKey, setResetKey] = useState(0);

  const clearFilters = () => {
    setSelectedCategories(getAllSelectedCategories());
    setPriceRange({ min: minPrice, max: maxPrice });
    setResetKey((prev) => prev + 1);
  };

  const filtrarPorCategoria = (dados: any[]) => {
    if (selectedCategories.length === 0) return dados;
    return dados.filter((item) =>
      selectedCategories.includes(item.categoriaId),
    );
  };

  return (
    <aside className="side-bar">
      <div className="filter-toggle">
        <i className="fa-solid fa-sliders"></i>
        <span>Filtros</span>
      </div>
      <div className="filters-content">
        <div className="filter-box">
          <p className="text-(--text)">Faixa de Preço</p>
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
          <p className="text-(--text)">Categorias</p>
          <div className="flex flex-col gap-1">
            {categorias.map((item) => (
              <label
                key={item.id}
                htmlFor={String(item.id)}
                className="flex items-center gap-4 p-3 rounded-xl duration-200 cursor-pointer border-2 border-transparent group"
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
            className="mt-4 text-sm cursor-pointer text-purple-600 hover:text-purple-800"
          >
            Limpar filtros
          </button>
        </div>
      </div>
    </aside>
  );
}
