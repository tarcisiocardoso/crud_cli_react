package com.tac.crud_cliente.web;

import java.util.Collection;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tac.crud_cliente.model.LogAuditoria;
import com.tac.crud_cliente.model.LogRepository;

@RestController
@RequestMapping("/api")
public class AuditoriaController {

    private LogRepository logRepository;
    
    public AuditoriaController(LogRepository logRepository) {
    	this.logRepository = logRepository;
    }
	@GetMapping("/logs")
	Collection<LogAuditoria> clientes() {
		return logRepository.findAll();
	}

}
