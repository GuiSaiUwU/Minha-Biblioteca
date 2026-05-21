package com.guilherme_augusto.biblioteca.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.guilherme_augusto.biblioteca.api.entity.Categoria;
import com.guilherme_augusto.biblioteca.api.repository.CategoriaRepository;

@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

   // CA01.1: Listar todas as categorias com contagem de livros
   public List<Categoria> listar() {
        return categoriaRepository.findAll();
    }

    // CA01.2: Criar nova categoria (nome, descrição)
    public Categoria criar(Categoria categoria) {
        // RN01: Nome categoria único
        if (categoriaRepository.existsByNome(categoria.getNome())) {
            return null;
        }
        return categoriaRepository.save(categoria);
    }

    public boolean excluir(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
        
        /*
        * CA01.3: Excluir categoria SEM livros vinculados
        * CA01.4: Bloquear exclusão se houver livros na categoria
        * RN02: Não excluir categoria com livros
        */
        if (!categoria.getLivros().isEmpty()) {
            return false;
        }
        
        categoriaRepository.delete(categoria);
        return true;
    }
}
