export default function Footer() {
  return (
    <footer className="min-h-44 w-full bg-pink-900 flex flex-col p-4 gap-4">
      <div className="self-center justify-center text-amber-50 flex flex-row gap-4">
        <div className="p-4 w-1/4 text-xl font-['Times_New_Roman']">
          <h4 className="font-['Cookie'] text-5xl font-medium">Ester Calçados</h4>
          <div className="bg-amber-200 w-full rounded-4xl h-0.5 my-3"></div>
          <p>
            Fundada em 2006, a Ester Calçados construiu sua trajetória com base
            na qualidade e no atendimento personalizado. Há mais de 15 anos no
            mercado, a loja se tornou referência em conforto e estilo,
            oferecendo uma curadoria de calçados para toda a família. Sua
            tradição é calçada no compromisso de proporcionar a melhor
            experiência a cada cliente que entra em sua loja.
          </p>
        </div>
        <div className="p-4 w-1/4 text-xl font-['Times_New_Roman']">
          <h4 className="font-['Cookie'] text-5xl font-medium">Horário de Funcionamento</h4>
          <div className="bg-amber-200 w-full rounded-4xl h-0.5 my-3"></div>
          <p className="flex flex-row justify-between">Segunda à sexta: <span>8h - 18h</span></p>
          <p className="flex flex-row justify-between">Sábado: <span>8h - 12h</span></p>
          <p className="flex flex-row justify-between">Domingo: <span>Fechado</span></p>
        </div>
        <div className="p-4 w-1/4 text-xl font-['Times_New_Roman']">
          <h4 className="font-['Cookie'] text-5xl font-medium">Contato</h4>
          <div className="bg-amber-200 w-full rounded-4xl h-0.5 my-3"></div>
          <div className="flex flex-row gap-4 my-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-geo-alt-fill text-purple-600"
              viewBox="0 0 16 16"
            >
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
            </svg>
            <p>Rua Júlio Borges Santana, 184</p>
          </div>
          <div className="flex flex-row gap-4 my-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-telephone-fill text-purple-600"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
              />
            </svg>
            <p>(34) 98844-0545</p>
          </div>
        </div>
      </div>
      <div className="bg-amber-50 h-[.1px] w-[75%] self-center my-4"></div>
      <p className="text-amber-100 text-2xl text-center font-['Times_New_Roman']">© 2025 Ester Calçados. Todos os direitos reservados.</p>
    </footer>
  );
}
