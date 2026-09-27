import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaRegStar,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaShareAlt,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  FaStore,
  FaExchangeAlt,
  FaShieldAlt,
  FaSpinner,
  FaTruck,
  FaCreditCard,
  FaUndo,
  FaTag,
  FaBox,
  FaClock,
  FaMedal,
  FaAward,
  FaLeaf,
  FaRecycle,
  FaExclamationCircle,
  FaCheckCircle,
  FaCommentDots,
} from "react-icons/fa";
import ProductCard from "../../components/ProductCard";
import type { Produto } from "../../types";
import { getToken, getUserId } from "../../auth";

type ProductPageProps = {
  id: string;
};

// Formato de avaliação retornado pela rota GET /avaliacoes/:id
type Avaliacao = {
  id: number;
  produto_id: number;
  usuario_id: number;
  nota: number;
  comentario: string;
  criado_em?: string;
};

// Usuário autenticado salvo no localStorage após o login.
// Ajuste as chaves/campos abaixo conforme o formato real usado no restante do site.
type UsuarioLogado = {
  id: any;
  token: string;
};

function getUsuarioLogado(): UsuarioLogado | null {
  try {
    const token = getToken();
    const usuarioId = getUserId();
    if (!token || !usuarioId) return null;

    return { id: usuarioId, token };
  } catch {
    return null;
  }
}

// SUBSTiTUA pelo número comercial do seu WhatsApp (DDD + Número, sem espaços ou traços)
const PHONE_NUMBER = "5534999999999";

