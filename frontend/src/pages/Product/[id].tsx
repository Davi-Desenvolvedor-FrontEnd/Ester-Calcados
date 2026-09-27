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
  FaSpinner,
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

type Avaliacao = {
  id: number;
  produto_id: number;
  usuario_id: number;
  nota: number;
  comentario: string;
  criado_em?: string;
};

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
        setMainPhoto(
          `http://localhost:3000/imagens/${produtoObtido.imagem_url}`,
        );

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

    if (id) fetchData();

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
      const res = await fetch(`http://localhost:3000/avaliacoes/${id}`);
      const data = await res.json();
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
    if (novoEstado && !avaliacoesCarregadas) fetchAvaliacoes();
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
    const productUrl = window.location.href;
    let message = `${productUrl}\n\nOlá, quero comprar '${product.nome}'`;
    if (quantity > 1) message += ` - Qtd: ${quantity}`;
    const encodedMessage = encodeURIComponent(message);
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
      <main className="max-w-3/4 mx-auto px-4 md:px-4 py-8 md:py-4">
        <section className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 mb-16">
          {/* Foto */}
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
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="w-20 h-20 overflow-hidden flex items-center justify-center bg-white cursor-pointer hover:border-(--secondary) transition-colors"
                >
                  <img
                    src={mainPhoto}
                    alt={`thumb ${n}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Informações principais */}
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

          {mostrarAvaliacoes && (
            <div
              id="secao-avaliacoes"
              className="pt-8 border-t border-gray-200/60"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                <FaCommentDots className="text-(--secondary)" />
                Avaliações do produto
              </h2>
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
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
