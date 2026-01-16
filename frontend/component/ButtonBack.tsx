import { FaArrowLeft } from "react-icons/fa";

interface ButtonBackProps {
  onPress: () => void;
  label?: string;
}

export default function ({ onPress, label }: ButtonBackProps) {
  return (
    <button
      onClick={onPress}
      className="bg-linear-to-br from-pink-400 to-pink-600 mt-4 p-4 w-32 gap-2 h-12 items-center justify-center flex flex-row text-base text-amber-50 font-medium cursor-pointer transform hover:transform hover:scale-110 hover:shadow-md duration-300 border-0 rounded-4xl "
    >
      <FaArrowLeft size={24} onClick={onPress} />
      Voltar
    </button>
  );
}
