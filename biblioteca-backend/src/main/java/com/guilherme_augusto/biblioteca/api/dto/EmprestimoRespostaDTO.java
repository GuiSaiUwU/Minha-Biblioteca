package com.guilherme_augusto.biblioteca.api.dto;

import java.time.LocalDateTime;

public class EmprestimoRespostaDTO {
    public Long id;
    public Long livroId;
    public String livroTitulo;
    public String nomePessoa;
    public String telefone;
    public LocalDateTime dataEmprestimo;
    public LocalDateTime dataDevolucaoPrevista;
    public LocalDateTime dataDevolucaoEfetiva;

    public EmprestimoRespostaDTO(Long id, Long livroId, String livroTitulo, String nomePessoa, String telefone,
            LocalDateTime dataEmprestimo, LocalDateTime dataDevolucaoPrevista, LocalDateTime dataDevolucaoEfetiva) {
        this.id = id;
        this.livroId = livroId;
        this.livroTitulo = livroTitulo;
        this.nomePessoa = nomePessoa;
        this.telefone = telefone;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucaoPrevista = dataDevolucaoPrevista;
        this.dataDevolucaoEfetiva = dataDevolucaoEfetiva;
    }
}