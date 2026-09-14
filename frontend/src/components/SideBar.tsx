import React, { useState, useEffect } from "react";
import {
  SlidersHorizontal,
  RotateCcw,
  Footprints,
  Glasses,
  ShoppingBag,
} from "lucide-react";

export interface PriceRange {
  min: number;
  max: number;
}

export interface FilterState {
  priceRange: PriceRange;
  categories: number[];
  disponivel?: boolean;
  promocao?: boolean;
  novidades?: boolean;
}

interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  onClose?: () => void;
  onFilterChange?: (filtros: FilterState) => void;
  initialFilters?: FilterState;
}

const ICONES: Record<number, React.ElementType> = {
  1: Footprints,
  2: Glasses,
  3: ShoppingBag,
};

const minPrice = 0;
const maxPrice = 1000;

const formatarPreco = (val: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    val,
  );

export default function SideBar({
  isOpen,
  onClose,
  onFilterChange,
  initialFilters,
  className = "",
  ...props
}: SideBarProps) {
  const categorias = [
    { id: 1, label: "Calçados" },
    { id: 2, label: "Óculos" },
    { id: 3, label: "Bolsas" },
  ];

  const [priceRange, setPriceRange] = useState<PriceRange>(
    initialFilters?.priceRange || { min: minPrice, max: maxPrice },
  );

  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    initialFilters?.categories || categorias.map((c) => c.id),
  );

  const [stockFilters, setStockFilters] = useState({
    disponivel: initialFilters?.disponivel ?? false,
    promocao: initialFilters?.promocao ?? false,
    novidades: initialFilters?.novidades ?? false,
  });

  useEffect(() => {
    if (initialFilters) {
      setPriceRange(initialFilters.priceRange);
      setSelectedCategories(initialFilters.categories);
      setStockFilters({
        disponivel: initialFilters?.disponivel ?? false,
        promocao: initialFilters?.promocao ?? false,
        novidades: initialFilters?.novidades ?? false,
      });
    }
  }, [initialFilters]);

  const emitFilterChange = (
    updatedPrice = priceRange,
    updatedCategories = selectedCategories,
    updatedStock = stockFilters,
  ) => {
    if (onFilterChange) {
      onFilterChange({
        priceRange: updatedPrice,
        categories: updatedCategories,
        ...updatedStock,
      });
    }
  };

  const handleMinChange = (val: number) => {
    // Garante que o mínimo não ultrapasse o máximo
    const newMin = Math.min(val, priceRange.max - 10);
    const newRange = { ...priceRange, min: Math.max(minPrice, newMin) };
    setPriceRange(newRange);
    emitFilterChange(newRange);
  };

  const handleMaxChange = (val: number) => {
    // Garante que o máximo não seja menor que o mínimo
    const newMax = Math.max(val, priceRange.min + 10);
    const newRange = { ...priceRange, max: Math.min(maxPrice, newMax) };
    setPriceRange(newRange);
    emitFilterChange(newRange);
  };

  const toggleCategory = (categoryId: number) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(newCategories);
    emitFilterChange(priceRange, newCategories);
  };

  const toggleStock = (key: keyof typeof stockFilters) => {
    const newStock = { ...stockFilters, [key]: !stockFilters[key] };
    setStockFilters(newStock);
    emitFilterChange(priceRange, selectedCategories, newStock);
  };

  const clearFilters = () => {
    const defaultCategories = categorias.map((c) => c.id);
    const defaultPrice = { min: minPrice, max: maxPrice };
    const defaultStock = {
      disponivel: false,
      promocao: false,
      novidades: false,
    };

    setPriceRange(defaultPrice);
    setSelectedCategories(defaultCategories);
    setStockFilters(defaultStock);

    if (onFilterChange) {
      onFilterChange({
        priceRange: defaultPrice,
        categories: defaultCategories,
        ...defaultStock,
      });
    }
  };

  return (
    <aside
      aria-label="Filtros de produtos"
      className={`h-fit rounded-2xl border border-brand-100 bg-white p-5 shadow-card lg:sticky lg:top-24 ${className}`}
      {...props}
    >
      <div className="mb-5 flex items-center gap-2">
        <SlidersHorizontal
          className="h-5 w-5 text-plum-700"
          aria-hidden="true"
        />
        <h2 className="font-display text-lg font-semibold text-plum-900">
          Filtros
        </h2>
      </div>

      {/* Faixa de preço */}
      <fieldset className="mb-6 border-t border-brand-100 pt-5">
        <legend className="mb-3 text-sm font-semibold text-plum-900">
          Faixa de Preço
        </legend>
        <div className="mb-3 flex items-center justify-between text-sm text-plum-600">
          <span>{formatarPreco(priceRange.min)}</span>
          <span>{formatarPreco(priceRange.max)}</span>
        </div>
        
        {/* Container do Slider com pointer-events corrigidos */}
        <div className="relative h-5 w-full flex items-center">
          <div className="absolute left-0 right-0 h-1.5 rounded-full bg-brand-100" />
          <div
            className="absolute h-1.5 rounded-full bg-brand-500"
            style={{
              left: `${((priceRange.min - minPrice) / (maxPrice - minPrice)) * 100}%`,
              right: `${100 - ((priceRange.max - minPrice) / (maxPrice - minPrice)) * 100}%`,
            }}
          />
          <input
            type="range"
            aria-label="Preço mínimo"
            min={minPrice}
            max={maxPrice}
            step={10}
            value={priceRange.min}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className="pointer-events-none absolute inset-x-0 h-1.5 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-500 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-500"
            style={{ zIndex: priceRange.min > maxPrice - 100 ? "5" : "3" }}
          />
          <input
            type="range"
            aria-label="Preço máximo"
            min={minPrice}
            max={maxPrice}
            step={10}
            value={priceRange.max}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            className="pointer-events-none absolute inset-x-0 h-1.5 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-500 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-500"
            style={{ zIndex: "4" }}
          />
        </div>
      </fieldset>

      {/* Categorias */}
      <fieldset className="mb-6 border-t border-brand-100 pt-5">
        <legend className="mb-3 text-sm font-semibold text-plum-900">
          Categorias
        </legend>
        <ul className="flex flex-col gap-2.5">
          {categorias.map((cat) => {
            const Icon = ICONES[cat.id];
            const marcado = selectedCategories.includes(cat.id);
            return (
              <li key={cat.id}>
                <label className="flex cursor-pointer items-center gap-3 text-sm text-plum-800">
                  <input
                    type="checkbox"
                    checked={marcado}
                    onChange={() => toggleCategory(cat.id)}
                    className="h-4 w-4 rounded border-brand-300 text-brand-500 accent-brand-500 focus-visible:outline-2 focus-visible:outline-plum-500"
                  />
                  {Icon && (
                    <Icon
                      className="h-4 w-4 text-plum-500"
                      aria-hidden="true"
                    />
                  )}
                  {cat.label}
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      {/* Estoque e Promoções */}
      <fieldset className="mb-6 border-t border-brand-100 pt-5">
        <legend className="mb-3 text-sm font-semibold text-plum-900">
          Estoque
        </legend>
        <ToggleRow
          label="Disponível"
          descricao="Produtos em estoque"
          checked={stockFilters.disponivel}
          onChange={() => toggleStock("disponivel")}
        />
        <ToggleRow
          label="Promoção"
          descricao="Produtos em promoção"
          checked={stockFilters.promocao}
          onChange={() => toggleStock("promocao")}
        />
        <ToggleRow
          label="Novidades"
          descricao="Lançamentos recentes"
          checked={stockFilters.novidades}
          onChange={() => toggleStock("novidades")}
        />
      </fieldset>

      <button
        type="button"
        onClick={clearFilters}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-plum-200 py-2.5 text-sm font-medium text-plum-700 transition hover:bg-plum-50"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Limpar Filtros
      </button>
    </aside>
  );
}


interface ToggleRowProps {
  label: string;
  descricao: string;
  checked: boolean;
  onChange: () => void;
}

function ToggleRow({ label, descricao, checked, onChange }: ToggleRowProps) {
  return (
    <div className="mb-3 flex items-center justify-between last:mb-0">
      <div>
        <p className="text-sm font-medium text-plum-900">{label}</p>
        <p className="text-xs text-plum-500">{descricao}</p>
      </div>
      
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-500 focus-visible:ring-offset-2 ${
          checked ? "bg-plum-600" : "bg-plum-200"
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
