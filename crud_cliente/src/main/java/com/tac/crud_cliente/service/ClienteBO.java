package com.tac.crud_cliente.service;

import java.sql.Date;
import java.sql.Timestamp;

import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.tac.crud_cliente.model.Cliente;
import com.tac.crud_cliente.model.ClienteRepository;
import com.tac.crud_cliente.model.LogAuditoria;
import com.tac.crud_cliente.model.LogRepository;

@Service
public class ClienteBO {

	private ClienteRepository clienteRepository;
    private LogRepository logRepository;
    
    public ClienteBO(ClienteRepository clienteRepository, LogRepository logRepository) {
    	this.clienteRepository = clienteRepository;
    	this.logRepository = logRepository;
    }
    public String save(Cliente cliente, String jsonUser) {
    	LogAuditoria log = new LogAuditoria();
    	log.tipo= "add";
    	return this.operacao(cliente, jsonUser, log);
    }
    public String update(Cliente cliente, String jsonUser) {
    	LogAuditoria log = new LogAuditoria();
    	log.tipo= "update";
    	return this.operacao(cliente, jsonUser, log);
    }
    
    private String operacao(Cliente cliente, String jsonUser, LogAuditoria log) {
    	JsonObject jsonRetorno = new JsonObject();
    	jsonRetorno.addProperty("success", true);
    	Gson gson = new Gson();
    	JsonObject userJson = gson.fromJson(jsonUser, JsonObject.class);
    	
    	if( jsonUser == null || userJson.get("id").getAsInt() == -1) {
    		jsonRetorno.addProperty("success", false);
    		return jsonRetorno.toString();
    	}
		Cliente result = clienteRepository.save(cliente);
		jsonRetorno.addProperty("id", result.id);
		log.data = new Timestamp(System.currentTimeMillis());
		log.user = userJson.get("nome").getAsString();
		String json = gson.toJson(cliente);
		if( json.length() > 250) json = json.substring(0, 250);//limita o tamanho dos dados
		log.dado = json;
		
		this.logRepository.save(log);
		return jsonRetorno.toString();
	}
	public String deleteById(Long id, String jsonUser) {
		JsonObject jsonRetorno = new JsonObject();
		Gson gson = new Gson();
    	JsonObject userJson = gson.fromJson(jsonUser, JsonObject.class);
		
    	if( jsonUser == null || userJson.get("id").getAsInt() == -1) {
    		jsonRetorno.addProperty("success", false);
    		return jsonRetorno.toString();
    	}
		LogAuditoria log = new LogAuditoria();
    	log.tipo= "delete";
    	
		clienteRepository.deleteById(id);
		
		
    	jsonRetorno.addProperty("success", true);
    	
    	
    	
		jsonRetorno.addProperty("id", id);
		log.data = new Timestamp(System.currentTimeMillis());
		log.user = userJson.get("nome").getAsString();
		String json = "{"+id+"}";
		log.dado = json;
		
		this.logRepository.save(log);
		return jsonRetorno.toString();
	}
}
