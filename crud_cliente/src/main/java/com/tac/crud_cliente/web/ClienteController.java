package com.tac.crud_cliente.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tac.crud_cliente.model.Cliente;
import com.tac.crud_cliente.model.ClienteRepository;
import com.tac.crud_cliente.model.LogRepository;
import com.tac.crud_cliente.service.ClienteBO;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ClienteController {

	@Autowired
	private ClienteBO negocio;

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
	ResponseEntity<Object> createCliente(@Valid @RequestBody Cliente cliente, HttpSession session)
			throws URISyntaxException {
		log.info("Request to create cliente: {}", cliente);
		String result = negocio.save(cliente, (String) session.getAttribute("user"));

		return ResponseEntity.created(new URI("/api/cliente/")).body(result);
	}

	@PutMapping("/cliente/{id}")
	ResponseEntity<String> updateCliente(@Valid @RequestBody Cliente cliente, HttpSession session) {
		log.info("Request to create cliente: {}", cliente);
		String result = negocio.update(cliente, (String) session.getAttribute("user"));
		return ResponseEntity.ok().body(result);
	}

	@DeleteMapping("/cliente/{id}")
	public ResponseEntity<?> deleteCliente(@PathVariable Long id, HttpSession session) {
		log.info("Request to delete cliente: {}", id);
//		clienteRepository.deleteById(id);
		String result = negocio.deleteById(id, (String) session.getAttribute("user"));
		return ResponseEntity.ok().build();
	}

}
