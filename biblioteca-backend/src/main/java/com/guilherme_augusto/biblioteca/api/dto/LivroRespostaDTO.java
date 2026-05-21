package com.guilherme_augusto.biblioteca.api.dto;

import com.guilherme_augusto.biblioteca.api.entity.StatusEnum;

public class LivroRespostaDTO {
    public Long id;
    public String titulo;
    public String autor;
    public String isbn;
    public Integer ano;
    public StatusEnum status;
    public Long categoriaId;
    public String categoriaNome;
    public int totalEmprestimos;

    public LivroRespostaDTO(Long id, String titulo, String autor, String isbn, Integer ano, StatusEnum status,
            Long categoriaId, String categoriaNome, int totalEmprestimos) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
        this.ano = ano;
        this.status = status;
        this.categoriaId = categoriaId;
        this.categoriaNome = categoriaNome;
        this.totalEmprestimos = totalEmprestimos;
    }
}