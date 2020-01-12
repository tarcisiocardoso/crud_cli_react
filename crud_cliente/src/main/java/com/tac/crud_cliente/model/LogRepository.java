package com.tac.crud_cliente.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LogRepository extends JpaRepository<LogAuditoria, Long>{

	LogAuditoria findByUser(String user);


}
