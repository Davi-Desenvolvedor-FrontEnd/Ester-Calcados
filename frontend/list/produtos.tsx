const produtos = [
    {
        id: 1,
        name: "Sapatilha Cannes Tressê Couro Vermelho",
        description: "Sapatilha feminina de bico fino em couro com detalhe trançado elegante.",
        photo: "https://dl1uwy1y5s83r.cloudfront.net/Custom/Content/Products/41/46/4146_sapatilha-de-bico-fino-giselle-em-couro-preto-e-biqueira-animal-print_l24_638925794929760685.webp", // Adaptado para vermelho elegante com bico fino e couro
        available: true
    },
    {
        id: 2,
        name: "Rasteirinha Strass Dourado",
        description: "Sandália rasteira comfort com tira no dedo e detalhes em strass para brilhar.",
        photo: "https://secure-static.anacapri.com.br/medias/sys_master/anacapri/anacapri/hb4/h02/h00/h00/12878465892382/Midres-C3071800030002-HO.jpg", // Rasteira dourada com strass brilhante
        available: false
    },
    {
        id: 3,
        name: "Tamanco Mila de Tiras Largas",
        description: "Tamanco feminino moderno com design minimalista e tiras largas para ajuste perfeito.",
        photo: "https://m.media-amazon.com/images/I/41prty7iLvL.jpg", // Mule/tamanco moderno com tiras largas e animal print minimalista (adaptação próxima)
        available: true
    },
    {
        id: 4,
        name: "Scarpin Flat Audrey Animal Print",
        description: "Scarpin baixo e confortável, perfeito para o dia a dia, estampado com oncinha.",
        photo: "https://omarcalcados.vtexassets.com/arquivos/ids/312800-800-450?v=638757553726770000&width=800&height=450&aspect=true", // Scarpin animal print onça elegante
        available: false
    },
    {
        id: 5,
        name: "Mule em Couro Animal Print",
        description: "Mule (chinelo de salto) fácil de calçar, feito em couro com estampa animal.",
        photo: "https://i.ebayimg.com/images/g/4tQAAeSw~ZFoQJP5/s-l1200.jpg", // Mule em couro leopard print real e bonito
        available: false
    },
    {
        id: 6,
        name: "Tamanco Clássico de Madeira",
        description: "Tamanco tradicional com salto de madeira e cabedal em couro, um clássico atemporal.",
        photo: "https://i.etsystatic.com/19067647/r/il/b4d015/6983763480/il_fullxfull.6983763480_37nt.jpg", // Tamanco clássico com base de madeira e couro
        available: true
    },
    {
        id: 7,
        name: "Sapatilha Bailarina Flat Couro Preto",
        description: "Clássica sapatilha bailarina de bico redondo em couro liso, essencial para qualquer guarda-roupa.",
        photo: "https://i.ebayimg.com/images/g/Bm8AAeSwHnVoyalW/s-l1200.jpg", // Bailarina preta em couro clássico
        available: true
    },
    {
        id: 8,
        name: "Rasteirinha de Verniz Colorida",
        description: "Conjunto de rasteirinhas em verniz vibrante. Ideal para compor looks alegres de verão.",
        photo: "https://http2.mlstatic.com/D_NQ_NP_981160-MLB48980914479_012022-O-sandalia-feminina-tiras-coloridas-rasteira-de-amarrar-moda.webp", // Rasteira colorida em verniz vibrante
        available: true    },
    {
        id: 9,
        name: "Tamanco Birkenstock Boston",
        description: "Clog icônico em suede com fechamento por fivela. Conforto inigualável e estilo relax.",
        photo: "https://i.ebayimg.com/images/g/c60AAeSw3K1ou1pV/s-l1200.jpg", // Birkenstock Boston em suede com fivela
        available: true
    },
    {
        id: 10,
        name: "Sapatilha Giselle Bico Fino",
        description: "Sapatilha de bico fino e solado raso, disponível em diversas cores de couro.",
        photo: "https://img.irroba.com.br/fit-in/900x700/filters:fill(fff):quality(80)/mbbrasil/catalog/whatsapp-image-2024-06-14-at-172008-2.jpeg", // Sapatilha bico fino elegante em couro
        available: true
    },
];

const secoes = [
    {id: 1, name: "Sapatilhas", value: 30},
    {id: 2, name: "Tamancos", value: 59},
    {id: 3, name: "Rasteirinhas", value: 20},
    {id: 4, name: "Bolsas", value: 120},
    {id: 5, name: "Óculos", value: 5},
    {id: 6, name: "Bijuterias", value: 4},
    {id: 7, name: "Sandalias", value: 25},
]

let produtosList = {
    produtos,
    secoes
}

export default produtosList