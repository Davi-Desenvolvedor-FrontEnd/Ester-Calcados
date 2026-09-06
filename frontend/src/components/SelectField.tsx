// components/SelectField.tsx
import React from "react";

interface SelectFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ id: number; nome: string }>;
  placeholder?: string;
  required?: boolean;
}

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Selecione uma opção",
  required = false,
}: SelectFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-(--text) mb-1"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none transition-all bg-white"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nome.slice(0, 1).toUpperCase() + option.nome.slice(1, -1)}
          </option>
        ))}
      </select>
    </div>
  );
}
