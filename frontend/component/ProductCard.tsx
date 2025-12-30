interface ProductCardProps {
  id?: number;
  name?: string;
  value?: number;
  description?: string;
  photo?: string;
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <div
      key={props.id}
      className="flex flex-col overflow-hidden  border-gray-400 bg-amber-50 text-xl shadow-lg shadow-gray-700/30"
    >
      <div className="w-90 h-55 ">
        <img
          className="w-full h-full object-cover object-center"
          src={props.photo}
          alt=""
        />
      </div>
      <div className="w-90 h-60 p-5 flex flex-col">
        <h4 className="text-2xl font-['Alfa_Slab_One'] text-pink-950">
          {props.name}
        </h4>
        <h5 className="text-purple-700 mt-auto text-2xl text-start font-['Arial'] font-bold">
          R$ {props.value}
        </h5>
        <button className="text-white mt-auto self-start font-semibold text-[15px] rounded-2xl border-0 bg-linear-65 from-purple-700 to-purple-500 py-2 px-2 flex items-center cursor-pointer hover:shadow-lg hover:shadow-purple-700/70 hover:-translate-y-2 transition-all duration-300 ease-in-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-plus text-amber-50"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
