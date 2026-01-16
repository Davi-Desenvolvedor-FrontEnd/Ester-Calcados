"use client";
import ButtonBack from "@/component/ButtonBack";
import ContentButtonChange from "@/component/ContentButtonChange";
import ImageUpload from "@/component/ImageUpload";
import produtosList from "@/list/produtos";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export default function () {
  const [nameSection, setNameSection] = useState("");
  const [priceProductSection, setPriceProductSection] = useState<number>(0);
  const [photo, setPhoto] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [typeForm, setTypeForm] = useState<"Section" | "Product">("Section");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function onChangePrice(e: { target: { value: string } }) {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    const cents = Number(onlyNumbers || 0);
    setPriceProductSection(cents);
  }

  const handleTypeForm = (type: "Section" | "Product") => {
    setTypeForm(type);
  };
  const router = useRouter();

  return (
    <div className="w-full bg-amber-50 overflow-hidden flex flex-col gap-8 h-full items-center justify-center">
      <div className="mb-8 flex flex-col w-full px-4">
        <ButtonBack onPress={() => router.push("/")} />
        <h1 className="text-center font-bold text-3xl max-md:text-xl text-gray-800">
          {typeForm == "Section" ? "Criar seção de produtos" : "Criar produto"}
        </h1>
        <div className="p-4"></div>
      </div>
      <form
        action=""
        className="border bg-linear-to-br from-purple-50 to-purple-100 border-purple-200 rounded-2xl w-[30%] max-md:w-[90%] min-h-52 flex flex-col p-8 space-y-4 shadow-lg justify-center mb-25 overflow-hidden"
      >
        <ContentButtonChange
          left={{
            onClickLeft: () => handleTypeForm("Section"),
            label: "Seção",
            active: typeForm == "Section"
          }}
          right={{
            onClickRight: () => handleTypeForm("Product"),
            label: "Produto",
            active: typeForm == "Product"
          }}
        />
        {typeForm == "Section" ? (
          <>
            <div className="w-full self-center flex flex-col">
              <label
                htmlFor="name_section"
                className="text-gray-700 mb-2 text-base ml-2 font-medium "
              >
                Nome da Seção
              </label>
              <input
                type="text"
                className="h-12 p-4 border-2 border-purple-300 focus:ring-2 focus:ring-purple-500 bg-white/80 w-full rounded-xl focus:outline-0  transition-all focus:border-transparent"
                id="name_section"
                value={nameSection}
                onChange={(e) => setNameSection(e.target.value)}
                placeholder="Digite o nome da seção"
              />
            </div>
            <div className="w-full self-center flex flex-col">
              <label
                htmlFor="price_products"
                className="text-gray-700 mb-2 text-base ml-2 font-medium "
              >
                Preço dos produtos
              </label>
              <input
                type="text"
                className="h-12 p-4 border-2 w-full border-purple-300 focus:ring-2 focus:ring-purple-500 bg-white/80 rounded-xl focus:outline-0 transition-all focus:border-transparent"
                id="price_products"
                required
                step={"0.01"}
                value={`R$ ${(priceProductSection / 100).toFixed(2)}`}
                onChange={onChangePrice}
                placeholder="0.00"
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-full self-center flex flex-col">
              <label
                htmlFor="sectionProductId"
                className="text-gray-700 mb-2 text-base ml-2 font-medium "
              >
                Selecione a seção do produto
              </label>
              <div className="relative h-12 border-2 border-purple-300 bg-white/80 w-full rounded-xl transition-all focus:border-transparent flex flex-col items-center justify-center">
                <select
                  name="section_product"
                  id="sectionProductId"
                  className="not-last:appearance-none rounded-xl focus:outline-none w-full h-full relative focus:ring-2 focus:ring-purple-500 px-4 text-gray-800"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {produtosList.secoes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <IoIosArrowDown className="text-2xl mr-4 absolute self-end pointer-events-none" />
              </div>
            </div>
            <div className="w-full self-center flex flex-col">
              <label
                htmlFor="name_product"
                className="text-gray-700 mb-2 text-base ml-2 font-medium "
              >
                Nome do produto
              </label>
              <input
                type="text"
                className="h-12 p-4 border-2 border-purple-300 focus:ring-2 focus:ring-purple-500 bg-white/80 w-full rounded-xl focus:outline-0  transition-all focus:border-transparent"
                id="name_product"
                value={nameProduct}
                onChange={(e) => setNameProduct(e.target.value)}
                placeholder="Digite o nome do produto"
              />
            </div>
            <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </>
        )}
        <button
          type="submit"
          className="mt-8 duration-300 ease-in-out hover:scale-105 transform transition-all shadow-lg cursor-pointer self-center flex items-center justify-center w-full h-12 rounded-xl bg-linear-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-amber-50 font-semibold"
        >
          {typeForm == "Section" ? "Criar seção" : "Criar produto"}
        </button>
      </form>
    </div>
  );
}
