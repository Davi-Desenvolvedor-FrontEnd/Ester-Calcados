import { ChevronDown } from "lucide-react";
import type { OrdenacaoOpcao, Produto } from "../types";
import ProductCard from "./ProductCard";

const OPCOES_ORDENACAO: { value: OrdenacaoOpcao; label: string }[] = [
  { value: "mais-vendidos", label: "Mais vendidos" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "melhor-avaliados", label: "Melhor avaliados" },
];

interface ProductContainerProps {
  produtos: Produto[];
  ordenacao: OrdenacaoOpcao;
  onAlterarOrdenacao: (valor: OrdenacaoOpcao) => void;
}

export default function ProductContainer({
  produtos,
  ordenacao,
  onAlterarOrdenacao,
}: ProductContainerProps) {
  return (
    <section id="destaques" aria-labelledby="destaques-titulo">
      <div className="mb-5 flex-3 flex flex-wrap items-center justify-between gap-3">
        <h2
          id="destaques-titulo"
          className="flex items-center gap-2 font-display text-xl font-semibold text-plum-900"
        >
          <span className="h-5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
          Destaques
        </h2>

        <div className="flex items-center gap-2 text-sm text-plum-600">
          <label htmlFor="ordenar-por" className="whitespace-nowrap">
            Ordenar por:
          </label>
          <div className="relative">
            <select
              id="ordenar-por"
              value={ordenacao}
              onChange={(e) => onAlterarOrdenacao(e.target.value as OrdenacaoOpcao)}
              className="appearance-none rounded-full border border-brand-100 bg-white py-2 pl-4 pr-9 text-sm font-medium text-plum-800 outline-none focus:border-brand-300 cursor-pointer"
            >
              {OPCOES_ORDENACAO.map((op) => (
                <option key={op.value} value={op.value}>
                  {op.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-plum-400"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {produtos.length === 0 ? (
        <div className="rounded-2xl py-16 text-center">
          <p className="text-plum-700">
            Nenhum produto encontrado com os filtros selecionados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {produtos.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </section>
  );
}