package com.guilherme_augusto.biblioteca.api.service;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.guilherme_augusto.biblioteca.api.dto.EmprestimoRespostaDTO;
import com.guilherme_augusto.biblioteca.api.dto.LivroRequisicaoDTO;
import com.guilherme_augusto.biblioteca.api.dto.LivroRespostaDTO;
import com.guilherme_augusto.biblioteca.api.entity.Categoria;
import com.guilherme_augusto.biblioteca.api.entity.Emprestimo;
import com.guilherme_augusto.biblioteca.api.entity.Livro;
import com.guilherme_augusto.biblioteca.api.entity.StatusEnum;
import com.guilherme_augusto.biblioteca.api.repository.CategoriaRepository;
import com.guilherme_augusto.biblioteca.api.repository.EmprestimoRepository;
import com.guilherme_augusto.biblioteca.api.repository.LivroRepository;

import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;

@Service
public class LivroService {
    private final LivroRepository livroRepository;
    private final CategoriaRepository categoriaRepository;
    private final EmprestimoRepository emprestimoRepository;

    public LivroService(LivroRepository livroRepository, CategoriaRepository categoriaRepository,
            EmprestimoRepository emprestimoRepository) {
        this.livroRepository = livroRepository;
        this.categoriaRepository = categoriaRepository;
        this.emprestimoRepository = emprestimoRepository;
    }

    @Transactional
    public LivroRespostaDTO criar(LivroRequisicaoDTO requisicao) {
        Categoria categoria = categoriaRepository.findById(requisicao.getCategoriaId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada"));

        Livro livro = new Livro();
        livro.setTitulo(requisicao.getTitulo());
        livro.setAutor(requisicao.getAutor());
        livro.setIsbn(requisicao.getIsbn());
        livro.setAno(requisicao.getAno());
        livro.setCategoria(categoria);
        livro.setStatus(StatusEnum.DISPONIVEL);

        return toResposta(livroRepository.save(livro));
    }

    @Transactional
    public List<LivroRespostaDTO> listar(Long categoriaId, StatusEnum status, String busca) {
        Specification<Livro> specification = (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            if (categoriaId != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.equal(root.get("categoria").get("id"), categoriaId));
            }

            if (status != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("status"), status));
            }

            if (busca != null && !busca.isBlank()) {
                String termo = "%" + busca.trim().toLowerCase() + "%";
                Predicate porTitulo = criteriaBuilder.like(criteriaBuilder.lower(root.get("titulo")), termo);
                Predicate porAutor = criteriaBuilder.like(criteriaBuilder.lower(root.get("autor")), termo);
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.or(porTitulo, porAutor));
            }

            return predicate;
        };

        return livroRepository.findAll(specification).stream().map(this::toResposta).toList();
    }

    @Transactional
    public LivroRespostaDTO buscarPorId(Long id) {
        return toResposta(obterLivro(id));
    }

    @Transactional
    public void excluir(Long id) {
        Livro livro = obterLivro(id);
        if (livro.getStatus() != StatusEnum.DISPONIVEL) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Não é possível excluir livro emprestado");
        }

        livroRepository.delete(livro);
    }

    @Transactional
    public List<EmprestimoRespostaDTO> buscarHistoricoEmprestimos(Long livroId) {
        obterLivro(livroId);
        return emprestimoRepository.findByLivroIdOrderByDataEmprestimoDesc(livroId)
                .stream()
                .map(this::toEmprestimoResposta)
                .toList();
    }

    Livro obterLivro(Long id) {
        return livroRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Livro não encontrado"));
    }

    LivroRespostaDTO toResposta(Livro livro) {
        return new LivroRespostaDTO(
                livro.getId(),
                livro.getTitulo(),
                livro.getAutor(),
                livro.getIsbn(),
                livro.getAno(),
                livro.getStatus(),
                livro.getCategoria() != null ? livro.getCategoria().getId() : null,
                livro.getCategoria() != null ? livro.getCategoria().getNome() : null,
                emprestimoRepository.findByLivroIdOrderByDataEmprestimoDesc(livro.getId()).size());
    }

    private EmprestimoRespostaDTO toEmprestimoResposta(Emprestimo emprestimo) {
        Livro livro = emprestimo.getLivro();
        return new EmprestimoRespostaDTO(
                emprestimo.getId(),
                livro.getId(),
                livro.getTitulo(),
                emprestimo.getNomePessoa(),
                emprestimo.getTelefone(),
                emprestimo.getDataEmprestimo(),
                emprestimo.getDataDevolucaoPrevista(),
                emprestimo.getDataDevolucaoEfetiva());
    }
}