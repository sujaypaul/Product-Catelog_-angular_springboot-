package com.nagarro.training.ProductCatalog.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Authenticate {

    @Autowired
    private UserRepository userRepository;

    public boolean check(Cred cred) throws Exception {

        User result = userRepository.findById(cred.getEmail()).get();
        if (result.getPassword().equals(cred.getPassword())) {
            return true;
        } else {
            return false;
        }

    }

}
