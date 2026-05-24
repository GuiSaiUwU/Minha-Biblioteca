export enum StatusEnum {
  DISPONIVEL = 'DISPONIVEL',
  EMPRESTADO = 'EMPRESTADO'
}

export interface CriarLivroRequest {
  titulo: string;
  autor: string;
  isbn: string;
  ano: number;
  categoriaId: number;
}

export class Livro {
  id!: number;
  titulo!: string;
  autor!: string;
  isbn!: string;
  ano!: number;
  status!: StatusEnum;
  categoriaId!: number;
  categoriaNome!: string;
  totalEmprestimos!: number;
}
