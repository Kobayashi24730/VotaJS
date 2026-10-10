package com.votajs.repository;

import com.votajs.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository
//? indica o dominio e o tipo de dados.
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); //? Entende o nome e o metodo.
}