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
} from "react-icons/fa";
import type { Produto } from "..";
import ProductCard from "../../components/ProductCard";

type ProductPageProps = {
  id: string;
};

// SUBSTiTUA pelo número comercial do seu WhatsApp (DDD + Número, sem espaços ou traços)
const PHONE_NUMBER = "5534999999999";

export default function ProductPage() {
  const { id } = useParams<ProductPageProps>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Produto | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [mainPhoto, setMainPhoto] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

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
  }, [id]);

  const handleBuyViaWhatsApp = () => {
    if (!product) return;

    // Obtém o link atual da página do produto hospedada na Vercel/Netlify
    const productUrl = window.location.href;

    // Monta a mensagem incluindo o link e o nome do produto
    let message = `${productUrl}\n\nOlá, quero comprar '${product.nome}'`;

    if (selectedSize) {
      message += ` (Tamanho: ${selectedSize})`;
    }

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
        <FaRegStar key={i} className="text-gray-300 text-[14px]" />
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
              <span className="text-(--text) font-medium">{product.nome}</span>
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
              <span className="text-sm text-gray-500 font-medium">
                ({product.avaliacao_total || 0} avaliações)
              </span>
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
                  {tamanhosDisponiveis.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize([...selectedSize, size])}
                      className={`h-10 min-w-10 px-3 rounded-md border text-sm font-medium transition-all ${
                        selectedSize.includes(size)
                          ? "bg-(--secondary) text-white border-(--secondary) shadow-sm"
                          : "bg-white text-gray-700 border-gray-200 hover:border-(--secondary)"
                      }`}
                    >
                      {size}
                    </button>
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
            <button className="text-base font-medium pb-4 text-gray-400 hover:text-(--text) transition-colors whitespace-nowrap">
              Avaliações ({product.avaliacao_total || 0})
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
            <div>
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
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
