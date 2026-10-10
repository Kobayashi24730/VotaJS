package com.votajs.controller;


import com.votajs.model.User; 
import com.votajs.service.TokenService;
import com.votajs.service.UserService;
import jakarta.validation.Valid;
import com.votajs.dto.RegisterDTO;
import com.votajs.dto.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired 
    private TokenService tokenService;
    @Autowired 
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid RegisterDTO user) {
        userService.registerUser(user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> Login(@RequestBody @Valid LoginDTO user) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(user.email(), user.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((User) auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDto(token));
    }
}

record LoginResponseDto(String token) {}