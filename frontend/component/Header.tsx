export default function Header() {
  return (
    <header className="bg-amber-100 z-20 w-full text-purple-900 flex flex-row justify-around p-4 items-center">
      <div>
        <h1 className="text-8xl font-medium font-['Imperial_Script']">
          Ester Calçados
        </h1>
        <p className="text-4xl font-medium font-['Cookie']">
          Fabricando os melhores calçados femininos desde 2006
        </p>
      </div>
      <div className="flex flex-col p-4 gap-4 items-end">
        <div className="flex flex-row gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-telephone-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
            />
          </svg>

          <p className="text-3xl font-['Cookie'] text-[#2c2c2c]">
            (34) 099383-39399
          </p>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-clock-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
          </svg>
          <p className="text-3xl font-['Cookie'] text-[#2c2c2c]">
            Segunda a sexta: 8:00 até 18:00
          </p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-geo-alt-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
          </svg>
          <p className="text-3xl font-['Cookie'] text-[#2c2c2c]">
            Rua julio borges santana, 184
          </p>
        </div>
      </div>
    </header>
  );
}
