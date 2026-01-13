interface ButtonBackProps {
  onPress: () => void;
  label: string;
}
export default function ({ onPress, label }: ButtonBackProps) {
  return (
    <button
      onClick={onPress}
      className="bg-pink-700 mt-4 p-4 w-20 h-8 items-center justify-center flex text-[16px] text-amber-50 font-medium cursor-pointer hover:transform hover:scale-[1.1] hover:shadow-[1px_1px_8px_#BE185D] duration-300 border-0 rounded-xl"
    >
      {label}
    </button>
  );
}
