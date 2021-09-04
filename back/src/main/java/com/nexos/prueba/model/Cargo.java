package com.nexos.prueba.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "cargos")
public class Cargo {
    @Id
    private long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    public Cargo() {

    }

    public Cargo(long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public String toString() {
        return "Cargo [id=" + id + ", nombre=" + nombre + "]";
    }
}
