package com.tac.crud_cliente.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Cliente {

	@Id
	@GeneratedValue
	public Long id;

	@Column(nullable = false)
	public String nome;

//	@Column(nullable = false)
	public String cqf;

	public String cep;
	public String logradouro;
	public String bairro;
	public String cidade;
	public String uf;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	public Set<Telefone> telefone;

	public Cliente(String n) {
		nome = n;
	}

	public Cliente() {
	}

	public String toString() {
		return nome;
	}

}
