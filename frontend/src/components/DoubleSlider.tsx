import { useState, useRef, type ChangeEvent } from 'react';

interface DoubleSliderProps {
  min?: number;
  max?: number;
  step?: number;
  onPriceChange?: (range: { min: number; max: number }) => void;
  initialMin?: number;
  initialMax?: number;
}

export default function DoubleSlider({
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

  const minPercent = getPercentage(minVal);
  const maxPercent = getPercentage(maxVal);

  return (
    <div className="w-full px-2.5 font-sans">
      <div className="flex justify-between mb-3.5 text-base font-semibold text-(--text)">
        <span className="py-2 text-start text-base font-semibold text-(--text)">
          R$ {minVal}
        </span>
        <span className="py-2 text-end text-base font-semibold text-(--text)">
          R$ {maxVal}
        </span>
      </div>

      <div className="relative h-1.5 bg-(--surface) rounded cursor-pointer" ref={sliderRef}>
        <div
          className="absolute h-full rounded pointer-events-none"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
            background: 'linear-gradient(to right, var(--primary), var(--secondary))'
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-transparent pointer-events-none m-0 appearance-none focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-3 [&::-webkit-slider-thumb]:border-(--primary) [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-[transform,box-shadow] [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:ease-[ease] hover:[&::-webkit-slider-thumb]:scale-110 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-3 [&::-moz-range-thumb]:border-(--secondary) [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:shadow-md"
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
          className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-transparent pointer-events-none m-0 appearance-none focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-3 [&::-webkit-slider-thumb]:border-(--secondary) [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-[transform,box-shadow] [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:ease-[ease] hover:[&::-webkit-slider-thumb]:scale-110 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-3 [&::-moz-range-thumb]:border-(--secondary) [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:shadow-md"
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
}