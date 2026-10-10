package com.votajs.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginDTO(
    @NotBlank(message = "O email e obrigatorio.")
    String nome,

    @NotBlank(message = "A senha e obrigatorio.")
    @Email(message = "Email inválido.")
    String email,

    @NotBlank(message = "A senha e obrigatorio.")
    @Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres.")
    String password
) {}