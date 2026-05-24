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
import org.springframework.web.bind.annotation.RestController;

import com.guilherme_augusto.biblioteca.api.dto.CategoriaRespostaDTO;
import com.guilherme_augusto.biblioteca.api.entity.Categoria;
import com.guilherme_augusto.biblioteca.api.service.CategoriaService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/categorias")
public class CategoriaController {
    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @GetMapping
    public ResponseEntity<List<CategoriaRespostaDTO>> listar() {
        List<Categoria> categorias = categoriaService.listar();
        List<CategoriaRespostaDTO> resposta = categorias.stream()
                .map(categoria -> {
                    return new CategoriaRespostaDTO(
                            categoria.getId(),
                            categoria.getNome(),
                            categoria.getDescricao(),
                            categoria.getLivros().size());
                })
                .toList();
        return ResponseEntity.ok(resposta);
    }

    @PostMapping
    public ResponseEntity<Categoria> criar(@RequestBody @Valid Categoria categoria) {
        Categoria novaCategoria = categoriaService.criar(categoria);
        if (novaCategoria == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(novaCategoria);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> excluir(@PathVariable Long id) {
        boolean sucesso = categoriaService.excluir(id);
        if (!sucesso) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
}
