"use client";

interface DrawerProps {
  visible: boolean;
  onClose: () => void;
}

export default function Drawer(props: DrawerProps) {
  return (
    <div
      className={`bg-amber-50 h-full fixed w-100 top-0 right-0 z-100 transform transition-transform duration-300 ease-in-out flex flex-col ${
        props.visible ? "translate-x-0 " : "translate-x-full"
      }`}
    >
      <header className="bg-purple-700 w-full h-1/5 flex justify-between items-center p-4 gap-4">
        <span className="flex gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-basket3-fill text-amber-50"
            viewBox="0 0 16 16"
          >
            <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z" />
          </svg>
          <h1 className="font-semibold text-4xl font-['Cookie'] text-amber-200">
            Seu pedido
          </h1>
        </span>
        <button onClick={props.onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            className="bi bi-x text-amber-50 hover:bg-gray-300/30 rounded-[50%] duration-300 cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </button>
      </header>
      <main className="h-3/5 w-full bg-gray-400/30"></main>
      <footer className="h-1/5 flex flex-col p-4 gap-4">
        <h3 className="font-['Cookie'] font-medium text-purple-700 text-4xl">
          Total:{" "}
        </h3>
        <button className="bg-purple-700 self-center text-amber-50 rounded-lg text-xl font-semibold border-0 w-full p-3 mt-4">
          Finalizar pedido
        </button>
      </footer>
    </div>
  );
}
