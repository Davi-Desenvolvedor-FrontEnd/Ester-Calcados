export type CategoriaId = "calcados" | "oculos" | "bolsas";

export interface Categoria {
  id: CategoriaId;
  label: string;
}

export type OrdenacaoOpcao =
  | "mais-vendidos"
  | "menor-preco"
  | "maior-preco"
  | "melhor-avaliados";

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
  tamanhos?: string;
  criado_em?: string;
  atualizado_em?: string;
}

export interface FiltrosState {
  categorias: CategoriaId[];
  precoMin: number;
  precoMax: number;
  disponivel: boolean;
  promocao: boolean;
  novidades: boolean;
}
