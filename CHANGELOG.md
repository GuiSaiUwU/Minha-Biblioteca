# Changelog
# Índices
- [v0.1.0](#v010---18052026)
- [v0.2.0](#v020---21052026)

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

-  Guilherme (5):
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