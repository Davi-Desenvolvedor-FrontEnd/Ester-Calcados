'use client'
import { useRouter } from "next/navigation";
import React from "react";

interface MenuProps {
  visible?: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function Menu({
  visible,
  onMouseEnter,
  onMouseLeave,
}: MenuProps) {
    const router = useRouter()
    function handleLoginForm () {
        onMouseLeave()
        router.push("/sign")
    }
  return (
    <div
      className={`bg-amber-50 rounded-xl p-8 absolute w-50 h-40 top-10 flex flex-col items-center gap-2 text-[1em] text-gray-700 right-6 z-10 transform duration-300 border border-purple-900 before:-top-[11px] before:right-5 before:border-l before:border-t before:border-purple-900 before:w-4 before:h-4 before:rotate-45 before:content-[] before:absolute before:bg-amber-50 ${
        visible ? "opacity-100 translate-y-4" : "opacity-0"
      } `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <p onClick={handleLoginForm} className="font-bold hover:underline cursor-pointer hover:text-purple-600 transition-colors">
        Entrar
      </p>
      <p>Ou</p>
      <p className="font-bold hover:underline cursor-pointer hover:text-purple-600 transition-colors">
        Criar uma conta
      </p>
    </div>
  );
}
