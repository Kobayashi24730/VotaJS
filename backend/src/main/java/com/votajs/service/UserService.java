package com.votajs.service;

import com.votajs.model.User;
import com.votajs.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //? Logica para guardar na base de dados.
    public User registerUser(String email, String encryptedPassword) {
        return null; 
    }
}