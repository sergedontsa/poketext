package com.soen487.poketext.Controllers;

import com.soen487.poketext.Model.User;
import com.soen487.poketext.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;

import java.util.Objects;
import java.util.Optional;

public class Controller {


    @Autowired
    private final UserRepository userRepository;

    public Controller(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User getUserByHeadersToken(HttpHeaders headers){
        // although get returns a list, we assume that the token list is of length 1
        // and that the desired token is going to be in the 0 position
        String token = Objects.requireNonNull(headers.get("token")).get(0);
        Optional<User> existingUser = this.userRepository.findByToken(token);
        return existingUser.orElseGet(User::new);
    }
}
