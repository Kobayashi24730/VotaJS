package com.votajs.service;

import com.votajs.model.User;
import com.votajs.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.votajs.dto.LoginDTO;
import com.votajs.dto.RegisterDTO;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //? Logica para registrar um user.
    public User registerUser(RegisterDTO user) {
        if (userRepository.findByEmail(user.email()).isPresent()) {
            throw new RuntimeException("Já existe um utilizador registado com este email.");
        }

        String encryptPassword = passwordEncoder.encode(user.password());

        User newUser = new User();
        newUser.setNome(user.nome());
        newUser.setEmail(user.email());
        newUser.setPassword(encryptPassword);

        return userRepository.save(newUser);
    }

    //?  Retorna o user com base no email
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}