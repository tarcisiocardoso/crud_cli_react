package com.tac.crud_cliente.model;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class LogAuditoria {

	@Id
	@GeneratedValue
	public Long id;

	public Timestamp data;
	public String tipo;
	public String user;
	public String dado;
	
		
}
