# Changelog
# Índices
- [v0.1.0](#v010---18052026)
- [v0.2.0](#v020---21052026)
- [v0.3.0](#v030---24052026)
- [v0.4.0](#v040---24052026)
- [v1.0.0](#v100---24052026)

## v1.0.0 - 24/05/2026
- Eba release

**Commits**
- GuiSaiUwU (2):
  - feat(frontend): Estilização nas tabelas uwu
  - feat(frontend): Criado o menu de categorias com formulario de criação

- Guilherme (1):
  - MERGE: (PR #17) Frontend Categorias

## v0.4.0 - 24/05/2026
- Sem mensagem uwu

**Commits**
- GuiSaiUwU (4):
  - feat(frontend): Criado os filtros de busca na página de livros
  - hotfix(backend): Passando o id da categoria ao lista
  - feat(frontend): Criado o formulário para cadastro de livros
  - feat(frontend): Criado a funcionalidade de registro e gerenciamento de empréstimos

- Guilherme (1):
  - MERGE: (PR #16) Frontend Emprestimos

## v0.3.0 - 24/05/2026
- Inicio do desenvolvimento do frontend
  - Adicionado lazy loading nas rotas para reduzir o tamanho da bundle.
  - Implementadas as entidades do domínio (modelos).
  - Criado LivroService para comunicação com o backend.

**Commits**
- GuiSaiUwU (8):
  - docs(changelog): v0.2.0
  - feat(frontend): PrimeNG (#14)
  - feat(frontend): esqueleto inicial
  - feat(frontend): Entidades
  - feat(frontend): LivroService
  - hotfix(backend): Criado o endpoint de listagem de empréstimos e validado a data de criação do empréstimo.
  - feat(frontend): Implementar visualização de empréstimos atrasados e atualizado dashboard
  - hotfix(frontend): Lazy loading nas rotas para reduzir o tamanho da bundle

- Guilherme (1):
  - MERGE: (PR #15) Dashboard uwu

## v0.2.0 - 21/05/2026
- Criado os CRUDs, as entidades e validações dos itens: 
  - Categorias
  - Livros
  - Emprestimos

**Commits**
- GuiSaiUwU (12):
  - docs: Criado o CHANGELOG
  - feat(backend): Criado e mapeado as entidades do backend
  - feat(backend): Configurado o application properties
  - feat(backend): Ignorar o banco de dados no git
  - hotfix(backend): Categoria trocado a anotação em livros de `\@JsonBackReference` para `\@JsonIgnore`
  - feat(backend): Realizado o CRUD de Categorias
  - hotfix(backend): Definido explicitamente a plataforma do JPA para dialeto H2Dialect
  - hotfix(backend): Categorias deveria estar procurando nos livros ao deletar
  - hotfix(backend): Entidades agora usam GeneratedValue como IDENTITY
  - feat(backend);: Realizado o CRUD de Livros
  - feature(backend): Esqueci de commitar o EmprestimoRepository
  - feat(backend): Realizado o CRUD de Emprestimos

- Guilherme (5):
  - MERGE: Criado o CHANGELOG
  - MERGE: (PR: #3) BACKEND Entidades
  - MERGE: (PR: #5) BACKEND Crud Categorias
  - MERGE: (PR #11) BACKEND Crud Livros
  - MERGE: (PR #12): Crud Emprestimos

## v0.1.0 - 18/05/2026
**O Que foi feito**
- Criado a baseline inicial do projeto, com o frontend e backend sem alterações e o criado a Workflow CI

**Commits**
- GuiSaiUwU (4):
  - feat(repo): Inicializado
  - feat(backend): Inicializado
  - feat(frontend): Inicializado
  - feat(repo): Criado o Workflow CI