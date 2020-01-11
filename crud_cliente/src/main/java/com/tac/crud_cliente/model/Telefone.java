package com.tac.crud_cliente.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Telefone {

	@Id
	@GeneratedValue
	public Long id;
	
	@Column(nullable = false)
	public String numero;

	@Column(nullable = false)
	public String tipo;

	public Telefone(String t) {
		this.numero = t;
		tipo = "C";
	}

	public Telefone() {
	}

	public String toString() {
		return numero;
	}
}
