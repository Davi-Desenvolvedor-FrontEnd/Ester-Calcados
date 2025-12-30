"use client";
import Header from "@/component/Header";
import bg from "../assets/images/image.png";
import Menu from "@/component/Menu";
import produtos from "@/list/produtos";
import ProductCard from "@/component/ProductCard";
import ProductContainer from "@/component/ProductContainer";
import Footer from "@/component/Footer";
import Drawer from "@/component/Drawer";
import React from "react";

export default function Home() {
  const [visible, setVisible] = React.useState(false);
  return (
    <div
      className={`w-screen h-screen bg-cover bg-center bg-fixed overflow-x-hidden ${
        visible ? "overflow-scroll" : ""
      }`}
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <Header />

      <Menu />

      <main className="bg-[rgba(255,255,255,0.8)] w-full p-8 ">
        <div className="mt-4 ml-18 gap-4 flex flex-col">
          <h2 className="text-5xl text-gray-900 font-semibold font-['Gravitas_One'] ">
            Todos os calçados
          </h2>
          <div className="bg-purple-950 rounded-4xl w-125 h-2"></div>
        </div>
        <ProductContainer>
          {produtos.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              value={item.value}
              photo={item.photo}
            />
          ))}
        </ProductContainer>
      </main>
      {visible && (
        <div className="fixed top-51 right-0 left-0 bottom-0 inset-0 bg-black/60 w-full h-full  opacity-100 z-10" />
      )}
      <button
        className="bg-purple-900 rounded-[50%] p-4 fixed w-16 h-16 bottom-4 right-8 flex items-center justify-center cursor-pointer hover:shadow-[0_0_15px_rgba(147,51,234,0.8)]"
        onClick={() => setVisible(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-basket3-fill text-amber-50"
          viewBox="0 0 16 16"
        >
          <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z" />
        </svg>
      </button>
      <Drawer visible={visible} onClose={() => setVisible(false)} />
      <Footer />
    </div>
  );
}
