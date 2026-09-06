import { type ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: "text" | "number" | "textarea" | "email" | "tel";
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  rows?: number;
  className?: string;
  step?: string;
}

export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  maxLength,
  rows = 3,
  className = "",
  step,
}: InputFieldProps) {
  const isTextarea = type === "textarea";
  const id = `field-${name}`;

  const commonProps = {
    id,
    name,
    value,
    onChange,
    placeholder,
    required,
    maxLength,
    className: `w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--secondary] focus:border-[--secondary] outline-none transition text-[--text] ${className}`,
  };

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-semibold text-(--text)">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          {...commonProps}
          rows={rows}
          className={`${commonProps.className} resize-none`}
        />
      ) : (
        <input
          {...commonProps}
          type={type}
          step={step}
          className={`${commonProps.className} h-10`}
        />
      )}
      {maxLength && (
        <p className="text-right text-xs text-gray-400 mt-1">
          {String(value).length}/{maxLength}
        </p>
      )}
    </div>
  );
}