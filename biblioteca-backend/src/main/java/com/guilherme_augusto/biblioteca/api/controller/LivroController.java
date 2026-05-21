package com.guilherme_augusto.biblioteca.api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.guilherme_augusto.biblioteca.api.dto.LivroRequisicaoDTO;
import com.guilherme_augusto.biblioteca.api.dto.EmprestimoRespostaDTO;
import com.guilherme_augusto.biblioteca.api.dto.LivroRespostaDTO;
import com.guilherme_augusto.biblioteca.api.entity.StatusEnum;
import com.guilherme_augusto.biblioteca.api.service.LivroService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/livros")
public class LivroController {
    private final LivroService livroService;

    public LivroController(LivroService livroService) {
        this.livroService = livroService;
    }

    @PostMapping
    public ResponseEntity<LivroRespostaDTO> criar(@RequestBody @Valid LivroRequisicaoDTO requisicao) {
        return ResponseEntity.ok(livroService.criar(requisicao));
    }

    @GetMapping
    public ResponseEntity<List<LivroRespostaDTO>> listar(
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(required = false) StatusEnum status,
            @RequestParam(required = false, name = "q") String busca) {
        return ResponseEntity.ok(livroService.listar(categoriaId, status, busca));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LivroRespostaDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(livroService.buscarPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        livroService.excluir(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/emprestimos")
    public ResponseEntity<List<EmprestimoRespostaDTO>> historicoEmprestimos(@PathVariable Long id) {
        return ResponseEntity.ok(livroService.buscarHistoricoEmprestimos(id));
    }
}