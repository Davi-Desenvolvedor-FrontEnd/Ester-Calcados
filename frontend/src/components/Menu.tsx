import { FaClock, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function () {
  return (
    <menu className="w-full flex items-center justify-around ">
      <div className="flex flex-row gap-2 items-center">
        <FaPhoneAlt className="bg-icon" />
        <p className="text-(--text) text-2xl max-md:text-base font-['Cookie']">
          (34) 099383-39399
        </p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <FaClock className="bg-icon" />
        <p className="text-(--text) text-2xl max-md:text-base font-['Cookie']">
          Segunda a sexta: 8:00 até 18:00
        </p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <FaMapMarkerAlt className="bg-icon" />
        <p className="text-(--text) text-2xl max-md:text-base font-['Cookie']">
          Rua julio borges santana, 184
        </p>
      </div>
    </menu>
  );
}
