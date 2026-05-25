export class Emprestimo {
  id!: number;
  livroId!: number;
  livroTitulo!: string
  nomePessoa!: string;
  telefone!: string;
  dataEmprestimo!: Date;
  dataDevolucaoPrevista!: Date;
  dataDevolucaoEfetiva!: Date;
}

export interface CriarEmprestimoRequest {
  livroId: number;
  nomePessoa: string;
  telefone: string;
  dataDevolucaoPrevista: string;
}
