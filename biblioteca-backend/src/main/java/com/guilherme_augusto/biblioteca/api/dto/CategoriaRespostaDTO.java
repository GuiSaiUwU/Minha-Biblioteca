package com.guilherme_augusto.biblioteca.api.dto;

public class CategoriaRespostaDTO {
    public Long id;
    public String nome;
    public String descricao;
    public int quantidadeLivros;

    public CategoriaRespostaDTO(Long id, String nome, String descricao, int quantidadeLivros) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.quantidadeLivros = quantidadeLivros;
    }
}
