package com.nexos.prueba.controller;

import com.nexos.prueba.exception.ResourceNotFoundException;
import com.nexos.prueba.model.Mercancia;
import com.nexos.prueba.repository.MercanciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class MercanciaController {

    @Autowired
    private MercanciaRepository mercanciaRepository;
    @GetMapping("/mercancias")
    public List<Mercancia> getMercancias() {
        return mercanciaRepository.findAll();
    }

    @GetMapping("/mercancias/{id}")
    public ResponseEntity<Mercancia> getMercanciasById(@PathVariable(value = "id") Long mercanciaId)
            throws ResourceNotFoundException {
        Mercancia mercancia = mercanciaRepository.findById(mercanciaId)
                .orElseThrow(() -> new ResourceNotFoundException("Mercancia no encontrada con id :: " + mercanciaId));
        return ResponseEntity.ok().body(mercancia);
    }

    @PostMapping("/mercancias")
    public Mercancia createMercancia(@Valid @RequestBody Mercancia mercancia) {
        System.out.print(mercancia);
        return mercanciaRepository.save(mercancia);
    }

    @PutMapping("/mercancias/{id}")
    public ResponseEntity<Mercancia> updateMercancia(@PathVariable(value = "id") Long mercanciaId,
                                                   @Valid @RequestBody Mercancia mercanciaDetails)
            throws ResourceNotFoundException {
        Mercancia mercancia = mercanciaRepository.findById(mercanciaId)
                .orElseThrow(() -> new ResourceNotFoundException("Mercancia no encontrada con id :: " + mercanciaId));

        mercancia.setNombre_producto(mercanciaDetails.getNombre_producto());
        mercancia.setCantidad(mercanciaDetails.getCantidad());
//        mercancia.setUsuario(mercanciaDetails.getUsuario());

        final Mercancia updatedMercancia = mercanciaRepository.save(mercancia);
        return ResponseEntity.ok(updatedMercancia);
    }

    @DeleteMapping("/mercancias/{id}")
    public Map<String, Boolean> deleteMercancia(@PathVariable(value = "id") Long mercanciaId)
            throws ResourceNotFoundException {
        Mercancia mercancia = mercanciaRepository.findById(mercanciaId)
                .orElseThrow(() -> new ResourceNotFoundException("Mercancia no encontrada con id :: " + mercanciaId));

        mercanciaRepository.delete(mercancia);

        Map<String, Boolean> response = new HashMap<>();
        response.put("Mercancia eliminada", Boolean.TRUE);

        return response;
    }
}
