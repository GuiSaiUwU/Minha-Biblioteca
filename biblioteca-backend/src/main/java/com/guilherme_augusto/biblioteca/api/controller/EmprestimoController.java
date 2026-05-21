package com.guilherme_augusto.biblioteca.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guilherme_augusto.biblioteca.api.dto.EmprestimoRequisicaoDTO;
import com.guilherme_augusto.biblioteca.api.dto.EmprestimoRespostaDTO;
import com.guilherme_augusto.biblioteca.api.service.EmprestimoService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/emprestimos")
public class EmprestimoController {
    private final EmprestimoService emprestimoService;

    public EmprestimoController(EmprestimoService emprestimoService) {
        this.emprestimoService = emprestimoService;
    }

    @PostMapping
    public ResponseEntity<EmprestimoRespostaDTO> registrar(@RequestBody @Valid EmprestimoRequisicaoDTO requisicao) {
        return ResponseEntity.ok(emprestimoService.registrar(requisicao));
    }

    @PostMapping("/{id}/devolver")
    public ResponseEntity<EmprestimoRespostaDTO> devolver(@PathVariable Long id) {
        return ResponseEntity.ok(emprestimoService.devolver(id));
    }
}