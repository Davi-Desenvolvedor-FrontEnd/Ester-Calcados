import { useState, useRef, type ChangeEvent } from 'react';
import './index.css'

interface DoubleSliderProps {
  min?: number;
  max?: number;
  step?: number;
  onPriceChange?: (range: { min: number; max: number }) => void;
  initialMin?: number;
  initialMax?: number;
}


export default function ({
  min = 0,
  max = 1000,
  step = 10,
  onPriceChange,
  initialMin = 0,
  initialMax = 1000
}: DoubleSliderProps) {
  const [minVal, setMinVal] = useState<number>(initialMin);
  const [maxVal, setMaxVal] = useState<number>(initialMax);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getPercentage = (value: number): number => {
    return ((value - min) / (max - min)) * 100;
  };

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = Math.min(Number(e.target.value), maxVal - step);
    setMinVal(value);
    onPriceChange?.({ min: value, max: maxVal });
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = Math.max(Number(e.target.value), minVal + step);
    setMaxVal(value);
    onPriceChange?.({ min: minVal, max: value });
  };

  const handleDragStart = (type: 'min' | 'max'): void => {
    setIsDragging(type);
  };

  const handleDragEnd = (): void => {
    setIsDragging(null);
  };

  // Estilos dinâmicos para o track
  const minPercent = getPercentage(minVal);
  const maxPercent = getPercentage(maxVal);

  return (
    <div className="double-slider-container">
      <div className="price-labels">
        <span className="price-min">R$ {minVal}</span>
        <span className="price-max">R$ {maxVal}</span>
      </div>

      <div className="slider-track" ref={sliderRef}>
        <div
          className="slider-range"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          className="thumb thumb-min"
          style={{ zIndex: isDragging === 'min' ? 3 : 2 }}
          onMouseDown={() => handleDragStart('min')}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={() => handleDragStart('min')}
          onTouchEnd={handleDragEnd}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          className="thumb thumb-max"
          style={{ zIndex: isDragging === 'max' ? 3 : 2 }}
          onMouseDown={() => handleDragStart('max')}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={() => handleDragStart('max')}
          onTouchEnd={handleDragEnd}
        />
      </div>
    </div>
  );
};