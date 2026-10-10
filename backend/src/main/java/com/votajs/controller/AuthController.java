package com.votajs.controller;

import com.votajs.model.Poll;
import com.votajs.service.PollService;
import com.votajs.service.TokenService;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.votajs.service.UserService;
import jakarta.validation.Valid;
import com.votajs.dto.RegisterDTO;
import com.votajs.dto.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired 
    private PasswordEncoder passwordEncoder;
    @Autowired 
    private TokenService tokenService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid RegisterDTO user) {
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<String> Login(@RequestBody @Valid LoginDTO user) {
        return ResponseEntity.ok().build();
    }
}
