package com.guilherme_augusto.biblioteca.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.guilherme_augusto.biblioteca.api.entity.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    public boolean existsByNome(String nome);
}
