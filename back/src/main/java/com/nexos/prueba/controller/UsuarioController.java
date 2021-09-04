package com.nexos.prueba.controller;

import com.nexos.prueba.exception.ResourceNotFoundException;
import com.nexos.prueba.model.Usuario;
import com.nexos.prueba.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @GetMapping("/usuarios")
    public List<Usuario> getUsuarios() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> getUsuariosById(@PathVariable(value = "id") Long usuarioId)
     throws ResourceNotFoundException {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id :: " + usuarioId));
        return ResponseEntity.ok().body(usuario);
    }
}