export default function ProductPage() {
  const { id } = useParams<ProductPageProps>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Produto | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [mainPhoto, setMainPhoto] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // --- Avaliações ---
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [avaliacoesCarregadas, setAvaliacoesCarregadas] =
    useState<boolean>(false);
  const [carregandoAvaliacoes, setCarregandoAvaliacoes] =
    useState<boolean>(false);
  const [erroAvaliacoes, setErroAvaliacoes] = useState<string | null>(null);
  const [mostrarAvaliacoes, setMostrarAvaliacoes] = useState<boolean>(false);

  const [notaSelecionada, setNotaSelecionada] = useState<number>(0);
  const [notaHover, setNotaHover] = useState<number>(0);
  const [comentario, setComentario] = useState<string>("");
  const [enviandoAvaliacao, setEnviandoAvaliacao] = useState<boolean>(false);
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);
  const [sucessoEnvio, setSucessoEnvio] = useState<boolean>(false);

  const usuarioLogado = getUsuarioLogado();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const resProduct = await fetch(`http://localhost:3000/produtos/${id}`);
        if (!resProduct.ok) {
          throw new Error(
            `Produto não encontrado (Status: ${resProduct.status})`,
          );
        }
        const dataProduct = await resProduct.json();
        const produtoObtido: Produto = dataProduct.data || dataProduct;

        setProduct(produtoObtido);

        const imgUrl = `http://localhost:3000/imagens/${produtoObtido.imagem_url}`;
        setMainPhoto(imgUrl);

        const resRelated = await fetch("http://localhost:3000/produtos");
        if (resRelated.ok) {
          const dataRelated = await resRelated.json();
          const listaTotal: Produto[] = dataRelated.data || dataRelated;

          const filtrados = listaTotal
            .filter((item) => Number(item.id) !== Number(id))
            .slice(0, 4);

          setRelatedProducts(filtrados);
        }
      } catch (err: any) {
        console.error("Erro ao carregar dados da página do produto:", err);
        setError("Não foi possível carregar as informações do produto.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }

    // Reseta o estado de avaliações ao trocar de produto
    setMostrarAvaliacoes(false);
    setAvaliacoesCarregadas(false);
    setAvaliacoes([]);
    setNotaSelecionada(0);
    setComentario("");
    setSucessoEnvio(false);
    setErroEnvio(null);
  }, [id]);

  const fetchAvaliacoes = async () => {
    if (!id) return;
    setCarregandoAvaliacoes(true);
    setErroAvaliacoes(null);
    try {
      const res = await fetch(`http://localhost:3000/avaliacoes/${id}`, {
        method: "GET",
      });
      const data = await res.json();

      console.log(data)

      if (!res.ok || !data.success) {
        throw new Error(
          data.message || "Não foi possível carregar as avaliações.",
        );
      }

      setAvaliacoes(data.data || []);
      setAvaliacoesCarregadas(true);
    } catch (err: any) {
      console.error("Erro ao carregar avaliações:", err);
      setErroAvaliacoes(
        "Não foi possível carregar as avaliações deste produto.",
      );
    } finally {
      setCarregandoAvaliacoes(false);
    }
  };

  const handleToggleAvaliacoes = () => {
    const novoEstado = !mostrarAvaliacoes;
    setMostrarAvaliacoes(novoEstado);

    if (novoEstado && !avaliacoesCarregadas) {
      fetchAvaliacoes();
    }

    if (novoEstado) {
      setTimeout(() => {
        document
          .getElementById("secao-avaliacoes")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const handleEnviarAvaliacao = async (e: React.FormEvent) => {
    e.preventDefault();
    setErroEnvio(null);
    setSucessoEnvio(false);

    if (!product) return;

    if (notaSelecionada === 0) {
      setErroEnvio("Selecione uma nota de 1 a 5 estrelas.");
      return;
    }

    if (!usuarioLogado) {
      setErroEnvio("Você precisa estar logado para avaliar este produto.");
      return;
    }

    setEnviandoAvaliacao(true);
    try {
      const res = await fetch("http://localhost:3000/avaliacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuarioLogado.token}`,
        },
        body: JSON.stringify({
          produto_id: product.id,
          usuario_id: usuarioLogado.id,
          nota: notaSelecionada,
          comentario,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.message || "Não foi possível enviar sua avaliação.",
        );
      }

      const novaAvaliacao: Avaliacao = {
        id: data.data?.id ?? Date.now(),
        produto_id: Number(product.id),
        usuario_id: usuarioLogado.id,
        nota: notaSelecionada,
        comentario,
      };

      setAvaliacoes((prev) => [novaAvaliacao, ...prev]);
      setAvaliacoesCarregadas(true);

      // Atualiza a média/total exibidos na tela sem precisar recarregar a página
      setProduct((prev) => {
        if (!prev) return prev;
        const totalAtual = prev.avaliacao_total || 0;
        const mediaAtual = prev.avaliacao_media || 0;
        const novoTotal = totalAtual + 1;
        const novaMedia =
          (mediaAtual * totalAtual + notaSelecionada) / novoTotal;
        return {
          ...prev,
          avaliacao_total: novoTotal,
          avaliacao_media: Math.round(novaMedia * 100) / 100,
        };
      });

      setNotaSelecionada(0);
      setComentario("");
      setSucessoEnvio(true);
    } catch (err: any) {
      setErroEnvio(err.message || "Erro ao enviar avaliação.");
    } finally {
      setEnviandoAvaliacao(false);
    }
  };

  const handleBuyViaWhatsApp = () => {
    if (!product) return;

    // Obtém o link atual da página do produto hospedada na Vercel/Netlify
    const productUrl = window.location.href;

    // Monta a mensagem incluindo o link e o nome do produto
    let message = `${productUrl}\n\nOlá, quero comprar '${product.nome}'`;

    if (quantity > 1) {
      message += ` - Qtd: ${quantity}`;
    }

    // Codifica a mensagem para o formato de URL
    const encodedMessage = encodeURIComponent(message);

    // Abre o WhatsApp Comercial em uma nova aba
    window.open(
      `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`,
      "_blank",
    );
  };

  const renderStars = (ratingValue: number = 0) => {
    return Array.from({ length: 5 }, (_, i) => {
      const isFilled = i + 1 <= Math.round(ratingValue);
      return isFilled ? (
        <FaStar key={i} className="text-(--secondary) text-[14px]" />
      ) : (
        <FaRegStar key={i} className="text-gray-600 text-[14px]" />
      );
    });
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#fafafb] text-(--secondary) gap-3">
        <FaSpinner className="animate-spin text-4xl" />
        <p className="font-medium text-(--text)">Carregando produto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#fafafb] text-center p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Ops! Produto não encontrado.
        </h2>
        <p className="text-gray-500 mb-6">
          {error || "Não encontramos as informações deste item."}
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-(--secondary) text-white rounded-xl font-medium shadow-md hover:bg-[#7a3bb8] transition-colors"
        >
          Voltar para a página inicial
        </button>
      </div>
    );
  }

  const precoOriginal = Number(product.preco);
  const temDesconto = product.desconto > 0;
  const precoComDesconto = temDesconto
    ? precoOriginal * (1 - product.desconto / 100)
    : precoOriginal;

  const tamanhosDisponiveis = product.tamanhos
    ? product.tamanhos.split(";")
    : [];

  return (
    <div className="bg-[#fafafb] min-h-screen font-['Poppins',sans-serif]">
      <main className="max-w-360 mx-auto px-4 md:px-8 py-8 md:py-12">
        <section className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 mb-16">
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square bg-white rounded-3xl relative flex items-center justify-center p-6 overflow-hidden border border-gray-100 shadow-sm">
              {temDesconto && (
                <div className="absolute top-4 left-4 bg-(--secondary) text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm z-10">
                  {product.desconto}% OFF
                </div>
              )}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="w-9 h-9 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-(--secondary) shadow-sm transition-colors"
                >
                  {isFavorite ? (
                    <FaHeart className="text-(--secondary)" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
                <button className="w-9 h-9 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-(--secondary) shadow-sm transition-colors">
                  <FaShareAlt />
                </button>
              </div>

              <img
                src={mainPhoto}
                alt={product.nome}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex gap-8 justify-center">
              <div className="w-20 h-20 overflow-hidden flex items-center justify-center bg-white cursor-pointer">
                <img
                  src={mainPhoto}
                  alt="thumb 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-20 h-20 overflow-hidden flex items-center justify-center bg-white cursor-pointer hover:border-(--secondary) transition-colors">
                <img
                  src={mainPhoto}
                  alt="thumb 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-20 h-20 overflow-hidden flex items-center justify-center bg-white cursor-pointer hover:border-(--secondary) transition-colors">
                <img
                  src={mainPhoto}
                  alt="thumb 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-20 h-20 overflow-hidden flex items-center justify-center bg-white cursor-pointer hover:border-(--secondary) transition-colors">
                <img
                  src={mainPhoto}
                  alt="thumb 4"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <nav className="text-sm text-gray-400 mb-4">
              Início &gt; Produtos &gt;{" "}
              <span className="text-(--primary) font-medium">
                {product.nome}
              </span>
            </nav>

            <div className="flex gap-2 mb-3 flex-wrap">
              {Boolean(product.destaque) && (
                <span className="bg-purple-50 text-(--secondary) text-xs font-semibold px-2.5 py-1 rounded-md">
                  Destaque
                </span>
              )}
              {product.estoque > 0 ? (
                <span className="bg-emerald-50 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-md">
                  Em Estoque ({product.estoque})
                </span>
              ) : (
                <span className="bg-red-50 text-red-500 text-xs font-semibold px-2.5 py-1 rounded-md">
                  Esgotado
                </span>
              )}
            </div>

            <h1 className="text-2xl font-medium text-gray-800 mb-2 font-[Poppins]">
              {product.nome}
            </h1>

            {/* Avaliações */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {renderStars(product.avaliacao_media || 0)}
              </div>
              <button
                onClick={handleToggleAvaliacoes}
                className="text-sm text-gray-500 font-medium hover:text-(--secondary) hover:underline transition-colors cursor-pointer"
              >
                ({product.avaliacao_total || 0} avaliações)
              </button>
            </div>

            {/* Preços */}
            <div className="mb-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-(--secondary)">
                  R$ {precoComDesconto.toFixed(2).replace(".", ",")}
                </span>
                {temDesconto && (
                  <span className="text-lg text-gray-400 line-through">
                    R$ {precoOriginal.toFixed(2).replace(".", ",")}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-(--text) leading-relaxed mb-6">
              {product.descricao ||
                "Sem descrição disponível para este produto."}
            </p>

            {tamanhosDisponiveis.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Tamanhos disponíveis:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tamanhosDisponiveis.map((size: any) => (
                    <div
                      key={size}
                      className="h-10 min-w-10 px-3 rounded-md border text-sm font-medium transition-all justify-center items-center flex border-gray-500 text-gray-700"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 mt-auto">
              <h3 className="text-sm font-semibold text-gray-800">
                Quantidade:
              </h3>
              <div className="flex gap-4">
                <div className="flex items-center justify-between border border-gray-200 rounded-xl h-12 px-4 bg-white w-28">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-(--secondary) p-1 disabled:opacity-40"
                    disabled={quantity <= 1}
                  >
                    <FaMinus className="text-xs" />
                  </button>
                  <span className="font-semibold text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-(--secondary) p-1"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                </div>

                <button
                  onClick={handleBuyViaWhatsApp}
                  disabled={product.estoque === 0}
                  className="px-6 h-12 bg-(--secondary) hover:bg-[#7a3bb8] disabled:bg-gray-300 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-md shadow-purple-100 cursor-pointer"
                >
                  <FaShoppingBag className="text-lg" />
                  <span>Comprar agora</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-6">
              <div className="bg-white p-3 rounded-xl border border-gray-100 flex flex-col items-center text-center gap-1">
                <FaTruck className="text-xl text-(--secondary)" />
                <p className="text-xs font-semibold text-gray-800">
                  Frete Grátis
                </p>
                <p className="text-[10px] text-gray-500">Acima de R$ 200</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-100 flex flex-col items-center text-center gap-1">
                <FaCreditCard className="text-xl text-(--secondary)" />
                <p className="text-xs font-semibold text-gray-800">
                  12x sem juros
                </p>
                <p className="text-[10px] text-gray-500">
                  No cartão de crédito
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-100 flex flex-col items-center text-center gap-1">
                <FaUndo className="text-xl text-(--secondary)" />
                <p className="text-xs font-semibold text-gray-800">
                  Troca Fácil
                </p>
                <p className="text-[10px] text-gray-500">Até 30 dias</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-8 border-t border-gray-200/60">
          <div className="flex gap-8 mb-8 border-b border-gray-200 overflow-x-auto">
            <button className="text-base font-semibold pb-4 text-(--secondary) border-b-2 border-(--secondary) whitespace-nowrap">
              Detalhes do produto
            </button>
            <button
              onClick={handleToggleAvaliacoes}
              className={`text-base font-medium pb-4 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                mostrarAvaliacoes
                  ? "text-(--secondary) border-b-2 border-(--secondary)"
                  : "text-gray-400 hover:text-(--text)"
              }`}
            >
              Avaliações ({product.avaliacao_total || 0})
              {mostrarAvaliacoes ? (
                <FaChevronUp className="text-[10px]" />
              ) : (
                <FaChevronDown className="text-[10px]" />
              )}
            </button>
            <button className="text-base font-medium pb-4 text-gray-400 hover:text-(--text) transition-colors whitespace-nowrap">
              Dúvidas frequentes
            </button>
            <button className="text-base font-medium pb-4 text-gray-400 hover:text-(--text) transition-colors whitespace-nowrap">
              Envio e devolução
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaBox className="text-(--secondary)" />
                Informações técnicas
              </h3>
              <ul className="flex flex-col text-sm divide-y divide-gray-100">
                <li className="flex py-3">
                  <span className="w-1/2 font-semibold text-gray-800">
                    Código do produto
                  </span>
                  <span className="text-(--text)">#{product.id}</span>
                </li>
                <li className="flex py-3">
                  <span className="w-1/2 font-semibold text-gray-800">
                    Estoque
                  </span>
                  <span className="text-(--text)">
                    {product.estoque} unidades
                  </span>
                </li>
                <li className="flex py-3">
                  <span className="w-1/2 font-semibold text-gray-800">
                    Tamanhos
                  </span>
                  <span className="text-(--text)">
                    {tamanhosDisponiveis.join(",") || "Consulte a loja"}
                  </span>
                </li>
                <li className="flex py-3">
                  <span className="w-1/2 font-semibold text-gray-800">
                    Categoria
                  </span>
                  <span className="text-(--text)">Moda & Acessórios</span>
                </li>
                <li className="flex py-3">
                  <span className="w-1/2 font-semibold text-gray-800">SKU</span>
                  <span className="text-(--text)">
                    SKU-{product.id}-00{product.id}
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaMedal className="text-(--secondary)" />
                Benefícios exclusivos
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <FaTag className="text-(--secondary) mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      Preço imperdível
                    </p>
                    <p className="text-gray-500">
                      Ofertas exclusivas em produtos selecionados
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaClock className="text-(--secondary) mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      Entrega rápida
                    </p>
                    <p className="text-gray-500">Receba em até 3 dias úteis</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaAward className="text-(--secondary) mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      Produto original
                    </p>
                    <p className="text-gray-500">Garantia de autenticidade</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaLeaf className="text-(--secondary) mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      Embalagem sustentável
                    </p>
                    <p className="text-gray-500">
                      Compromisso com o meio ambiente
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Coluna 3 - Políticas */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaShieldAlt className="text-(--secondary)" />
                Políticas da loja
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <FaStore className="text-(--secondary) mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      Retirada na loja
                    </p>
                    <p className="text-gray-500">
                      Disponível para retirada em até 2h
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaExchangeAlt className="text-(--secondary) mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      Troca garantida
                    </p>
                    <p className="text-gray-500">
                      Até 7 dias após o recebimento
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaRecycle className="text-(--secondary) mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      Devolução gratuita
                    </p>
                    <p className="text-gray-500">Primeira troca sem custos</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaCreditCard className="text-(--secondary) mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      Pagamento seguro
                    </p>
                    <p className="text-gray-500">Ambiente criptografado SSL</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Descrição detalhada */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-12">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Descrição completa
            </h3>
            <div className="prose prose-sm max-w-none text-(--text) leading-relaxed space-y-4">
              <p>
                <strong>{product.nome}</strong> - Este produto foi
                cuidadosamente selecionado para oferecer a melhor experiência
                aos nossos clientes. Com design moderno e acabamento impecável,
                é a escolha perfeita para quem busca qualidade e estilo.
              </p>
              <p>
                <strong>Características principais:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Material de primeira linha, garantindo durabilidade e conforto
                </li>
                <li>Design exclusivo que combina com diversos estilos</li>
                <li>Acabamento premium com atenção aos detalhes</li>
                <li>Ideal para uso diário ou ocasiões especiais</li>
                <li>Fácil manutenção e limpeza</li>
              </ul>
              <p>
                <strong>Especificações técnicas:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Composição: Materiais de alta qualidade</li>
                <li>Origem: Produção nacional com padrões internacionais</li>
                <li>Garantia: 3 meses contra defeitos de fabricação</li>
                <li>Peso aproximado: 0.5kg - 1.0kg</li>
              </ul>
              <p>
                Ao adquirir este produto, você está investindo em qualidade e
                estilo. Nossa loja oferece garantia de satisfação e suporte
                completo para sua melhor experiência de compra.
              </p>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  Produtos que combinam com este item
                </h2>
                <button
                  onClick={() => navigate("/")}
                  className="text-(--secondary) font-medium hover:underline flex items-center gap-1 text-sm"
                >
                  Ver todos <FaChevronRight className="text-xs" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((item) => (
                  <ProductCard
                    key={item.id}
                    produto={{
                      id: item.id,
                      nome: item.nome,
                      descricao: item.descricao,
                      destaque: item.destaque,
                      estoque: item.estoque,
                      imagem_url: `http://localhost:3000/imagens/${item.imagem_url}`,
                      preco: item.preco,
                      avaliacao_media: item.avaliacao_media ?? 0,
                      avaliacao_total: item.avaliacao_total ?? 0,
                      desconto: item.desconto,
                      categoria_id: item.categoria_id,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Avaliações do produto: escondida por padrão, aparece ao clicar no número de avaliações */}
          {mostrarAvaliacoes && (
            <div
              id="secao-avaliacoes"
              className="pt-8 border-t border-gray-200/60"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                <FaCommentDots className="text-(--secondary)" />
                Avaliações do produto
              </h2>

              {/* Formulário de nova avaliação */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
                <h3 className="text-base font-bold text-gray-800 mb-4">
                  Deixe sua avaliação
                </h3>

                {erroEnvio && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
                    <FaExclamationCircle className="shrink-0" />
                    <span>{erroEnvio}</span>
                  </div>
                )}

                {sucessoEnvio && (
                  <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 mb-4">
                    <FaCheckCircle className="shrink-0" />
                    <span>Avaliação enviada com sucesso!</span>
                  </div>
                )}

                {!usuarioLogado ? (
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm text-gray-600">
                    Você precisa estar logado para avaliar este produto.{" "}
                    <button
                      onClick={() => navigate("/login")}
                      className="text-(--secondary) font-semibold hover:underline cursor-pointer"
                    >
                      Fazer login
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleEnviarAvaliacao}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-semibold text-gray-800">
                        Sua nota:
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((valor) => {
                          const preenchida =
                            valor <= (notaHover || notaSelecionada);
                          return (
                            <button
                              key={valor}
                              type="button"
                              onClick={() => setNotaSelecionada(valor)}
                              onMouseEnter={() => setNotaHover(valor)}
                              onMouseLeave={() => setNotaHover(0)}
                              className="text-2xl transition-colors cursor-pointer"
                              aria-label={`Dar nota ${valor} de 5`}
                            >
                              {preenchida ? (
                                <FaStar className="text-(--secondary)" />
                              ) : (
                                <FaRegStar className="text-gray-300" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="comentario-avaliacao"
                        className="text-sm font-semibold text-gray-800"
                      >
                        Seu comentário:
                      </label>
                      <textarea
                        id="comentario-avaliacao"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        placeholder="Conte o que você achou do produto..."
                        rows={3}
                        className="w-full resize-none border border-gray-200 rounded-xl px-4 py-3 text-sm text-(--text) focus:outline-none focus:border-(--secondary) transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={enviandoAvaliacao}
                      className="self-start px-6 h-11 bg-(--secondary) hover:bg-[#7a3bb8] disabled:bg-gray-300 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      {enviandoAvaliacao ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <span>Enviar avaliação</span>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Lista de avaliações */}
              {carregandoAvaliacoes ? (
                <div className="flex items-center justify-center gap-2 text-gray-500 py-8">
                  <FaSpinner className="animate-spin" />
                  <span>Carregando avaliações...</span>
                </div>
              ) : erroAvaliacoes ? (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  <FaExclamationCircle className="shrink-0" />
                  <span>{erroAvaliacoes}</span>
                </div>
              ) : avaliacoes.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">
                  Nenhuma avaliação ainda. Seja o primeiro a avaliar este
                  produto!
                </p>
              ) : (
                <div className="flex flex-col gap-4">
                  {avaliacoes.map((avaliacao) => (
                    <div
                      key={avaliacao.id}
                      className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {renderStars(avaliacao.nota)}
                        </div>
                        <span className="text-xs text-gray-400 font-medium">
                          Nota {avaliacao.nota}/5
                        </span>
                      </div>
                      <p className="text-sm text-(--text) leading-relaxed">
                        {avaliacao.comentario || "Sem comentário."}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
