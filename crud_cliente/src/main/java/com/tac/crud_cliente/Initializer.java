package com.tac.crud_cliente;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.tac.crud_cliente.model.Cliente;
import com.tac.crud_cliente.model.ClienteRepository;
import com.tac.crud_cliente.model.Telefone;

@Component
public class Initializer implements CommandLineRunner {

    private final ClienteRepository repository;

    public Initializer(ClienteRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        Stream.of("Ana", "Alessandra", "João",
                "Paulo").forEach(name ->
                repository.save(new Cliente(name))
        );

        Cliente cliente = repository.findByNome("Ana");
        		
        Set<Telefone> lst = Stream.of(new Telefone("99783487")).collect(Collectors.toSet());
        
        System.out.println("--->"+ lst);
        System.out.println("===>"+ cliente );
        cliente.telefone = lst;
        repository.save(
        		cliente
        		);

        repository.findAll().forEach(System.out::println);
    }
}
