package com.guilherme_augusto.biblioteca.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.guilherme_augusto.biblioteca.api.entity.Livro;

public interface LivroRepository extends JpaRepository<Livro, Long>, JpaSpecificationExecutor<Livro> {
    boolean existsByIsbn(String isbn);

    boolean existsByCategoriaId(Long categoriaId);
}