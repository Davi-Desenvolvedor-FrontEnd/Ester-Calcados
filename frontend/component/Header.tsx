import { FaClock, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-pink-100 border-b-8 border-b-pink-900 max-h-50 z-20 w-full text-purple-900 flex flex-row justify-around p-2 items-center">
      <div>
        <h1 className="text-6xl font-medium font-['Imperial_Script']">
          Ester Calçados
        </h1>
        <p className="text-3xl font-medium font-['Cookie']">
          Fabricando os melhores calçados femininos desde 2006
        </p>
      </div>
      <div className="flex flex-col p-4 gap-4 items-end">
        <div className="flex flex-row gap-2 items-center">
          <FaPhoneAlt />
          <p className="text-2xl font-['Cookie'] text-[#2c2c2c]">
            (34) 099383-39399
          </p>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <FaClock />
          <p className="text-2xl font-['Cookie'] text-[#2c2c2c]">
            Segunda a sexta: 8:00 até 18:00
          </p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <FaMapMarkerAlt />
          <p className="text-2xl font-['Cookie'] text-[#2c2c2c]">
            Rua julio borges santana, 184
          </p>
        </div>
      </div>
    </header>
  );
}
