interface RightProps {
  onClickRight: () => void;
  label: string;
  active: boolean;
}
interface LeftProps {
  onClickLeft: () => void;
  label: string;
  active: boolean;
}
interface ContentButtonChangeProps {
  right: RightProps;
  left: LeftProps;
}

export default function ({ right, left }: ContentButtonChangeProps) {
  return (
    <div className="w-full rounded-3xl h-12 relative bg-purple-300 mx-auto flex mb-8 shadow-md">
      <div
        className={`bg-linear-to-bl duration-300 transform ease-in-out from-pink-500 to-purple-700 rounded-3xl w-1/2 h-full absolute ${
          left.active ? "" : "translate-x-full"
        }`}
      ></div>
      <button
        type="button"
        className={`relative flex flex-row items-center justify-center w-1/2 h-full rounded-3xl border-0 text-base font-medium text-amber-50 ${
          left.active ? "" : "text-purple-700"
        }`}
        onClick={left.onClickLeft}
      >
        {left.label}
      </button>
      <button
        type="button"
        className={`relative flex flex-row items-center justify-center w-1/2 h-full rounded-3xl border-0 text-base font-medium text-amber-50 ${
          right.active ? "" : "text-purple-700"
        }`}
        onClick={right.onClickRight}
      >
        {right.label}
      </button>
    </div>
  );
}
