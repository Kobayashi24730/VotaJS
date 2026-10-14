package com.votajs.service;

import com.votajs.model.User;
import com.votajs.repository.UserRepository;
import com.votajs.repository.PollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.votajs.dto.LoginDTO;
import com.votajs.dto.RegisterDTO;
import java.util.Optional;


@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PollRepository pollRepository;


    @Override 
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Utilizador não encontrado: " + username));
    }

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

    //? Logica para deletar um usuario e todas as enquetes criadas pelo mesmo.
    @Transactional
    public void deleteUser(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Utilizador nao encontrado."));
        pollRepository.deleteAllByAuthor(user.getEmail());
        userRepository.delete(user);
    }
}