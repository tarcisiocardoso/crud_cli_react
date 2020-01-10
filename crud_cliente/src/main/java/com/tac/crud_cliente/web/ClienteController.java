package com.tac.crud_cliente.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tac.crud_cliente.model.Cliente;
import com.tac.crud_cliente.model.ClienteRepository;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ClienteController {


	private final Logger log = LoggerFactory.getLogger(ClienteController.class);
    private ClienteRepository clienteRepository;

    public ClienteController(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @GetMapping("/clientes")
    Collection<Cliente> clientes() {
        return clienteRepository.findAll();
    }

    @GetMapping("/cliente/{id}")
    ResponseEntity<?> getCliente(@PathVariable Long id) {
        Optional<Cliente> cliente = clienteRepository.findById(id);
        return cliente.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/cliente")
    ResponseEntity<Cliente> createCliente(@Valid @RequestBody Cliente cliente) throws URISyntaxException {
        log.info("Request to create cliente: {}", cliente);
        Cliente result = clienteRepository.save(cliente);
        return ResponseEntity.created(new URI("/api/cliente/" + result.id))
                .body(result);
    }

    @PutMapping("/cliente/{id}")
    ResponseEntity<Cliente> updateCliente(@Valid @RequestBody Cliente cliente) {
        log.info("Request to update cliente: {}", cliente);
        Cliente result = clienteRepository.save(cliente);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/cliente/{id}")
    public ResponseEntity<?> deleteCliente(@PathVariable Long id) {
        log.info("Request to delete cliente: {}", id);
        clienteRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
