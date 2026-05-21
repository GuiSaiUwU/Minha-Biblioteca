package com.guilherme_augusto.biblioteca.api.dto;

public class CategoriaRespostaDTO {
    public String nome;
    public String descricao;
    public int quantidadeLivros;

    public CategoriaRespostaDTO(String nome, String descricao, int quantidadeLivros) {
        this.nome = nome;
        this.descricao = descricao;
        this.quantidadeLivros = quantidadeLivros;
    }
}
