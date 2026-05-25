export class Categoria {
  id!: number;
  nome!: string;
  descricao!: string;
  quantidadeLivros!: number;
}

export interface CriarCategoriaRequest {
  nome: string;
  descricao: string;
}
