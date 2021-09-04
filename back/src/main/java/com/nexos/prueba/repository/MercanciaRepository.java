package com.nexos.prueba.repository;

import com.nexos.prueba.model.Mercancia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MercanciaRepository extends JpaRepository<Mercancia, Long>{

}
