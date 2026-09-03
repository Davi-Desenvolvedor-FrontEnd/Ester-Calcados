import { useState } from "react";
import Switch from "@mui/material/Switch";

const sizes = ["33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44"];

export default function ProductForm() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    stock: "",
    status: true,
  });
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [singleSize, setSingleSize] = useState(false);

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white rounded-xl shadow-md font-['Poppins',sans-serif]">
      {/* Coluna 1 - Informações Básicas */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome do produto *</label>
          <input
            type="text"
            className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8b46cd]"
            placeholder="Ex: Sandália Salto Bloco Nude"
            value={productData.name}
            onChange={(e) => setProductData({ ...productData, name: e.target.value })}
          />
          <p className="text-right text-xs text-gray-400 mt-1">0/100</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição *</label>
          <textarea
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8b46cd]"
            placeholder="Descreva o produto, materiais, detalhes, diferenciais..."
            value={productData.description}
            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
          ></textarea>
          <p className="text-right text-xs text-gray-400 mt-1">0/500</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço *</label>
            <input type="text" className="w-full h-10 px-3 border border-gray-300 rounded-lg" placeholder="R$ 0,00" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Desconto (%)</label>
            <input type="text" className="w-full h-10 px-3 border border-gray-300 rounded-lg" placeholder="%" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço com desconto</label>
            <input type="text" className="w-full h-10 px-3 border border-gray-300 rounded-lg bg-gray-50" placeholder="R$ 0,00" readOnly />
          </div>
        </div>
      </div>

      {/* Coluna 2 - Tamanhos e Estoque */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tamanhos disponíveis</label>
          <div className="grid grid-cols-6 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`w-full h-10 rounded-lg border text-sm transition-colors ${selectedSizes.includes(size) ? "bg-[#8b46cd] text-white border-[#8b46cd]" : "bg-white text-gray-700 border-gray-300 hover:border-[#8b46cd]"}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Tamanho único</label>
          <Switch checked={singleSize} onChange={() => setSingleSize(!singleSize)} color="primary" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estoque *</label>
            <input type="number" className="w-full h-10 px-3 border border-gray-300 rounded-lg" placeholder="Ex: 10" />
          </div>
          <div className="flex flex-col items-start pt-2">
            <label className="text-sm font-medium text-gray-700 mb-1">Status do produto</label>
            <div className="flex items-center gap-2">
              <Switch checked={productData.status} onChange={() => setProductData({ ...productData, status: !productData.status })} color="secondary" />
              <span className="text-sm text-gray-600">{productData.status ? "Visível na loja" : "Oculto na loja"}</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}