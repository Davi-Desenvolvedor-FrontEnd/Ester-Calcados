import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="min-h-44 w-full bg-pink-900 flex flex-col p-2 gap-4">
      <div className="self-center justify-center text-amber-50 flex flex-row gap-18">
        <div className="p-4 w-1/4 text-xl font-['Times_New_Roman']">
          <h4 className="font-['Cookie'] text-3xl font-medium">
            Ester Calçados
          </h4>
          <div className="bg-amber-200 w-full rounded-4xl h-0.5 my-3"></div>
          <p className="text-[0.7em]">
            Fundada em 2006, a Ester Calçados construiu sua trajetória com base
            na qualidade e no atendimento personalizado. Há mais de 15 anos no
            mercado, a loja se tornou referência em conforto e estilo,
            oferecendo uma curadoria de calçados para toda a família. Sua
            tradição é calçada no compromisso de proporcionar a melhor
            experiência a cada cliente que entra em sua loja.
          </p>
        </div>
        <div className="p-4 w-1/4 text-xl font-['Times_New_Roman']">
          <h4 className="font-['Cookie'] text-3xl font-medium">
            Horário de Funcionamento
          </h4>
          <div className="bg-amber-200 w-full rounded-4xl h-0.5 my-3"></div>
          <p className="flex flex-row text-[0.7em] justify-between">
            Segunda à sexta: <span>8h - 18h</span>
          </p>
          <p className="flex flex-row text-[0.7em] justify-between">
            Sábado: <span>8h - 12h</span>
          </p>
          <p className="flex flex-row text-[0.7em] justify-between">
            Domingo: <span>Fechado</span>
          </p>
        </div>
        <div className="p-4 w-1/4 text-xl font-['Times_New_Roman']">
          <h4 className="font-['Cookie'] text-3xl font-medium">Contato</h4>
          <div className="bg-amber-200 w-full rounded-4xl h-0.5 my-3"></div>
          <div className="flex flex-row gap-4 my-4">
            <FaMapMarkerAlt className="text-xl text-purple-700" />
            <p className="text-[0.7em]">Rua Júlio Borges Santana, 184</p>
          </div>
          <div className="flex flex-row gap-4 my-4">
            <FaPhoneAlt className="text-xl text-purple-700" />
            <p className="text-[0.7em]">(34) 98844-0545</p>
          </div>
        </div>
      </div>
      <div className="bg-amber-50 h-[.1px] w-[75%] self-center my-4"></div>
      <p className="text-amber-100 text-2xl text-center font-['Times_New_Roman']">
        © 2025 Ester Calçados. Todos os direitos reservados.
      </p>
    </footer>
  );
}
