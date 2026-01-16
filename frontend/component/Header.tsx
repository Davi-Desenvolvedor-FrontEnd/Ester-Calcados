"use client";
import React from "react";
import { FaClock, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import Menu from "./Menu";

export default function Header() {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <header className="bg-pink-100 border-b-8 border-b-pink-900 max-h-50 w-full text-purple-900 py-4 gap-16 z-10 grid grid-cols-[2fr_1fr] items-center relative">
      <div className="pl-32 max-md:pl-2">
        <h1 className="text-9xl max-md:text-4xl font-medium font-['Imperial_Script']">
          Ester Calçados
        </h1>
        <p className="text-3xl max-md:text-xl font-medium font-['Cookie']">
          Fabricando os melhores calçados femininos desde 2006
        </p>
      </div>
      <div className="flex flex-row  justify-end gap-4 pr-8 relative ">
        <div className=" flex flex-col gap-4 items-start max-md:hidden ">
          <div className="flex flex-row gap-2 items-center">
            <FaPhoneAlt />
            <p className="text-2xl max-md:text-base font-['Cookie'] text-[#2c2c2c]">
              (34) 099383-39399
            </p>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <FaClock />
            <p className="text-2xl max-md:text-base font-['Cookie'] text-[#2c2c2c]">
              Segunda a sexta: 8:00 até 18:00
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <FaMapMarkerAlt />
            <p className="text-2xl max-md:text-base font-['Cookie'] text-[#2c2c2c]">
              Rua julio borges santana, 184
            </p>
          </div>
        </div>
        <div
          className=" cursor-pointer relative"
          onClick={() => setMenuVisible(!menuVisible)}
          onMouseEnter={() => setMenuVisible(true)}
          onMouseLeave={() => setMenuVisible(false)}
        >
          <IoPersonCircleOutline className="text-4xl max-md:text-2xl" />
        </div>
        <Menu
          visible={menuVisible}
          onMouseEnter={() => setMenuVisible(true)}
          onMouseLeave={() => setMenuVisible(false)}
        />
      </div>
    </header>
  );
}
