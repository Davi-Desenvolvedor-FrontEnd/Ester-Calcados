"use client";

import { useState, type FormEvent } from "react";
import Switch from "@mui/material/Switch";
import { getToken } from "../../auth";
import ImageUpload from "../../components/ImageUpload";
import InputField from "../../components/InputField";

const sizes = [
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
];

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
  const [imageUrl, setImageUrl] = useState<string>("");

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  async function handleCreateProduct(e: FormEvent) {
    e.preventDefault();

    try {
      const sorted = [...selectedSizes].sort((a, b) => Number(a) - Number(b));
      const joined = sorted.join(";");
      const produto = {
        ...productData,
        tamanhos: joined,
        imagem_url: imageUrl,
      };

      const token = getToken();
      const response = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
      });

      if (!response.ok) throw new Error("Erro ao criar produto");
      alert("Produto criado com sucesso!");
      // Resetar formulário ou redirecionar
    } catch (error) {
      console.error(error);
      alert("Falha ao criar produto.");
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleCreateProduct}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-4 font-['Poppins',sans-serif] relative"
    >
      {/* Coluna 1 */}
      <div className="space-y-6">
        <InputField
          label="Nome do produto"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
          placeholder="Ex: Sandália Salto Bloco Nude"
          required
          maxLength={100}
        />

        <InputField
          label="Descrição"
          name="description"
          type="textarea"
          value={productData.description}
          onChange={handleInputChange}
          placeholder="Descreva o produto, materiais, detalhes, diferenciais..."
          required
          maxLength={500}
          rows={4}
        />

        <div className="grid grid-cols-3 gap-4">
          <InputField
            label="Preço"
            name="price"
            type="number"
            value={productData.price}
            onChange={handleInputChange}
            placeholder="0,00"
            required
            step="0.01"
          />
          <InputField
            label="Estoque"
            name="stock"
            type="number"
            value={productData.stock}
            onChange={handleInputChange}
            placeholder="Ex: 10"
            required
            step="1"
          />
          <InputField
            label="Desconto (%)"
            name="discount"
            type="number"
            value={productData.discount}
            onChange={handleInputChange}
            placeholder="0"
            step="1"
          />
        </div>
      </div>

      {/* Coluna 2 */}
      <div className="space-y-6">
        <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />

        <div>
          <label className="block text-sm font-medium text-(--text) mb-2">
            Tamanhos disponíveis
          </label>
          <div className="grid grid-cols-6 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`w-full h-10 rounded-lg border text-sm transition-colors font-medium cursor-pointer ${
                  selectedSizes.includes(size)
                    ? "bg-(--secondary)/80 text-white"
                    : "bg-white text-(--secondary) border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Botão – ocupando toda a largura, alinhado à direita */}
      <div className="col-span-1 md:col-span-2 flex justify-end mt-6">
        <button
          type="submit"
          onClick={handleCreateProduct}
          className="cursor-pointer px-8 py-3 bg-(--primary) hover:bg-[--secondary-dark] text-white font-semibold rounded-lg shadow-md transition-all duration-200 flex items-center gap-2"
        >
          Criar produto
        </button>
      </div>
    </form>
  );
}
