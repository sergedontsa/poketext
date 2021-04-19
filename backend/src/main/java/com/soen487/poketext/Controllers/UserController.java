package com.soen487.poketext.Controllers;

import com.soen487.poketext.Model.User;
import com.soen487.poketext.Repository.UserRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping(value="register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String createUser(@RequestBody User user){
        Optional<User> existingUser = this.userRepository.findByUsername(user.getUsername());
        if(existingUser.isEmpty()) {
            User newUser = new User();
            newUser.setUsername(user.getUsername());
            newUser.setPassword(user.getPassword());
            this.userRepository.save(newUser);
            return "User created";
        } else {
            return "User already exists";
        }
    }

    @PostMapping(value="login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> login(@RequestBody User user){
        Optional<User> existingUser = this.userRepository.findByUsername(user.getUsername());
        if(existingUser.isPresent()) {
            String token = "dummytoken";
            existingUser.get().setToken(token);
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("token", token);

            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body("Login Succesful");

        } else{
            return ResponseEntity.status(401)
                    .body("Login Failed");
        }
    }

    @PostMapping(value="logout", consumes = MediaType.APPLICATION_JSON_VALUE)
    public String logout(@RequestParam("username") String username){
        return "";
    }
}
