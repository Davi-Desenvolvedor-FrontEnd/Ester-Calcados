import { useEffect, useState } from "react";
import Footer from "../components/Footer.tsx";
import Menu from "../components/Menu.tsx";
import ProductCard from "../components/ProductCard.tsx";
import ProductContainer from "../components/ProductContainer.tsx";
import SideBar from "../components/SideBar.tsx";

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  estoque: number;
  imagem_url: string;
  desconto: number;
  avaliacao_media?: number;
  avaliacao_total?: number;
  categoria_id: number;
  destaque: boolean;
  criado_em?: Date;
  atualizado_em?: Date;
  tamanhos: string;
}

interface FilterState {
  priceRange: {
    min: number;
    max: number;
  };
  categories: number[];
}

export default function App() {
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const closeSideBar = () => setSideBarVisible(false);
  const toggleSideBar = () => setSideBarVisible((prev) => !prev);
  const [produtosLista, setProdutosLista] = useState<Produto[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);

  const [filtros, setFiltros] = useState<FilterState>({
    priceRange: { min: 0, max: 1000 },
    categories: [1, 2, 3],
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:3000/produtos", {
          method: "GET",
        });
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

  const aplicarFiltros = (produtos: any[], filtros: FilterState) => {
    return produtos.filter((produto) => {
      const preco = produto.preco;
      const dentroDoPreco =
        preco >= filtros.priceRange.min && preco <= filtros.priceRange.max;

      const categoriaValida = filtros.categories.includes(produto.categoria_id);

      return dentroDoPreco && categoriaValida;
    });
  };

  useEffect(() => {
    if (produtosLista.length > 0) {
      const filtrados = aplicarFiltros(produtosLista, filtros);
      setProdutosFiltrados(filtrados);
    }
  }, [produtosLista, filtros]);

  const handleFilterChange = (novosFiltros: FilterState) => {
    setFiltros(novosFiltros);
  };

  useEffect(() => {
    if (sideBarVisible) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "unset";
    }

    // Cleanup para quando o componente desmontar
    return () => {
      document.body.style.overflowY = "unset";
    };
  }, [sideBarVisible]);

  return (
    <div className="w-full min-h-screen bg-[#fafafb] flex flex-col font-['Poppins',sans-serif]">
      <main className="flex max-w-360 mx-auto w-full p-4 md:p-8 gap-8">
        {sideBarVisible && (
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={closeSideBar}
          />
        )}
        <SideBar
          isOpen={sideBarVisible}
          onClose={closeSideBar}
          onFilterChange={handleFilterChange}
          initialFilters={filtros}
          className={`
          transition-all duration-500 pb-8 ease-in-out
          fixed z-50
          top-0 left-0 h-full shadow-xl flex flex-col bg-white
          ${
            sideBarVisible
              ? "w-70 translate-x-0 opacity-100 pointer-events-auto"
              : "w-70 -translate-x-full opacity-0 pointer-events-none"
          }
        `}
        />
        <div className="flex flex-col flex-1 gap-8 w-full">
          <Menu onToggleSideBar={toggleSideBar} />
          <ProductContainer>
            {produtosFiltrados.map((item: Produto) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.nome}
                description={item.descricao}
                destaque={item.destaque}
                estoque={item.estoque}
                photo={`http://localhost:3000/imagens/${item.imagem_url}`}
                price={item.preco}
                rating={item.avaliacao_media ?? 0}
                nRating={item.avaliacao_total ?? 0}
                desconto={item.desconto}
              />
            ))}
          </ProductContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
}
