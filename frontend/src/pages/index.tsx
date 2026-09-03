import { useState } from "react";
import Footer from "../components/Footer.tsx";
import Menu from "../components/Menu.tsx";
import ProductCard from "../components/ProductCard.tsx";
import ProductContainer from "../components/ProductContainer.tsx";
import SideBar from "../components/SideBar.tsx";

export default function App() {
  const produtos = [
    {
      id: 1,
      nome: "Sandália Salto Fino Vera",
      descricao:
        "Sandália de salto fino com tiras delicadas e acabamento em couro legítimo. Ideal para eventos especiais.",
      preco: 199.9,
      desconto: 15,
      destaque: true,
      estoque: 12,
      avaliacao_media: 4.8,
      avaliacao_total: 234,
      imagem:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
    },
    {
      id: 2,
      nome: "Tênis Casual Floral",
      descricao:
        "Tênis leve e confortável com estampa floral, perfeito para o dia a dia. Solado em borracha antiderrapante.",
      preco: 159.9,
      desconto: 0,
      destaque: false,
      estoque: 28,
      avaliacao_media: 4.5,
      avaliacao_total: 189,
      imagem:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
    },
    {
      id: 3,
      nome: "Bota Cano Curto Couro",
      descricao:
        "Bota em couro legítimo com cano curto e salto bloco. Perfeita para looks urbanos e sofisticados.",
      preco: 289.9,
      desconto: 20,
      destaque: true,
      estoque: 8,
      avaliacao_media: 4.9,
      avaliacao_total: 312,
      imagem:
        "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=500&h=500&fit=crop",
    },
    {
      id: 4,
      nome: "Mocassim Feminino Clássico",
      descricao:
        "Mocassim clássico em couro macio, com detalhe em franja. Conforto e elegância para o trabalho.",
      preco: 179.9,
      desconto: 10,
      destaque: false,
      estoque: 15,
      avaliacao_media: 4.3,
      avaliacao_total: 156,
      imagem:
        "https://images.unsplash.com/photo-1610960942765-0b95e90d123b?w=500&h=500&fit=crop",
    },
    {
      id: 5,
      nome: "Sandália Rasteira Glitter",
      descricao:
        "Sandália rasteira com acabamento em glitter e tiras finas. Conforto e brilho para o verão.",
      preco: 129.9,
      desconto: 0,
      destaque: false,
      estoque: 22,
      avaliacao_media: 4.1,
      avaliacao_total: 98,
      imagem:
        "https://images.unsplash.com/photo-1560361589-8e7dce3abfe8?w=500&h=500&fit=crop",
    },
    {
      id: 6,
      nome: "Scarpin Clássico Preto",
      descricao:
        "Scarpin preto de couro com salto fino, atemporal e indispensável no guarda-roupa feminino.",
      preco: 219.9,
      desconto: 25,
      destaque: true,
      estoque: 10,
      avaliacao_media: 4.7,
      avaliacao_total: 421,
      imagem:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop",
    },
    {
      id: 7,
      nome: "Tênis Esportivo Rosa",
      descricao:
        "Tênis esportivo na cor rosa com tecnologia de amortecimento. Leve e confortável para atividades físicas.",
      preco: 189.9,
      desconto: 5,
      destaque: false,
      estoque: 18,
      avaliacao_media: 4.4,
      avaliacao_total: 167,
      imagem:
        "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=500&h=500&fit=crop",
    },
    {
      id: 8,
      nome: "Bota Over Knee Camurça",
      descricao:
        "Bota over knee em camurça sintética com salto fino. Produz um visual ousado e elegante.",
      preco: 349.9,
      desconto: 30,
      destaque: true,
      estoque: 5,
      avaliacao_media: 4.6,
      avaliacao_total: 89,
      imagem:
        "https://images.unsplash.com/photo-1581101767116-46c0c3731f7f?w=500&h=500&fit=crop",
    },

    // 🕶️ ÓCULOS (6 produtos)
    {
      id: 9,
      nome: "Óculos de Sol Aviador",
      descricao:
        "Modelo aviador clássico com armação em metal dourado e lentes polarizadas. Proteção UV400.",
      preco: 239.9,
      desconto: 0,
      destaque: true,
      estoque: 20,
      avaliacao_media: 4.7,
      avaliacao_total: 245,
      imagem:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop",
    },
    {
      id: 10,
      nome: "Óculos de Grau Redondo",
      descricao:
        "Armação redonda estilo vintage com aros metálicos finos. Leve e sofisticado para uso diário.",
      preco: 189.9,
      desconto: 10,
      destaque: false,
      estoque: 14,
      avaliacao_media: 4.2,
      avaliacao_total: 134,
      imagem:
        "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500&h=500&fit=crop",
    },
    {
      id: 11,
      nome: "Óculos de Sol Gatinho",
      descricao:
        "Modelo gatinho com armação em acetato preto e lentes escuras. Estilo retrô e moderno.",
      preco: 199.9,
      desconto: 15,
      destaque: false,
      estoque: 16,
      avaliacao_media: 4.4,
      avaliacao_total: 178,
      imagem:
        "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&h=500&fit=crop",
    },
    {
      id: 12,
      nome: "Óculos de Sol Esportivo",
      descricao:
        "Óculos esportivo com armação emborrachada e lentes espelhadas. Perfeito para corrida e ciclismo.",
      preco: 279.9,
      desconto: 20,
      destaque: true,
      estoque: 9,
      avaliacao_media: 4.8,
      avaliacao_total: 203,
      imagem:
        "https://images.unsplash.com/photo-1510903874514-88618654add2?w=500&h=500&fit=crop",
    },
    {
      id: 13,
      nome: "Óculos de Sol Transparente",
      descricao:
        "Armação transparente com lentes degradê. Design moderno e versátil para qualquer ocasião.",
      preco: 159.9,
      desconto: 0,
      destaque: false,
      estoque: 25,
      avaliacao_media: 4.0,
      avaliacao_total: 87,
      imagem:
        "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500&h=500&fit=crop",
    },
    {
      id: 14,
      nome: "Óculos de Grau Quadrado",
      descricao:
        "Armação quadrada em acetato marrom, com detalhes em dourado. Elegante e confortável.",
      preco: 209.9,
      desconto: 5,
      destaque: false,
      estoque: 11,
      avaliacao_media: 4.3,
      avaliacao_total: 112,
      imagem:
        "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500&h=500&fit=crop",
    },

    // 👛 BOLSAS (6 produtos)
    {
      id: 15,
      nome: "Bolsa Tote Couro Natural",
      descricao:
        "Bolsa tote em couro legítimo na cor natural. Espaçosa e atemporal para o dia a dia.",
      preco: 299.9,
      desconto: 10,
      destaque: true,
      estoque: 7,
      avaliacao_media: 4.9,
      avaliacao_total: 356,
      imagem:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
    },
    {
      id: 16,
      nome: "Bolsa Transversal Corrente",
      descricao:
        "Bolsa transversal pequena com corrente dourada. Compacta e sofisticada para eventos.",
      preco: 189.9,
      desconto: 0,
      destaque: false,
      estoque: 19,
      avaliacao_media: 4.5,
      avaliacao_total: 145,
      imagem:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop",
    },
    {
      id: 17,
      nome: "Bolsa Mochila Couro Preto",
      descricao:
        "Mochila em couro preto com acabamento premium. Perfeita para trabalho e viagens curtas.",
      preco: 259.9,
      desconto: 15,
      destaque: false,
      estoque: 13,
      avaliacao_media: 4.4,
      avaliacao_total: 198,
      imagem:
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=500&fit=crop",
    },
    {
      id: 18,
      nome: "Bolsa Clutch Glitter Prata",
      descricao:
        "Clutch em glitter prata com fecho magnético. Acompanha pulseira removível. Ideal para festas.",
      preco: 139.9,
      desconto: 20,
      destaque: true,
      estoque: 6,
      avaliacao_media: 4.2,
      avaliacao_total: 76,
      imagem:
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=500&fit=crop",
    },
    {
      id: 19,
      nome: "Bolsa Sacola Couro Bege",
      descricao:
        "Bolsa sacola em couro legítimo na cor bege. Confortável e estilosa para uso diário.",
      preco: 219.9,
      desconto: 0,
      destaque: false,
      estoque: 21,
      avaliacao_media: 4.6,
      avaliacao_total: 267,
      imagem:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
    },
    {
      id: 20,
      nome: "Bolsa Carteira Transversal",
      descricao:
        "Bolsa carteira transversal com vários compartimentos. Prática e segura para o dia a dia.",
      preco: 169.9,
      desconto: 5,
      destaque: false,
      estoque: 17,
      avaliacao_media: 4.1,
      avaliacao_total: 93,
      imagem:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop",
    },
  ];
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const closeSideBar = () => setSideBarVisible(false);
  const toggleSideBar = () => setSideBarVisible((prev) => !prev);
  return (
    <div className="app-container bg-amber-50 min-h-screen flex flex-col">
      <main className="flex w-full flex-1 overflow-hidden relative">
        {/* Overlay para mobile */}
        {sideBarVisible && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={closeSideBar}
          />
        )}

        {/* SideBar */}
        <SideBar
          isOpen={sideBarVisible}
          onClose={closeSideBar} // nova prop para fechar no mobile
          className={`
            transition-all duration-500 ease-in-out
            fixed z-50 lg:z-auto lg:relative
            top-0 left-0 h-full shadow-xl
            ${
              sideBarVisible
                ? "w-64 translate-x-0 opacity-100 pointer-events-auto"
                : "w-0 -translate-x-full opacity-0 pointer-events-none"
            }
            w-64 lg:translate-x-0 lg:opacity-100 lg:pointer-events-auto
          `}
        />

        {/* Conteúdo principal */}
        <div className="flex flex-col flex-1 gap-8 overflow-y-auto">
          <Menu onToggleSideBar={toggleSideBar} />
          <ProductContainer>
            {produtos.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.nome}
                description={item.descricao}
                destaque={item.destaque}
                estoque={item.estoque}
                photo={item.imagem}
                price={item.preco}
                rating={item.avaliacao_media}
                nRating={item.avaliacao_total}
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
