package com.tienda.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

@Data
public class SignupRequest {
    @NotBlank(message = "es obligatorio")
    @Size(min = 3, max = 20, message = "debe tener entre 3 y 20 caracteres")
    private String username;

    @NotBlank(message = "es obligatorio")
    @Size(max = 50, message = "no debe exceder 50 caracteres")
    @Email(message = "debe ser un formato válido")
    private String email;

    private Set<String> role;

    @NotBlank(message = "es obligatoria")
    @Size(min = 6, max = 40, message = "debe tener entre 6 y 40 caracteres")
    private String password;
}