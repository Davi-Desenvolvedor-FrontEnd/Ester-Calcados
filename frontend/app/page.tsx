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
import { IoAdd } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function Home() {
  const [visible, setVisible] = React.useState(false);
  const [productSectionId, setProductSectionId] = React.useState<string | null>(
    null,
  );
  const router = useRouter();

  const handleSetProductSectionId = (id: number) => {
    const idString = JSON.stringify(id);
    localStorage.setItem("sectionProductId", idString);
    setProductSectionId(idString); // Atualiza o estado IMEDIATAMENTE
  };
  const closeSetProductSectionId = () => {
    localStorage.removeItem("sectionProductId");
    setProductSectionId(null); // Atualiza o estado IMEDIATAMENTE
  };

  const handleCreateProductPage = () => {
    router.push("create");
  };

  return (
    <div
      className={`w-screen h-screen overflow-x-hidden bg-amber-50`}
    >
      <Header />
      <main className="p-4">
        <ProductContainer>
          {produtosList.produtos.map((item) => (
            <ProductCard
              id={item.id}
              name={item.name}
              photo={item.photo}
              rating={item.rating}
              price={item.price}
            />
          ))}
        </ProductContainer>
      </main>
      <button
        className="bg-purple-900 rounded-[50%] p-4 fixed w-16 h-16 bottom-4 right-4 flex items-center justify-center cursor-pointer hover:shadow-[0_0_15px_rgba(147,51,234,0.8)]"
        onClick={() => handleCreateProductPage()}
      >
        <IoAdd className="text-3xl text-amber-50" />
      </button>
    </div>
  );
}
