import { FaArrowLeft } from "react-icons/fa";

interface ButtonBackProps {
  onPress: () => void;
  label?: string;
}

export default function ({ onPress, label }: ButtonBackProps) {
  return (
    <button className="self-start mt-4 bg-pink-600 rounded-full p-2 border-4 border-pink-800 shadow-2xl cursor-pointer" onClick={onPress} >
      <FaArrowLeft
        size={30}
        onClick={onPress}
        className="text-amber-50"
      />
    </button>
  );
}
