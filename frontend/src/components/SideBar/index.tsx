import { useState } from "react";
import DoubleSlider from "../DoubleSlider";
import './index.css'

interface PriceRange {
  min: number;
  max: number;
}

export default function SideBar() {
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 1000 });

  const minPrice = 0;
  const maxPrice = 1000;

  const handlePriceChange = ({ min, max }: PriceRange): void => {
    setPriceRange({ min, max });
    console.log('Preço selecionado:', { min, max });
  };

  return (
    <aside className="side-bar">
      <div className="filter-toggle">
        <i className="fa-solid fa-sliders"></i>
        <span>Filtros</span>
      </div>
      <div className="filters-content">
        <p>Faixa de Preço</p>
        <DoubleSlider
          min={Math.floor(minPrice)}
          max={Math.ceil(maxPrice)}
          step={10}
          initialMin={Math.floor(minPrice)}
          initialMax={Math.ceil(maxPrice)}
          onPriceChange={handlePriceChange}
        />
      </div>
    </aside>
  );
}