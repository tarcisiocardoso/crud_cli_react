package com.tac.crud_cliente.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long>{

	Cliente findByNome(String nome);
}
