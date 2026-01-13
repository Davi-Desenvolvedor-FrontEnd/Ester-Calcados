"use client";
import { useState } from "react";

export default function () {
  const [nameSection, setNameSection] = useState("");
  const [priceProductSection, setPriceProductSection] = useState("");
  const [inputIsFocus, setInputIsFocus] = useState(false);
  const [inputIsFocus2, setInputIsFocus2] = useState(false);
  return (
    <div className="w-full bg-amber-50 flex flex-col gap-8 h-full items-center justify-center p-8">
      <h1 className="text-center font-bold text-3xl text-gray-800">
        Criar seção de produtos
      </h1>
      <form
        action=""
        className="border bg-linear-to-br from-purple-50 to-purple-100 border-purple-200 bg-[#FFF8DB] shadow-[1px_1px_8px_#FEE685] rounded-2xl w-[30%] min-h-52 flex flex-col gap-4 justify-center"
      >
        <div className="w-[80%] h-12 self-center items-center flex relative">
          <label
            htmlFor="name_section"
            className={`absolute bg-purple-50 text-gray-500 font-medium z-20 p-2 transition-all duration-300 ease-out ${
              inputIsFocus || nameSection
                ? "text-xs origin-left scale-90 -top-4 translate-x-4"
                : "text-base top-1/2 -translate-y-1/2 scale-100 translate-x-2"
            }`}
          >
            Nome da Seção
          </label>
          <input
            type="text"
            className="p-4 z-10 border-2 border-pink-300 focus:border-pink-500 w-full h-full  rounded-2xl relative focus:outline-0 "
            id="name_section"
            required
            value={nameSection}
            onChange={(e) => setNameSection(e.target.value)}
            onFocus={() => setInputIsFocus(true)}
            onBlur={() => setInputIsFocus(false)}
          />
        </div>
        <div className="w-[80%] h-12 self-center items-center flex relative">
          <label
            htmlFor="price_products"
            className={`absolute bg-purple-50 z-20 text-gray-500 p-2 font-medium transition-all ease-out duration-300 ${
              inputIsFocus2 || priceProductSection ? "text-xs origin-left scale-90 -top-4 translate-x-4" : "text-base top-1/2 -translate-y-1/2 scale-100 translate-x-2"
            }`}
          >
            Preço dos produtos
          </label>
          <input
            type="number"
            className="p-4 z-10 border-2 w-full h-full border-pink-300 rounded-2xl relative focus:border-pink-500 focus:outline-0"
            id="price_products"
            required
            value={priceProductSection}
            onChange={(e)=>setPriceProductSection(e.target.value)}
            onFocus={() => setInputIsFocus2(true)}
            onBlur={() => setInputIsFocus2(false)}
          />
        </div>
      </form>
    </div>
  );
}
