package com.nexos.prueba.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "mercancias")
public class Mercancia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "nombre_producto", nullable = false)
    private String nombre_producto;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "fecha_ingreso", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fecha_ingreso;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    public Mercancia() {
    }

    public Mercancia(long id, String nombre_producto, Integer cantidad, Date fecha_ingreso, Usuario usuario) {
        this.id = id;
        this.nombre_producto = nombre_producto;
        this.cantidad = cantidad;
        this.fecha_ingreso = fecha_ingreso;
        this.usuario = usuario;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombre_producto() {
        return nombre_producto;
    }

    public void setNombre_producto(String nombre_producto) {
        this.nombre_producto = nombre_producto;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Date getFecha_ingreso() {
        return fecha_ingreso;
    }

    public void setFecha_ingreso(Date fecha_ingreso) {
        this.fecha_ingreso = fecha_ingreso;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public String toString() {
        return "Mercancia{" +
                "id=" + id +
                ", nombre_producto='" + nombre_producto + '\'' +
                ", cantidad=" + cantidad +
                ", fecha_ingreso=" + fecha_ingreso +
                ", usuario=" + usuario +
                '}';
    }
}
