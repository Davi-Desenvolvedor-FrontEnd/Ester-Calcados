

export default function Menu() {
  return (
    <menu className="w-screen bg-pink-900 flex justify-center p-4 gap-8">
      <nav className="flex self-center flex-row items-center justify-evenly gap-12 p-4">
        <button className="border-amber-50 hover:-translate-y-2 hover:bg-[rgba(255,255,255,0.3)] duration-300 ease-linear transition-all border bg-transparent rounded-[40px] py-3 px-8 text-amber-100 font-semibold text-xl">
          Tudo
        </button>
        <button className="border-amber-50 hover:-translate-y-2 hover:bg-[rgba(255,255,255,0.3)] duration-200 ease-linear transition-all border rounded-[40px] py-3 px-8 text-amber-100 font-semibold text-xl">
          Sandálias
        </button>
        <button className="border-amber-50 hover:-translate-y-2 hover:bg-[rgba(255,255,255,0.3)] duration-200 ease-linear transition-all border rounded-[40px] py-3 px-8 text-amber-100 font-semibold text-xl">
          Rasteirinhas
        </button>
        <button className="border-amber-50 hover:-translate-y-2 hover:bg-[rgba(255,255,255,0.3)] duration-200 ease-linear transition-all border rounded-[40px] py-3 px-8 text-amber-100 font-semibold text-xl">
          Sapatilhas
        </button>
        <button className="border-amber-50 hover:-translate-y-2 hover:bg-[rgba(255,255,255,0.3)] duration-200 ease-linear transition-all border rounded-[40px] py-3 px-8 text-amber-100 font-semibold text-xl">
          Tamancos
        </button>
      </nav>
    </menu>
  );
}
