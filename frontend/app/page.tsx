"use client";
import Header from "@/component/Header";
import bg from "../assets/images/image.png";
import ProductCard from "@/component/ProductCard";
import ProductContainer from "@/component/ProductContainer";
import Footer from "@/component/Footer";
import Drawer from "@/component/Drawer";
import React, { useEffect } from "react";
import produtosList from "@/list/produtos";
import ProductSection from "@/component/ProductSection";
import ProductContent from "@/component/ProductContent";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import ButtonBack from "@/component/ButtonBack";
import Form from "@/component/Form";
import { IoAdd } from "react-icons/io5";

export default function Home() {
  const [visible, setVisible] = React.useState(false);
  const [productSectionId, setProductSectionId] = React.useState<string | null>(
    null
  );

  const handleSetProductSectionId = (id: number) => {
    const idString = JSON.stringify(id);
    localStorage.setItem("sectionProductId", idString);
    setProductSectionId(idString); // Atualiza o estado IMEDIATAMENTE
  };
  const closeSetProductSectionId = () => {
    localStorage.removeItem("sectionProductId");
    setProductSectionId(null); // Atualiza o estado IMEDIATAMENTE
  };

  return (
    <div
      className={`w-screen h-screen bg-cover bg-center bg-fixed overflow-x-hidden ${
        visible ? "overflow-scroll" : ""
      }`}
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <Header />
      <main className="bg-[rgba(255,0,242,0.28)] w-full p-8 backdrop-blur-[10px] ">
        <div className="mt-4 ml-20 gap-4 flex flex-col">
          <h2 className="text-3xl text-gray-900 font-semibold font-['Gravitas_One'] ">
            Produtos
          </h2>
          <div className="bg-purple-950 rounded-4xl w-60 h-1.5"></div>
          {productSectionId !== null && (
            <ButtonBack
              label="Voltar"
              onPress={() => closeSetProductSectionId()}
            />
          )}
        </div>
        {productSectionId ? (
          <ProductContainer>
            {produtosList.produtos.map((item) => (
              <ProductCard
                id={item.id}
                name={item.name}
                photo={item.photo}
                status={item.available}
              />
            ))}
          </ProductContainer>
        ) : (
          <ProductContent>
            {produtosList.secoes.map((item) => (
              <ProductSection
                id={item.id}
                name={item.name}
                value={item.value}
                onSelect={handleSetProductSectionId}
                isActive={productSectionId == JSON.stringify(item.id)}
              />
            ))}
          </ProductContent>
        )}
      </main>

      {visible && (
        <div className="fixed top-51 right-0 left-0 bottom-0 inset-0 bg-black/60 w-full h-full  opacity-100 z-10" />
      )}
      <button
        className="bg-purple-900 rounded-[50%] p-4 fixed w-16 h-16 bottom-4 right-4 flex items-center justify-center cursor-pointer hover:shadow-[0_0_15px_rgba(147,51,234,0.8)]"
        onClick={() => setVisible(true)}
      >
        <IoAdd className="text-3xl text-amber-50" />
      </button>
      <Drawer visible={visible} onClose={() => setVisible(false)} />
    </div>
  );
}
