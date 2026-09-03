import { FaClock, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

interface MenuProps {
  onToggleSideBar: () => void; // renomeado para consistência
}

export default function Menu({ onToggleSideBar }: MenuProps) {
  return (
    <menu className="w-full flex items-center justify-around overflow-x-scroll gap-4 px-8 py-2 no-scrollbar">
      {/* Botão de filtro – visível apenas em mobile */}
      <button
        onClick={onToggleSideBar}
        className="lg:hidden flex items-center gap-2 bg-amber-50"
      >
        <i className="fa-solid fa-sliders text-(--secondary)"></i>
        <span className="text-(--secondary)">Filtros</span>
      </button>

      {/* Info de contato (desktop e mobile) */}
      <div className="min-w-57.5 flex flex-row gap-2 items-center bg-amber-50 shadow-[1px_1px_4px_rgb(0,0,0,0.1)] py-2 px-4 rounded-md">
        <FaPhoneAlt className="text-purple-600" />
        <p className="text-gray-700 text-2xl max-md:text-base font-['Cookie']">
          (34) 099383-39399
        </p>
      </div>
      <div className="min-w-57.5 flex flex-row gap-2 items-center bg-amber-50 shadow-[1px_1px_4px_rgb(0,0,0,0.1)] py-2 px-4 rounded-md">
        <FaClock className="text-purple-600" />
        <p className="text-gray-700 text-2xl max-md:text-base font-['Cookie']">
          Segunda a sexta: 8:00 até 18:00
        </p>
      </div>
      <div className="min-w-57.5 flex flex-row gap-2 items-center bg-amber-50 shadow-[1px_1px_4px_rgb(0,0,0,0.1)] py-2 px-4 rounded-md">
        <FaMapMarkerAlt className="text-purple-600" />
        <p className="text-gray-700 text-2xl max-md:text-base font-['Cookie']">
          Rua julio borges santana, 184
        </p>
      </div>
    </menu>
  );
}
