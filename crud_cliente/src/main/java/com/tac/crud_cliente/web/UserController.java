package com.tac.crud_cliente.web;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

@RestController
@RequestMapping("/api")
public class UserController {

	//@EnableRedisHttpSession 
    @GetMapping("/userInfo")
    String userInfo(HttpSession session) {

    	String json = (String)session.getAttribute("user");
    	if( json == null ) {
    		JsonObject j = new JsonObject();
    		j.addProperty("id", -1);
    		j.addProperty("nome", "anonimo");
    		json = j.toString()	;
    		session.setAttribute("user", json);
    	}
    	
    	return json;
    }

    @PostMapping("/login")
    String login(@RequestBody String json, HttpSession session) {
    	Gson gson = new Gson();
    	JsonObject jsonObject = gson.fromJson(json, JsonObject.class);

    	JsonObject j = new JsonObject();
    	
    	j.addProperty("success", true);
    	
    	if( jsonObject.get("login").getAsString().equals("admin")) {
    		j.addProperty("id", 1);
    		j.addProperty("nome", "adimin");
    		j.addProperty("acesso", "adm");
    		session.setAttribute("user", j.toString());
    	}else if( jsonObject.get("login").getAsString().equals("comum")) {
    		j.addProperty("id", 2);
    		j.addProperty("nome", "comum");
    		j.addProperty("acesso", "leitura");
    		session.setAttribute("user", j.toString());
    	}else {
    		j.addProperty("success", false);
    		j.addProperty("msg", "Usuário sem acesso. Solicite um cadastro para ter acesso ao sistema");
    	}
    	if( j.get("success").getAsBoolean() ) {
	    	if( !jsonObject.get("pws").getAsString().equals("123456")) {
	    		j.addProperty("success", false);
	    		j.addProperty("msg", "Usuário não autorizado");
	    	}
    	}
	    
    	return j.toString();
    }
    @PostMapping("/logout")
    String logout(HttpSession session) {
    	session.removeAttribute("user");
    	return "{\"success\":true}";
    }
}
