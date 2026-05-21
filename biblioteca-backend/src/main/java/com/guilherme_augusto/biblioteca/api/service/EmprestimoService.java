package com.guilherme_augusto.biblioteca.api.service;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.guilherme_augusto.biblioteca.api.dto.EmprestimoRequisicaoDTO;
import com.guilherme_augusto.biblioteca.api.dto.EmprestimoRespostaDTO;
import com.guilherme_augusto.biblioteca.api.entity.Emprestimo;
import com.guilherme_augusto.biblioteca.api.entity.Livro;
import com.guilherme_augusto.biblioteca.api.entity.StatusEnum;
import com.guilherme_augusto.biblioteca.api.repository.EmprestimoRepository;
import com.guilherme_augusto.biblioteca.api.repository.LivroRepository;

import jakarta.transaction.Transactional;

@Service
public class EmprestimoService {
    private final EmprestimoRepository emprestimoRepository;
    private final LivroRepository livroRepository;

    public EmprestimoService(EmprestimoRepository emprestimoRepository, LivroRepository livroRepository) {
        this.emprestimoRepository = emprestimoRepository;
        this.livroRepository = livroRepository;
    }

    @Transactional
    public EmprestimoRespostaDTO registrar(EmprestimoRequisicaoDTO requisicao) {
        Livro livro = livroRepository.findById(requisicao.getLivroId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Livro não encontrado"));

        if (livro.getStatus() != StatusEnum.DISPONIVEL) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Livro indisponível para empréstimo");
        }

        Emprestimo emprestimo = new Emprestimo();
        emprestimo.setLivro(livro);
        emprestimo.setNomePessoa(requisicao.getNomePessoa());
        emprestimo.setTelefone(requisicao.getTelefone());
        emprestimo.setDataEmprestimo(LocalDateTime.now());
        emprestimo.setDataDevolucaoPrevista(
                requisicao.getDataDevolucaoPrevista() != null ? requisicao.getDataDevolucaoPrevista()
                        : LocalDateTime.now().plusDays(7));

        livro.setStatus(StatusEnum.EMPRESTADO);
        livroRepository.save(livro);

        return toResposta(emprestimoRepository.save(emprestimo));
    }

    @Transactional
    public EmprestimoRespostaDTO devolver(Long emprestimoId) {
        Emprestimo emprestimo = emprestimoRepository.findById(emprestimoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Empréstimo não encontrado"));

        if (emprestimo.getLivro().getStatus() == StatusEnum.DISPONIVEL) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Livro já está disponível");
        }

        if (emprestimo.getDataDevolucaoEfetiva() != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Empréstimo já devolvido");
        }

        emprestimo.setDataDevolucaoEfetiva(LocalDateTime.now());
        Livro livro = emprestimo.getLivro();
        livro.setStatus(StatusEnum.DISPONIVEL);
        livroRepository.save(livro);

        return toResposta(emprestimoRepository.save(emprestimo));
    }

    private EmprestimoRespostaDTO toResposta(Emprestimo emprestimo) {
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