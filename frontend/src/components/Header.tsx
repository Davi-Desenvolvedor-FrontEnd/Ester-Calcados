"use client";
// import { useRouter } from "next/navigation";

export default function Header() {
  // const router = useRouter();

  return (
    <header className="max-h-50 w-full py-4 gap-16 z-10 grid grid-cols-[2fr_1fr] justify-between  text-amber-50">
      <div className="max-md:pl-2">
        <h1 className="text-9xl max-md:text-4xl font-medium font-dancing">
          Ester Calçados
        </h1>
        {/* <p className="text-3xl max-md:text-xl font-medium font-['Great_Vibes']">
          Fabricando os melhores calçados femininos desde 2006
        </p> */}
      </div>
      <div className="flex flex-row justify-end gap-4 pr-8 relative ">
        
        <button
          className="self-start border-0 items-center px-4 py-2 font-medium no-underline hover:underline transition-all duration-300 cursor-pointer font-['Poppins'_'sans_serif']"
          // onClick={() => router.push("/sign")}
        >
          <p>Entrar</p>
        </button>
      </div>
    </header>
  );
}
