package com.tac.crud_cliente;

import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.tac.crud_cliente.model.Cliente;
import com.tac.crud_cliente.model.ClienteRepository;

@Component
public class Initializer implements CommandLineRunner {
	
    private final ClienteRepository repository;

    public Initializer(ClienteRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
    	Gson g = new Gson();
    	Stream.of(
        		"{\"nome\":\"Carmen\",\"cpf\":\"78424224191\",\"cep\":\"73805125\",\"logradouro\":\"Rua 10 casa 78\",\"bairro\":\"Primavera\",\"cidade\":\"Formosa\",\"estado\":\"Goias\",\"uf\":\"GO\",\"telefone\":[{\"numero\":\"6199783487\",\"tipo\":\"Celular\"}, {\"numero\":\"6199783485\",\"tipo\":\"Celular\"}], \"email\": [\"t@g.com\",\"t@ig.com\"]}",
        		"{\"nome\":\"Cristiane\",\"cpf\":\"78424224191\",\"cep\":\"73805125\",\"logradouro\":\"Rua 10 casa 78\",\"bairro\":\"Primavera\",\"cidade\":\"Formosa\",\"estado\":\"Brasilia\",\"uf\":\"DF\",\"telefone\":[{\"numero\":\"6199783487\",\"tipo\":\"Celular\"}], \"email\": [\"t@g.com\",\"t@ig.com\"]}",
        		"{\"nome\":\"Daniela\",\"cpf\":\"78424224191\",\"cep\":\"73805125\",\"logradouro\":\"Rua 10 casa 78\",\"bairro\":\"Primavera\",\"cidade\":\"Formosa\",\"estado\":\"Goias\",\"uf\":\"GO\",\"telefone\":[{\"numero\":\"6199783487\",\"tipo\":\"Celular\"}], \"email\": [\"t@g.com\",\"t@ig.com\"]}"
        		).forEach(json ->{
        			repository.save(g.fromJson(json, Cliente.class));
        		}
        );

        repository.findAll().forEach(System.out::println);
    }
}
