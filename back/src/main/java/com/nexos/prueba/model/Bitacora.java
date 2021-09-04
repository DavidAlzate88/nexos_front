package com.nexos.prueba.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "bitacora_mercancia")
public class Bitacora {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "campo_modificado", nullable = false)
    private String campo_modificado;

    @Column(name = "valor_anterior", nullable = false)
    private String valor_anterior;

    @Column(name = "valor_actual", nullable = false)
    private String valor_actual;

    @Column(name = "fecha_actualizacion", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fecha_actualizacion;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_mercancia")
    private Mercancia mercancia;

    public Bitacora() {
    }

    public Bitacora(long id, String campo_modificado, String valor_anterior, String valor_actual, Date fecha_actualizacion, Usuario usuario, Mercancia mercancia) {
        this.id = id;
        this.campo_modificado = campo_modificado;
        this.valor_anterior = valor_anterior;
        this.valor_actual = valor_actual;
        this.fecha_actualizacion = fecha_actualizacion;
        this.usuario = usuario;
        this.mercancia = mercancia;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCampo_modificado() {
        return campo_modificado;
    }

    public void setCampo_modificado(String campo_modificado) {
        this.campo_modificado = campo_modificado;
    }

    public String getValor_anterior() {
        return valor_anterior;
    }

    public void setValor_anterior(String valor_anterior) {
        this.valor_anterior = valor_anterior;
    }

    public String getValor_actual() {
        return valor_actual;
    }

    public void setValor_actual(String valor_actual) {
        this.valor_actual = valor_actual;
    }

    public Date getFecha_actualizacion() {
        return fecha_actualizacion;
    }

    public void setFecha_actualizacion(Date fecha_actualizacion) {
        this.fecha_actualizacion = fecha_actualizacion;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Mercancia getMercancia() {
        return mercancia;
    }

    public void setMercancia(Mercancia mercancia) {
        this.mercancia = mercancia;
    }

    @Override
    public String toString() {
        return "Bitacora{" +
                "id=" + id +
                ", campo_modificado='" + campo_modificado + '\'' +
                ", valor_anterior='" + valor_anterior + '\'' +
                ", valor_actual='" + valor_actual + '\'' +
                ", fecha_actualizacion=" + fecha_actualizacion +
                ", usuario=" + usuario +
                ", mercancia=" + mercancia +
                '}';
    }
}
