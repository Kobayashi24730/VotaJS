package com.votajs.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.votajs.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {
    @Value("${api.security.token.secret}")
    private String secret;

    //? função para gerar o token JWT 
    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            return JWT.create()
                    .withIssuer("votajs-api")
                    .withSubject(user.getEmail())
                    .withExpiresAt(genExpirationDate())
                    .sign(algorithm);
        }  catch (JWTCreationException exception) {
            throw new RuntimeException("Error ao gerar token", exception);
        }
    }

    //? função para verifica/validar a token JWT e extrair o ultilizador.
    public String validationString(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)

                    .withIssuer("votajs-api")
                    .build()
                    .verify(token)
                    .getSubject(); //? retorna o email/username(nome) do usuario se a autenticação for valida.
        } catch(JWTVerificationException exception) {
            return ""; //? retorn um exeção vazia se o autenticação falhar.
        }
    }

    //? funcão instant para gerar a data de expiração usada no JWT.create la no generateToken.
    public Instant genExpirationDate() {
        return LocalDateTime.now().plusSeconds(2).toInstant(ZoneOffset.of("-03:00")); //? Ajustat conforme o fuso horario.
    }

}
