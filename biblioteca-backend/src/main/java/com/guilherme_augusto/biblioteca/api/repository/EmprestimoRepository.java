package com.guilherme_augusto.biblioteca.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.guilherme_augusto.biblioteca.api.entity.Emprestimo;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    List<Emprestimo> findByLivroIdOrderByDataEmprestimoDesc(Long livroId);

    boolean existsByLivroIdAndDataDevolucaoEfetivaIsNull(Long livroId);
}