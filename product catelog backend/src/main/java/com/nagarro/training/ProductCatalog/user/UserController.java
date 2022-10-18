package com.nagarro.training.ProductCatalog.user;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

//import com.nagarro.training.ProductCatalog.securityService.Encryption;

@RestController
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
//	@Autowired
//	private Encryption encryptService  = new Encryption();
	
//	@Autowired
//	private Authenticate authenticate;

	@CrossOrigin(origins="http://localhost:4200")
	@RequestMapping(method = RequestMethod.POST, value = "ProductCatalog/user/")
	public ResponseEntity<String> getUser(@RequestBody Cred cred) throws Exception {

		try {
			User result = userRepository.findById(cred.getEmail()).get();

			if (result.getPassword().equals(cred.getPassword())) {
				return ResponseEntity.status(HttpStatus.ACCEPTED).body("Logged in");

			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect Password");
			}

		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not Found");

		}

	}

	@CrossOrigin(origins="http://localhost:4200")
	@RequestMapping(method = RequestMethod.POST, value = "ProductCatalog/user/register")
	public ResponseEntity<String> addUser(@RequestBody User user) {
		if (userRepository.existsById(user.getEmail())) {
			
			System.out.println(userRepository.findById(user.getEmail()));
			return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body("User already exist");

		} else {
			
			userRepository.save(user);
			return ResponseEntity.status(HttpStatus.CREATED).body("User created Successfully");

		}
	}
}
