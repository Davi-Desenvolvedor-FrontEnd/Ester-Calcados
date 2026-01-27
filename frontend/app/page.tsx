"use client";
import Header from "@/component/Header";
import bg from "../assets/images/image.png";
import ProductCard from "@/component/ProductCard";
import ProductContainer from "@/component/ProductContainer";
import Footer from "@/component/Footer";
import Drawer from "@/component/Drawer";
import React, { useEffect, useState } from "react";
import produtosList from "@/list/produtos";
import ProductSection from "@/component/ProductSection";
import ProductContent from "@/component/ProductContent";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import ButtonBack from "@/component/ButtonBack";
import { IoAdd } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { ImEmbed } from "react-icons/im";

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

  const sections = [
    { id: 1, name: "Tudo" },
    { id: 2, name: "Calçados" },
    { id: 3, name: "Bolsas" },
    { id: 4, name: "Óculos" },
  ];

  const [priceRange, setPriceRange] = useState(500);
  const [ratingRange, setRatingRange] = useState(0);
  const [section, setSection] = useState("Tudo");

  return (
    <div className={`w-screen h-screen overflow-x-hidden bg-amber-50`}>
      <Header />
      
      <menu className="flex w-full min-h-24 gap-2 flex-col items-center font-['DM_Sans'_'sans_serif']">
        <nav className="p-4 gap-4 flex flex-row justify-around w-4/5 font-bold font-['DM_Sans'] text-2xl text-gray-800">
          {sections.map((item) => (
            <button
              key={item.id}
              className={`px-8 py-2 rounded-4xl border-0 ${section == item.name ? "bg-linear-to-r from-purple-600 to-pink-500 text-amber-50" : ""}`}
              onClick={() => setSection(item.name)}
            >
              {item.name}
            </button>
          ))}
        </nav>
        <div className="w-full p-4 flex flex-row gap-4 items-center justify-center">
          <div className="w-72 h-24 p-2 rounded-lg border border-pink-300 flex flex-col justify-evenly">
            <label
              htmlFor="priceInput"
              className="text-xl text-gray-600 font-semibold"
            >
              Preço: R$ {priceRange.toFixed(2)}
            </label>
            <input
              type="range"
              name="price"
              id="priceInput"
              min={0}
              max={500}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
            />
          </div>
          <div className="w-72 h-24 p-2 rounded-lg border border-pink-300 flex flex-col justify-evenly">
            <label
              htmlFor="priceInput"
              className="text-xl text-gray-600 font-semibold"
            >
              Avaliação: {ratingRange.toFixed(1)}
            </label>
            <input
              type="range"
              name="rating"
              id="priceInput"
              step={0.1}
              min={0}
              max={5}
              value={ratingRange}
              onChange={(e) => setRatingRange(Number(e.target.value))}
            />
          </div>
        </div>
      </menu>

      <div className="mt-8 w-full text-center flex flex-col gap-2">
        <h2 className="text-gray-700 text-5xl font-bold">
          Descubra sua{" "}
          <span className="font-['Pacifico','cursive'] bg-linear-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
            Elegãncia
          </span>
        </h2>
        <p className="text-gray-500 text-base font-['Poppins']">
          Calçados, Bolsas e Óculos de alta qualidade
        </p>
      </div>

      <main className="p-4">
        <ProductContainer>
          {produtosList.produtos.map((item) => (
            <ProductCard
              id={item.id}
              key={item.id}
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
      <Footer />
    </div>
  );
}
