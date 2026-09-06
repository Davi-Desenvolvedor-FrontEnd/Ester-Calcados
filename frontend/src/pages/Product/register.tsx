"use client";
import { useState, type FormEvent, useEffect } from "react";
import { getToken } from "../../auth";
import ImageUpload from "../../components/ImageUpload";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import { useNavigate } from "react-router-dom";

const sizes = [
  "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44"
];

interface Categoria {
  id: number;
  nome: string;
}

export default function ProductForm() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  
  const [productData, setProductData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    desconto: "",
    categoria_id: "",
    estoque: "",
    destaque: true,
  });
  
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    buscarCategorias();
  }, []);

  const buscarCategorias = async () => {
    try {
      setLoadingCategorias(true);
      const token = getToken();
      
      const response = await fetch("http://localhost:3000/categorias", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar categorias");
      }

      const data = await response.json();
      
      if (data.success) {
        setCategorias(data.data || []);
      } else if (Array.isArray(data)) {
        setCategorias(data);
      } else {
        console.error("Formato de resposta inesperado:", data);
        setCategorias([]);
      }
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      alert("Erro ao carregar categorias. Tente novamente.");
    } finally {
      setLoadingCategorias(false);
    }
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleImageUpload = (file: File | null, previewUrl: string) => {
    setImageFile(file);
    setImageUrl(previewUrl);
  };

  async function handleCreateProduct(e: FormEvent) {
    e.preventDefault();

    try {
      if (!imageFile) return
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("nome", productData.nome.trim());
      formData.append("descricao", productData.descricao.trim());
      formData.append("preco", String(Number(productData.preco)));
      formData.append("desconto", String(Number(productData.desconto) || 0));
      formData.append("categoria_id", String(Number(productData.categoria_id)));
      formData.append("estoque", String(Number(productData.estoque)));
      formData.append("destaque", String(productData.destaque));
      const sorted = [...selectedSizes].sort((a, b) => Number(a) - Number(b));
      formData.append("tamanhos", sorted.join(";"));
      formData.append("imagem", imageFile); 
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value);
      }

      const token = getToken();
      const response = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      const resultado = await response.json();
      console.log("Resposta:", resultado);

      if (!response.ok) {
        throw new Error(resultado.message);
      }

      if (resultado.success) {
        alert(resultado.message);
        navigate("/");
      } else {
        alert(resultado.message);
      }
    } catch (error: any) {
      console.error("Erro:", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleCreateProduct}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-4 font-['Poppins',sans-serif] relative"
    >
      <div className="space-y-6">
        <InputField
          label="Nome do produto"
          name="nome"
          value={productData.nome}
          onChange={handleInputChange}
          placeholder="Ex: Sandália Salto Bloco Nude"
          required
          maxLength={100}
        />

        <InputField
          label="Descrição"
          name="descricao"
          type="textarea"
          value={productData.descricao}
          onChange={handleInputChange}
          placeholder="Descreva o produto, materiais, detalhes, diferenciais..."
          required
          maxLength={500}
          rows={4}
        />

        <div className="grid grid-cols-3 gap-4">
          <InputField
            label="Preço"
            name="preco"
            type="number"
            value={productData.preco}
            onChange={handleInputChange}
            placeholder="0,00"
            required
            step="0.01"
          />
          <InputField
            label="Estoque"
            name="estoque"
            type="number"
            value={productData.estoque}
            onChange={handleInputChange}
            placeholder="Ex: 10"
            required
            step="1"
          />
          <InputField
            label="Desconto (%)"
            name="desconto"
            type="number"
            value={productData.desconto}
            onChange={handleInputChange}
            placeholder="0"
            step="1"
          />
        </div>
        <SelectField
          label="Categoria"
          name="categoria_id"
          value={productData.categoria_id}
          onChange={handleInputChange}
          options={categorias}
          placeholder={loadingCategorias ? "Carregando categorias..." : "Selecione uma categoria"}
          required
        />
      </div>
      <div className="pt-6">
        <ImageUpload 
          imageUrl={imageUrl} 
          setImageUrl={setImageUrl}
          onFileSelect={handleImageUpload} 
        />

        <div className="pt-2">
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
                    ? "bg-(--secondary)/80 text-white border-(--secondary)"
                    : "bg-white text-(--secondary) border-gray-300 hover:border-(--secondary)"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-1 md:col-span-2 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || loadingCategorias}
          className={`cursor-pointer px-8 py-3 bg-(--primary) hover:bg-[--secondary-dark] text-white font-semibold rounded-lg shadow-md transition-all duration-200 flex items-center gap-2 ${
            (isSubmitting || loadingCategorias) ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin">⏳</span>
              Criando...
            </>
          ) : (
            "Criar produto"
          )}
        </button>
      </div>
    </form>
  );
}