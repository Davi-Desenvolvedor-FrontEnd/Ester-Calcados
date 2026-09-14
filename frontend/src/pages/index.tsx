import { useEffect, useState } from "react";
import Footer from "../components/Footer.tsx";
import ProductContainer from "../components/ProductContainer.tsx";
import SideBar, { type FilterState } from "../components/SideBar.tsx";
import Benefits from "../components/Benefits.tsx";
import Hero from "../components/Hero.tsx";
import type { OrdenacaoOpcao, Produto } from "../types/index.tsx";

export default function App() {
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const closeSideBar = () => setSideBarVisible(false);

  const [produtosLista, setProdutosLista] = useState<Produto[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);
  const [ordenacao, setOrdenacao] = useState<OrdenacaoOpcao>("mais-vendidos");

  const [filtros, setFiltros] = useState<FilterState>({
    priceRange: { min: 0, max: 1000 },
    categories: [1, 2, 3],
    disponivel: false,
    promocao: false,
    novidades: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:3000/produtos");
        if (!response.ok) {
          throw new Error(`Erro no servidor: ${response.status}`);
        }
        const dados = await response.json();
        setProdutosLista(dados.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    })();
  }, []);

  const aplicarFiltrosEOrdenacao = (
    produtos: Produto[],
    filtrosAtuais: FilterState,
    ordemAtual: OrdenacaoOpcao,
  ) => {
    // 1. Filtragem
    let resultado = produtos.filter((produto) => {
      const preco = produto.preco;
      const dentroDoPreco =
        preco >= filtrosAtuais.priceRange.min &&
        preco <= filtrosAtuais.priceRange.max;

      const categoriaValida = filtrosAtuais.categories.includes(
        produto.categoria_id,
      );

      const atendeDisponivel = filtrosAtuais.disponivel
        ? produto.estoque > 0
        : true;

      const atendePromocao = filtrosAtuais.promocao
        ? produto.desconto > 0
        : true;

      const atendeNovidades = filtrosAtuais.novidades ? produto.destaque : true;

      return (
        dentroDoPreco &&
        categoriaValida &&
        atendeDisponivel &&
        atendePromocao &&
        atendeNovidades
      );
    });

    // 2. Ordenação
    resultado = [...resultado].sort((a, b) => {
      const precoA =
        a.desconto > 0 ? a.preco * (1 - a.desconto / 100) : a.preco;
      const precoB =
        b.desconto > 0 ? b.preco * (1 - b.desconto / 100) : b.preco;

      switch (ordemAtual) {
        case "menor-preco":
          return precoA - precoB;
        case "maior-preco":
          return precoB - precoA;
        case "melhor-avaliados":
          return (b.avaliacao_media ?? 0) - (a.avaliacao_media ?? 0);
        case "mais-vendidos":
        default:
          return b.id - a.id;
      }
    });

    return resultado;
  };

  useEffect(() => {
    const filtradosEOrdenados = aplicarFiltrosEOrdenacao(
      produtosLista,
      filtros,
      ordenacao,
    );
    setProdutosFiltrados(filtradosEOrdenados);
  }, [produtosLista, filtros, ordenacao]);

  const handleFilterChange = (novosFiltros: FilterState) => {
    setFiltros(novosFiltros);
  };

  useEffect(() => {
    document.body.style.overflowY = sideBarVisible ? "hidden" : "unset";
    return () => {
      document.body.style.overflowY = "unset";
    };
  }, [sideBarVisible]);

  return (
    <div className="w-full min-h-screen bg-[#fafafb] flex flex-col font-['Poppins',sans-serif]">
      <main className="flex max-w-360 mx-auto w-full p-4 md:p-8 gap-8 flex-col">
        <Hero />
        <Benefits />

        <div className="flex flex-row flex-1 gap-8 w-full">
          {sideBarVisible && (
            <div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={closeSideBar}
            />
          )}
          <SideBar
            isOpen={sideBarVisible}
            onClose={closeSideBar}
            initialFilters={filtros}
            onFilterChange={handleFilterChange}
            className={`
            fixed top-0 left-0 z-50 h-full w-80 bg-white shadow-xl transition-all duration-300 ease-in-out
            ${
              sideBarVisible
                ? "translate-x-0 opacity-100 pointer-events-auto"
                : "-translate-x-full opacity-0 pointer-events-none"
            }
            lg:sticky lg:top-24 lg:z-0 lg:h-fit lg:w-80 lg:shrink-0 lg:translate-x-0 lg:opacity-100 lg:pointer-events-auto lg:shadow-none
           `}  
          />
          <ProductContainer
            produtos={produtosFiltrados}
            ordenacao={ordenacao}
            onAlterarOrdenacao={(novaOrdenacao) => setOrdenacao(novaOrdenacao)}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
